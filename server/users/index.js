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

users.get('/login/:fbid', function(req, res){
  req.body.fbid = params.fbid;
  userController.login(req, res)
});

users.post('/login/:fbid', function(req, res){
  req.body.fbid = params.fbid;
  userController.login(req, res);
});

module.exports = users;
