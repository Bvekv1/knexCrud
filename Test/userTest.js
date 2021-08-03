const chai = require("chai");
const chaiHttps = require("chai-http");
const should = chai.should();
chai.use(chaiHttps);
const server = require("../app.js");
const testCase = {
  addPerson: true,
  patchPerson: true,
  getPerson: true,
  addFavourite: true,
  getFavourite: true,
};

describe("Person", () => {
  if (testCase.addPerson) {
    describe("addPerson Test", () => {
      it("Person should be added", (done) => {
        chai
          .request(server)
          .post("/person")
          .set("content-type", "application/json")
          .send({
            firstName: "John",
            middelName: "clover",
            lastName: "doe",
            email: "clover@example.com",
            address: "newyork",
          })
          .end((err, res) => {
            res.body.should.have.status("success");
          });
        done();
      });
    });
  }
  if (testCase.patchPerson) {
    describe("Patch Person", () => {
      it("Person details should be updated", (done) => {
        const personId = 1;
        chai
          .request(server)
          .patch("/person/" + personId)
          .set("content-type", "application/json")
          .send({
            firstName: "Mark",
            middelName: "potter",
            lastName: "doe",
            email: "pottter@example.com",
            address: "uk",
          })
          .end((err, response) => {
            response.body.should.have.status("success");
          });
        done();
      });
    });
  }

  if (testCase.getPerson) {
    describe("Get Person", () => {
      it("Get Person", (done) => {
        const personId = 1;
        chai
          .request(server)
          .get("/person/" + personId)
          .set("content-type", "application/json")
          .end((err, response) => {
            response.body.should.have.status("success");
          });
        done();
      });
    });
  }
});

describe("Favourite", () => {
  if (testCase.addFavourite) {
    console.log("Favourite");
    describe("Add Favouriter", () => {
      it("Add Person Favourite", (done) => {
        chai
          .request(server)
          .post("/favourite")
          .set("content-type", "application/json")
          .send({
            game: "Hockey",
            book: "Harry Potter",
            movie: "Joker",
            anime: "Naruto",
            personId: "1",
          })
          .end((err, respone) => {
            respone.body.should.have.status("success");
          });
        done();
      });
    });
  }
  if (testCase.getFavourite) {
    describe("Get Favourite", () => {
      it("Test facourite get", (done) => {
        const personId = 1;
        chai
          .request(server)
          .get("/favourite/" + personId)
          .set("content-type", "application/json")
          .end((err, response) => {
            response.body.should.have.status("success");
          });
        done();
      });
    });
  }
});
