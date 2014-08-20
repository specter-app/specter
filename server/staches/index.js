var express = require('express');
var stacheController = require('./stache.controller.js');

var staches = express.Router();

staches.get('/', function(req, res) {
// example route with querystring:
// http://localhost:8000/staches/?dist=100000&lon=-127&lat=32
  stacheController.getNearby(req, res);
});

// staches.get('/sign_s3', function(req, res) {
//   stacheController.sign_s3(req, res);
// });

staches.get('/:id', function(req, res) {
  stacheController.getOne(req, res);
});

staches.post('/', function(req, res) {
  stacheController.save(req, res);
});


module.exports = staches;
