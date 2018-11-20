process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let suggestionBoxRepo = require("../repo/suggestionBox.js");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Suggestion Box", () => {
  beforeEach(() => {
    suggestionBoxRepo.clear();
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
      const box = suggestionBoxRepo.createBox({
        name: "New menu items for cafeteria"
      });
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

  describe("/GET a specific suggestion box", () => {
    const box = suggestionBoxRepo.createBox({
      name: "New menu items for cafeteria"
    });

    it("should GET an existing suggestion box by owner hash", done => {
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
          res.body.should.have.property("suggestions").length.should.be.eql(0);
          done();
        });
    });

    it("should GET an existing suggestion box by submitter hash", done => {
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
          res.body.should.have.property("suggestions").length.should.be.eql(0);
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
    it("should POST a suggestion to an exisiting box", done => {
      const box = suggestionBoxRepo.createBox({ name: "Boost morale" });
      const suggestion = {
        body: "Lets have a party!"
      };
      chai
        .request(server)
        .post(`/suggestionbox/${box.hash_submitter}`)
        .send(suggestion)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.not.have.property("error");
          res.should.be.a("object");
          res.body.should.have.property("name");
          res.body.should.have.property("date");
          res.body.should.have.property("hash_owner");
          res.body.should.have.property("hash_submitter");
          res.body.should.have.property("suggestions");
        });
    });
  });
});
