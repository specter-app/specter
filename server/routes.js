var express = require('express');
var stacheController = require('./stache/stache.controller.js');

var staches = express.Router();

staches.get('/', function(req, res) {
// example route with querystring:
// http://localhost:8000/staches/?coord=-122+37+1000000
  stacheController.getNearby(req, res);
});

staches.get('/:id', function(req, res) {
  stacheController.getOne(req, res);
});

staches.post('/', function(req, res) {
  stacheController.save(req, res);
});

module.exports = {
  staches: staches,
  users: users
};
