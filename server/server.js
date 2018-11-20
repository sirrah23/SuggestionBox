const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();
const dbURL = process.env.DB_URL;
const port = process.env.PORT;

mongoose.connect(dbURL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/suggestionBox", (req, res) => {
  res.json([]);
});

app.post("/suggestionBox", (req, res) => {
  res.json({});
});

module.exports = app;
