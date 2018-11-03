"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authorResource = undefined;

var _express = require("express");

var _author = require("../entity/author");

/*
    Endpoint for url http://localhost:8080/api/authors
*/
var authorResource = exports.authorResource = function authorResource(_ref) {
  var config = _ref.config,
      db = _ref.db;

  var router = new _express.Router();

  // URL: localhost:8080/api/authors        visar alla author
  router.get('/', function (req, res, next) {
    db.getRepository(_author.Author).find().then(function (result) {
      res.json(result);
    });
  });

  // Must be before GET /:id Matching top down ...!
  // URL: localhost:8080/api/authors/count      räknar antal author
  router.get('/count', function (req, res, next) {
    //console.log("GET: count (size)");
    db.getRepository(_author.Author).createQueryBuilder("author").select("COUNT(author.id)", "count").getRawOne().then(function (count) {
      res.json(count);
    });
  });

  // URL: localhost:8080/api/authors/FF         hittar en specifik author
  router.get('/:id', function (req, res, next) {
    //console.log(req.body);
    db.getRepository(_author.Author).findOneById(req.params['id']).then(function (found) {
      res.json(found);
    });
  });

  router.post('/', function (req, res, next) {
    //lägger till en ny author
    console.log(req.body);
    db.getRepository(_author.Author).save(req.body).then(function () {
      res.status(201).send();
    });
  });

  router.put('/:id', function (req, res, next) {
    //uppdaterar en author
    console.log(req.body, req.params);
    db.getRepository(_author.Author).createQueryBuilder("author").update().set(req.body).where("id = :id", { id: req.params['id'] }).execute().then(function (result) {
      res.json(result);
    });
  });

  router.delete('/:id', function (req, res, next) {
    //tar bort en author
    db.getRepository(_author.Author).createQueryBuilder("author").delete().where("id = :id", { id: req.params['id'] }).execute().then(function (result) {
      res.json(result);
    });
  });

  return router;
};