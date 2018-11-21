const crypto = require("crypto");
const suggestionBox = require("../model/suggestionBox.js");

function hash(s) {
  return crypto
    .createHash("md5")
    .update(s, "utf-8")
    .digest("hex");
}

module.exports = {
  createBox({ name }) {
    const now = Date.now();
    const hash_owner = hash(`${name}${now}owner`);
    const hash_submitter = hash(`${name}${now}submitter`);
    const sbox = suggestionBox({
      name,
      date: now,
      hash_owner,
      hash_submitter,
      suggestions: []
    });
    return sbox.save().then(doc => doc.toJSON());
  },
  getAllBoxes() {
    return suggestionBox
      .find({})
      .exec()
      .then(docs => docs.map(doc => doc.toJSON()));
  },
  getBoxByHash(hashStr) {
    return suggestionBox
      .findOne({ $or: [{ hash_owner: hashStr }, { hash_submitter: hashStr }] })
      .exec()
      .then(doc => (!doc ? { error: "No box found" } : doc));
  },
  clear() {
    return suggestionBox.deleteMany({});
  }
};
