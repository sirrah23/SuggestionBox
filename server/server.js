const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const suggestionBoxRepo = require("./repo/suggestionBox");

require("dotenv").config();
const dbURL = process.env.DB_URL;

mongoose.connect(
  dbURL,
  { useNewUrlParser: true }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));
app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/suggestionbox", (req, res) => {
  suggestionBoxRepo.getAllBoxes().then(r => res.json(r));
});

app.get("/suggestionbox/:hash", (req, res) => {
  suggestionBoxRepo.getBoxByHash(req.params.hash).then(r => res.json(r));
});

app.post("/suggestionbox", (req, res) => {
  suggestionBoxRepo
    .createBox({ name: req.body.name })
    .then(r => res.json(r))
    .catch(error => res.json({ error }));
});

app.post("/suggestionbox/:hash", (req, res) => {
  const boxHash = req.params.hash;
  const suggestionBody = req.body.body;
  suggestionBoxRepo
    .addSuggestion(boxHash, suggestionBody)
    .then(r => res.json(r));
});

app.delete("/suggestionbox/:hash", (req, res) => {
  const boxHash = req.params.hash;
  const suggestionID = req.body.id;
  suggestionBoxRepo
    .deleteSuggestion(boxHash, suggestionID)
    .then(success => {
      if (success) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(404);
    });
});

module.exports = app;
