// Handle all routes
// Future: delegate to index.js files for caches and users
// Call controller methods
var express = require('express');
var sCtrl = require('./stache/stache.controller.js');

//temporary
var seed = require('./stache/stache.seed.js');

var router = express.Router()
    
router.get('/', function(req, res) {
  console.log(req.query);
  sCtrl.list(req, res);
  // // get staches nearby specified longitude, latitude
  // // within the specified distance
  // app.get('/stache/near/:lon-:lat-:dist', api.near);
});

router.get('/:title', function(req, res) {
  sCtrl.getOne(req, res); //title, UID, or something else for individual caches?
});

router.post('/', function(req, res) {
  sCtrl.save(req, res);
});

module.exports = router;
