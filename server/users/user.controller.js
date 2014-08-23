var User = require('./user.model.js');
var stacheController = require('../staches/stache.controller.js');

exports.login = function (req, res){ //refactor to secure auth
  User
  .findOne({ fbid: req.body.fbid })
  .populate('staches_created staches_discovered')
  .exec(function (err, foundUser){
    if(err) throw err;
    if(!foundUser){ //consider refactor
      var user_data = {
        fbid: req.body.fbid,
        first_name: req.body.first_name,
        last_name: req.body.last_name
        //profilePhoto: String
      };

      var user = new User(user_data);

      user.save(function(err, savedUser){
        if(err) throw err;
        res.status(201).json(savedUser);
      });
    }else{
      res.status(200).json(foundUser);
    }
  });
};

exports.addStaches_Created = function(stache, next){
  User.update(
              { fbid: stache.created_by },
              { $addToSet: { staches_created: stache._id } }, //refactor this to Mongoose
              function(err, count){
                if(err) throw err;
                next();
              }
             );
};

exports.addStaches_Discovered = function(discovery, next){
  User.update(
              { fbid: discovery.user_fbid },
              { $addToSet: { staches_discovered: discovery.stache_id } }, //refactor this to Mongoose
              function(err, count){
                 if(err) throw err;
                 next();
               }
             );
};

exports.getOne = function(req, res){ //refactor with User.login
  User
  .find({ fbid: req.params.fbid })
  .populate('stached_created staches_discovered')
  .exec(function (err, foundUser){
    if(err) throw err;
    res.status(200).json(foundUser);
  });
};
