var express = require('express');
var mongoose = require('mongoose');
var app = module.exports = express();
// var server = require('http').createServer(app);

mongoose.connect('mongodb://localhost/specter');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
// db.once('open', callback);

// app.configure(function() {
//     app.use(express.bodyParser());
//     app.use(express.methodOverride());
//     app.use(app.router);
// });

var api = require('./stache/stache.controller.js');

// routes
app.get('/stache', api.list);


app.listen(8000, function () {
  console.log('listening on http://localhost:8000');
})