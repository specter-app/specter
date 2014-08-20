var Discovery = require('./discovery.model.js');
var stacheController = require('../staches/stache.controller.js');
var userController = require('../users/user.controller.js');

exports.discover = function(req, res){
  var discovery_data = {
    stache_id: req.query.sid,
    user_fbid: req.query.fbid
  };

  var discovery = new Discovery(discovery_data);

  //Create relationship between User and Stache in what is effectively a join table
  discovery.save(function(err, savedDiscovery){
    if(err) throw err;
    stacheController.addDiscovered_By(discovery, function(){
      userController.addStaches_Discovered(discovery, function(){
        res.status(201).send('You discovered a stache!');
      });
    });
  });
};