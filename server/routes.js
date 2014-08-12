var express = require('express');
var stacheController = require('./stache/stache.controller.js');

var router = express.Router();

router.get('/', function(req, res) {
// example route with querystring:
// http://localhost:8000/staches/?coord=40+5+100
  console.log('Received GET request to /staches with req.query:', req.query);
  stacheController.getNearby(req, res);
});

router.get('/:id', function(req, res) {
  console.log('Received GET request to /staches/:id.');
  stacheController.getOne(req, res);
});

router.post('/', function(req, res) {
  console.log('Received POST request to /staches.');
  stacheController.save(req, res);
});

module.exports = router;
