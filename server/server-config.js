var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../www'));

app.use(cors());

// Configure based on environment
var config = require('./config/' + app.get('env') + '.js');

// Connect to mongodb instance
var mongoUri = config.mongodb;
//Default server options values as follows, so no need to explicit set them
// var dbOptions = {
//   server: { auto_reconnect: true, poolSize: 5 }
// };
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

//Confirm environmental variables and environment
console.log( 'config.mongodb:', mongoUri );
console.log( 'environment: ', app.get('env') );

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
    res.send(err); // Print error stacktrace
  });
}

// Production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // Don't send stacktrace to client if for production
  res.send(err.message);
});

module.exports = app;
