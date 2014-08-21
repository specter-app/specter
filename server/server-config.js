var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors'); // middleware for CORS headers
var mongoose = require('mongoose');

var app = express(); // create our server instance

app.use(morgan('dev')); // log HTTP requests in pre-defined 'dev' format
app.use(bodyParser.json()); // only accept JSON requests
app.use(bodyParser.urlencoded({ extended: false })); // only accept flat (non-nested) query strings
app.use(methodOverride());
app.use(express.static(__dirname + '/../www')); // serve static HTML files from a dedicated directory and bypasses remaining routes
app.use(cors());

// configure based on environment
var config = require('./config/' + app.get('env') + '.js');

// connect to mongodb instance
var mongoUri = config.mongodb;
mongoose.connect(mongoUri); // second arg for server defaults to { server: { auto_reconnect: true, poolSize: 5 } }
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

// log mongo server and node environment
console.log('config.mongodb:', mongoUri);
console.log('environment:', app.get('env'));

// routes
// app.post('/submit_form', function(req, res){
//     avatar_url = req.body.avatar_url;
//     console.log('submit_form handled: ', avatar_url);
//     res.send(avatar_url);
//     // update_account(avatar_url); // TODO: create this function
//     // TODO: Return something useful or redirect
// });

app.use('/staches', require('./staches'));
app.use('/users', require('./users'));
app.use('/discoveries', require('./discoveries'));

// create 404 error response for any non-existent REST endpoints
app.use('*', function(req, res, next) {
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

// development error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.send(err); // send error stacktrace if development environment
  });
}

// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message); // don't send stacktrace to client if production environment
});

module.exports = app;
