var express = require('express');
var mongoose = require('mongoose');
var app = module.exports = express();
var seed = require('./stache/stache.seed.js');
var api = require('./stache/stache.controller.js');
// var server = require('http').createServer(app);

mongoose.connect('mongodb://localhost/specter');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

// routes
// list all staches
app.get('/stache', api.list);

// save a new stache
app.get('/stache/save', api.save);

// get a stache by title
app.get('/stache/:title', api.getOne);

// get staches nearby specified longitude, latitude
// within the specified distance
app.get('/stache/near/:lon-:lat-:dist', api.near);


app.listen(8000, function () {
  console.log('listening on http://localhost:8000');
})