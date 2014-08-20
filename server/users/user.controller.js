var User = require('./user.model.js');

exports.login = function(req, res){
  var user_data = {
    fbid: req.body.fbid,
    first_name: req.body.first_name,
    last_name: req.body.last_name
    //profilePhoto: String
  };

  var user = new User(user_data);

  User.findOne({fbid: user.fbid}, function(err, foundUser){
    if(err) throw err;
    if(!foundUser){
      user.save(function(err, savedUser){
        if(err) throw err;
        console.log('savedUser', savedUser.fbid);
        res.status(201).json(savedUser);
      });
    }else{
      console.log('foundUser', foundUser.fbid);
      res.status(200).json(foundUser);
    }
  });
};
