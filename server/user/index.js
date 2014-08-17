var express = require('express');
var userController = require('./user.controller.js');

var users = express.Router();

users.post('/signup', function(req, res){
  //query database for existing user from req.body
    //reject / sign in on existing
    //save on non-existing
  //send token
  res.status(201).send();
});

users.post('/login', function(req, res){
  res.status(201).send();
});

module.exports = users;
