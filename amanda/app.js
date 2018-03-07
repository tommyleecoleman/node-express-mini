const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

/* Returns a list of dictionary words from the words.txt file. */
const readWords = () => {
  const contents = fs.readFileSync("words.txt", "utf8");
  return contents.split("\n");
};

const words = readWords();
const index = Math.floor(Math.random() * words.length);

const word = words[index];
const guesses = {};
// TODO: your code to handle requests

server.post("/guess", (req, res) => {
  if (!req.body.letter) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "User must provide one letter only" });
  } else if (req.body.letter.length > 1) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "User must provide one letter only" });
  } else if (typeof req.body.letter !== "string") {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "User must provide one letter only" });
  } else if (guessedLetters[req.body.letter]) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: `The letter "${req.body.letter}" was already guessed` });
  } else {
    guessedLetters[req.body.letter] = true;
    res.status(STATUS_SUCCESS);
    res.send();
  }
});

server.get("/", (req, res) => {
  let currentWord = word.split(" ");
  currentWord = currentWord.map(letter => {
    if (guesses[letter]) {
      return letter;
    }
    return "-";
  });

  currentWord = currentWord.join("");

  res.status(STATUS_SUCCESS);
  res.send({ word: currentWord });
});

server.listen(5000);
