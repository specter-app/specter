// We need a controller for the User schema (which generates a collection) so that our
// API (REST endpoints / routes) can interact with the database. We need these functions for diff endpoints:
// 1) store a new user
// 2) authenticate a login
// 3) generate an auth token
// 4) authenticate a request
// 5) expire an auth token
// 6) modify a user profile/settings/caches

// var bcrypt = require('bcrypt-nodejs');
var User = require('./user.model.js');

exports.login = function(req, res){
  console.log('user login req', req.body);
  
  // User.find(function(err, user){
  //   if(err) throw err;
  //   if(!user){
  //     res.status(404).json(message: 'User not found.');
  //   }else{

  //   }
  // });

  var user_data = {
    _id: req.body.fbid,
    firstName: req.body.firstName,
    lastName: req.body.lastName
    //profilePhoto: String
  };

  var user = new User(user_data);
  user.save(function(err, savedUser){
    if(err) throw err;
    res.status(201).send(savedUser)
  });
};
