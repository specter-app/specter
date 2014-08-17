// We need a controller for the User schema (which generates a collection) so that our
// API (REST endpoints / routes) can interact with the database. We need these functions for diff endpoints:
// 1) store a new user
// 2) authenticate a login
// 3) generate an auth token
// 4) authenticate a request
// 5) expire an auth token
// 6) modify a user profile/settings/caches

var bcrypt = require('bcrypt-nodejs');
var User = require('./user.model.js');

exports.signup = function(req, res){
  console.log('user signup req', req.body);
  var user_data = {
    username: req.body.username,
    salt: Date.now(),
    firstName: req.body.firstName,
    lastName: req.body.lastName
    //profilePhoto: String
  };

  user_data.hashedPassword = hashPassword(req.body.password, user_data.salt)
  user_data.token = generateUserToken(user_data.username);
  //generateUserToken();

  var user = new User(user_data);
  user.save(function(err, savedUser){
    if(err) throw err;
    res.status(201).send(savedUser)
  });
};

var hashPassword = function(pass, salt){
  //use bcrypt to hash password
  return '98as7df8a9ksfdj';
};

var generateUserToken = function(user){
  return 'asdfh92348ahf2';
};