const mongoose = require("mongoose");

const suggestionBoxSchema = mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  hash_owner: { type: String, required: true },
  hash_submitter: { type: String, required: true },
  suggestions: [
    {
      body: { type: String, required: true },
      date: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model("SuggestionBox", suggestionBoxSchema);
