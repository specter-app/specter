var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(__dirname + '/www'));

app.use(cors());

// Configure based on environment
console.log('environment: ', app.get('env'));
var config = require('./config/' + app.get('env') + '.js');

// Connect to mongodb instance
var mongoUri = config.mongodb;
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

// Routes
app.use('/staches', require('./routes.js'));

// Create 404 error response for any non-existent REST endpoints
app.use('*', function(req, res, next) {
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

// Development error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.send(err.message, err); // Print error stacktrace
  });
}

// Production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // Don't send stacktrace to client if for production
  res.send(err.message);
});

module.exports = app;
