const chai = require('chai');
const assert = require('assert');
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require('../app');
chai.use(chaiHttp);

describe("#Action of CRUD", function() {
    it("should list all notes on /Sources GET ", function() {
        // chai.request("http://localhost:8080")
        chai.request("http://localhost:8080")
            .get("/Sources")
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });
    it("should list a single note on /Sources/:id GET", function() {
        chai.request("http://localhost:8080")
            .get("/Sources")
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a("array");
                done();
            })
    });
    it("should add a single note on /Sources POST", function() {
        chai.request("http://localhost:8080")
            .post("/Sources")
            .send({
                "time": "2017-07-07",
                "info": "emmmmmmmm",
                "modifytime": "2017-07-07",
                "title": "title",
                "id": "123"
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a("object");
                res.body.should.have.property("time");
                res.body.should.have.property("modifytime");
                res.body.should.have.property("title");
                res.body.should.have.property("id");
                res.body.should.have.property("info");
                res.body.title.should.equal("title");
                res.body.time.should.equal("2017-07-07");
                res.body.modifytime.should.equal("2017-07-07");
                res.body.info.should.equal("emmmmmmmm");
                res.body.id.should.equal("123");
                done();
            })
    });
    it("should update a single note on /Sources/:id PUT", function() {
        chai.request("http: //localhost:8080")
            .get("/Sources")
            .end(function(err, res) {
                chai.request("http: //localhost:8080")
                    .put("/Sources/" + res.body.id)
                    .send({ "title": "modified title" })
                    .end(function(error, response) {
                        response.should.have.status(200);
                        response.should.be.json;
                        response.body.should.be.a("object");
                        response.body.should.have.property("time");
                        response.body.should.have.property("modifytime");
                        response.body.should.have.property("title");
                        response.body.should.have.property("id");
                        response.body.should.have.property("info");
                        response.body.title.should.equal("modified title");
                        response.body.time.should.equal("2017-07-07");
                        response.body.modifytime.should.equal("2017-07-07");
                        response.body.info.should.equal("emmmmmmmm");
                        response.body.id.should.equal("123");
                        done();
                    })

            })
    });
    it("should delete a single note on /Sources/:id DELETE", function() {
        chai.request("http: //localhost:8080")
            .get("/Sources")
            .end(function(err, res) {
                chai.request("http: //localhost:8080")
                    .delete("/Sources/" + res.body.id)
                    .end(function(error, response) {

                        response.should.have.status(200);
                        done();
                    })
            })
    });
})