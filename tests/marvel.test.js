const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../index.js");

chai.use(chaiHttp);

describe("Marvel", function() {
  // used function instead of arrow function not to mess up with the this context in mocha
  it("get characters from request", function(done) {
    // extended time out to allow tests to run longer than normal 2000ms
    this.timeout(5000);
    chai.request(app)
      .get("/api/marvel_characters")
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.body.length).to.be.greaterThan(1);
      done();
      })
  })
})

// mock other scenarios where data fails