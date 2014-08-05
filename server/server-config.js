var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/www'));

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
    res.send(err.status, err.message, err); // Print error stacktrace
  });
}

// Production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.status, err.message); // Don't send stacktrace to client if for production
});

module.exports = app;