var User = require('./user.model.js');
var stacheController = require('../staches/stache.controller.js');

exports.login = function(req, res){
  User.findOne({fbid: req.body.fbid}, function(err, foundUser){
    if(err) throw err;
    if(!foundUser){
      var user_data = {
        fbid: req.body.fbid,
        first_name: req.body.first_name,
        last_name: req.body.last_name
        //profilePhoto: String
      };

      var user = new User(user_data);

      user.save(function(err, savedUser){
        if(err) throw err;
        console.log('savedUser', savedUser.fbid);
        mapUserStacheIdsToStaches(savedUser, function(mappedUser){
          res.status(201).json(mappedUser);
        });
      });
    }else{
      console.log('foundUser', foundUser.fbid);
      mapUserStacheIdsToStaches(foundUser, function(mappedUser){
        res.status(200).json(mappedUser);
      });
    }
  });
};

//Replace all user staches_created and staches_discovered ids with actual staches
var mapUserStacheIdsToStaches = function(user, next){
  console.log('pre-mapped user', user);

  if(user.staches_created.length > 0){
    stacheController.getStachesById(user.staches_created, function(staches){
      user.staches_created = staches;
      if(user.staches_discovered.length > 0){
        stacheController.getStachesById(user.staches_discovered, function(staches){
          user.staches_discovered = staches;
          console.log('mappedUser', user);
          next(user);
        });
      }else{
        console.log('mappedUser', user);
        next(user);
      }
    });
  }else if(user.staches_discovered.length > 0){
    stacheController.getStachesById(user.staches_discovered, function(staches){
      user.staches_discovered = staches;
      console.log('mappedUser', user);
      next(user);
    });
  }else{
    console.log('mappedUser', user);
    next(user);
  }
};

exports.addStaches_Created = function(stache, next){
  User.update(
              { fbid: stache.created_by },
              { $addToSet: { staches_created: stache._id } },
              function(err, count){
                if(err) throw err;
                next();
              }
             );
};

exports.addStaches_Discovered = function(discovery, next){
  User.update(
              { fbid: discovery.user_fbid },
              { $addToSet: { staches_discovered: discovery.stache_id } },
              function(err, count){
                 if(err) throw err;
                 next();
               }
             );
};

exports.getOne = function(req, res){
  User.find({ fbid: req.params.fbid }, function(err, docs){
    if(err) throw err;
    var user = docs[0];
    mapUserStacheIdsToStaches(user, function(mappedUser){
      res.status(200).json(mappedUser);
    });
  });
};
