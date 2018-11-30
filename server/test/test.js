process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const suggestionBoxRepo = require("../repo/suggestionBox.js");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Suggestion Box", () => {
  beforeEach(done => {
    suggestionBoxRepo.clear().then(() => {
      done();
    });
  });

  describe("/GET suggestion boxes", () => {
    it("should GET all of the suggestion boxes when there are none", done => {
      chai
        .request(server)
        .get("/suggestionbox")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it("should GET all of the suggestion boxes when there is one", done => {
      suggestionBoxRepo
        .createBox({
          name: "New menu items for cafeteria"
        })
        .then(box => {
          chai
            .request(server)
            .get("/suggestionbox")
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("array");
              res.body.length.should.be.eql(1);
              done();
            });
        });
    });
  });

  describe("/GET a specific suggestion box", () => {
    it("should GET an existing suggestion box by owner hash", done => {
      suggestionBoxRepo
        .createBox({
          name: "New menu items for cafeteria"
        })
        .then(box => {
          chai
            .request(server)
            .get(`/suggestionbox/${box.hash_owner}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.not.have.property("error");
              res.body.should.have.property("name").eql(box.name);
              res.body.should.have.property("date");
              res.body.should.have.property("hash_owner").eql(box.hash_owner);
              res.body.should.have
                .property("hash_submitter")
                .eql(box.hash_submitter);
              done();
            });
        });
    });

    it("should GET an existing suggestion box by submitter hash", done => {
      suggestionBoxRepo
        .createBox({
          name: "New menu items for cafeteria"
        })
        .then(box => {
          chai
            .request(server)
            .get(`/suggestionbox/${box.hash_submitter}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.not.have.property("error");
              res.body.should.have.property("name").eql(box.name);
              res.body.should.have.property("date");
              res.body.should.have.property("hash_owner").eql(box.hash_owner);
              res.body.should.have
                .property("hash_submitter")
                .eql(box.hash_submitter);
              done();
            });
        });
    });

    it("should not GET a box that does not exist", done => {
      chai
        .request(server)
        .get("/suggestionbox/badhash")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          done();
        });
    });
  });

  describe("/POST suggestionBox", () => {
    it("should POST a suggestionBox without suggestions", done => {
      const box = {
        name: "New menu items for cafeteria"
      };
      chai
        .request(server)
        .post("/suggestionBox")
        .send(box)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.not.have.property("error");
          res.body.should.have.property("name");
          res.body.should.have.property("date");
          res.body.should.have.property("hash_owner");
          res.body.should.have.property("hash_submitter");
          res.body.should.have.property("suggestions");
          done();
        });
    });
  });

  describe("/POST suggestion to box", () => {
    it("should POST a suggestion to an existing box", done => {
      suggestionBoxRepo.createBox({ name: "Boost morale" }).then(box => {
        const suggestion = {
          body: "Lets have a party!"
        };
        chai
          .request(server)
          .post(`/suggestionbox/${box.hash_submitter}`)
          .send(suggestion)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a("object");
            res.body.should.have.not.property("error");
            res.body.should.have.property("name");
            res.body.should.have.property("date");
            res.body.should.have.property("hash_owner");
            res.body.should.have.property("hash_submitter");
            res.body.should.have.property("suggestions");
            done();
          });
      });
    });
  });

  /* TODO: Convert all tests to use Async/Await */
  describe("/DELETE suggestion from box", () => {
    it("should DELETE a suggestion from an exisiting box", async function() {
      const { hash_owner, hash_submitter } = await suggestionBoxRepo.createBox({
        name: "Where should we go?"
      });
      let updatedBox = await suggestionBoxRepo.addSuggestion(
        hash_submitter,
        "Japan"
      );
      const suggestionID = updatedBox.suggestions[0]._id;
      const res = await chai
        .request(server)
        .delete(`/suggestionbox/${hash_owner}`)
        .send({ id: suggestionID });
      res.should.have.status(204);
      updatedBox = await suggestionBoxRepo.getBoxByHash(hash_owner);
      should.equal(updatedBox.suggestions.length, 0);
    });

    it("should only DELETE one suggestion in the case of duplicates", async function() {
      const { hash_owner, hash_submitter } = await suggestionBoxRepo.createBox({
        name: "Where should we go?"
      });
      await suggestionBoxRepo.addSuggestion(hash_submitter, "Japan");
      await suggestionBoxRepo.addSuggestion(hash_submitter, "Japan");
      let updatedBox = await suggestionBoxRepo.addSuggestion(
        hash_submitter,
        "Japan"
      );
      const res = await chai
        .request(server)
        .delete(`/suggestionbox/${hash_owner}`)
        .send({ id: updatedBox.suggestions[0].id });
      res.should.have.status(204);
      updatedBox = await suggestionBoxRepo.getBoxByHash(hash_owner);
      should.equal(updatedBox.suggestions.length, 2);
    });
  });
});
