// Handle all routes
// Future: delegate to index.js files for caches and users
// Call controller methods
var express = require('express');
var sCtrl = require('./stache/stache.controller.js');

//temporary
var seed = require('./stache/stache.seed.js');

var router = express.Router()

//staches/283497a823947hj
//staches?=

router.get('/:id', function(req, res) {
  console.log('get stache with id. request body:', req.body);
  sCtrl.getOne(req, res); //title, UID, or something else for individual caches?
});
    
router.get('/', function(req, res) {
  console.log('get staches near', req.query, '. request body:', req.body);
  sCtrl.getMany(req, res);
});

router.post('/', function(req, res) {
  console.log('post. request body:', req.body);
  sCtrl.save(req, res);
});

module.exports = router;
