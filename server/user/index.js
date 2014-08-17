var express = require('express');
var userController = require('./user.controller.js');

var users = express.Router();

users.post('/signup', function(req, res){
  //query database for existing user from req.body
    //reject / sign in on existing
    //save on non-existing
  //send token
  userController.signup(req, res);
});

users.post('/login', function(req, res){
  userController.login(req, res);
});

module.exports = users;
