var express = require('express');
var discoveryController = require('./discovery.controller.js');

var discoveries = express.Router();

discoveries.post('/', function(req, res){
  discoveryController.discover(req, res);
});

module.exports = discoveries;
