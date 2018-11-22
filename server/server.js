const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const suggestionBoxRepo = require("./repo/suggestionBox");

require("dotenv").config();
const dbURL = process.env.DB_URL;
const port = process.env.PORT;

mongoose.connect(
  dbURL,
  { useNewUrlParser: true }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/suggestionbox", (req, res) => {
  suggestionBoxRepo.getAllBoxes().then(r => res.json(r));
});

app.get("/suggestionbox/:hash", (req, res) => {
  suggestionBoxRepo.getBoxByHash(req.params.hash).then(r => res.json(r));
});

app.post("/suggestionbox", (req, res) => {
  suggestionBoxRepo.createBox({ name: req.body.name }).then(r => res.json(r));
});

module.exports = app;
