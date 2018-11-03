"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookResource = undefined;

var _express = require("express");

var _book = require("../entity/book");

/*
    Endpoint for url http://localhost:8080/api/authors
*/
var bookResource = exports.bookResource = function bookResource(_ref) {
  var config = _ref.config,
      db = _ref.db;

  var router = new _express.Router();

  // URL: localhost:8080/api/books        visar alla book
  router.get('/', function (req, res, next) {
    db.getRepository(_book.Book).find().then(function (result) {
      res.json(result);
    });
  });

  // Must be before GET /:id Matching top down ...!
  // URL: localhost:8080/api/books/count      räknar antal books
  router.get('/count', function (req, res, next) {
    //console.log("GET: count (size)");
    db.getRepository(_book.Book).createQueryBuilder("book").select("COUNT(book.isbn)", "count").getRawOne().then(function (count) {
      res.json(count);
    });
  });

  // URL: localhost:8080/api/books/isbn1         hittar en specifik book
  router.get('/:isbn', function (req, res, next) {
    //console.log(req.body);
    db.getRepository(_book.Book).findOneById(req.params['isbn']).then(function (found) {
      res.json(found);
    });
  });

  router.post('/', function (req, res, next) {
    //lägger till en ny book
    //console.log(req.body);
    db.getRepository(_book.Book).save(req.body).then(function () {
      res.status(201).send();
    });
  });

  router.put('/:isbn', function (req, res, next) {
    //uppdaterar en book
    db.getRepository(_book.Book).createQueryBuilder("book").update().set(req.body).where("isbn = :isbn", { isbn: req.params['isbn'] }).execute().then(function (result) {
      res.json(result);
    });
  });

  router.delete('/:isbn', function (req, res, next) {
    //tar bort en book
    db.getRepository(_book.Book).createQueryBuilder("book").delete().where("isbn = :isbn", { isbn: req.params['isbn'] }).execute().then(function (result) {
      res.json(result);
    });
  });

  return router;
};