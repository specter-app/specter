var Stache = require('./stache.model.js');
var userController = require('../users/user.controller.js');
var crypto = require('crypto');

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;

// Creates and saves a new stache, or overwrites a stache
exports.save = function(req, res) {
  var stache_data = {
    title: req.body.title,
    created_by: String(req.body.created_by),
    lon: req.body.lon,
    lat: req.body.lat,
    loc: [req.body.lon, req.body.lat],
    content: req.body.content,
    aws_url: req.body.aws_url,
    tags: req.body.tags,
    locked: req.body.locked,
    clue: req.body.clue,
    password: req.body.password
  };
  var stache = new Stache(stache_data);
  stache.save(function(err, savedStache) {
    if (err) throw err;
    userController.addStaches_Created(savedStache, function(){
      res.status(201).json(savedStache);
    });
  });
};

// Returns a single stache by ID if client geolocation is within range
exports.getOne = function(req, res) {
  Stache.findOne({_id: req.params.id}, function(err, stache) {
    if (err) res.status(err.status).json(err.message);
    // if (!isAtLocation(req.query.lon, req.query.lat)) return res.json('Out of range of stache.');
    // if (stache.locked && req.query.password !== stache.password) return res.json('Failed to open stache.');

    res.json(stache);
  });
};

// Returns a list of nearby staches
exports.getNearby = function(req, res) {
  // check whether query string has lat, long, and dist
  if (req.query.dist && req.query.lat && req.query.lon) {
    var coord, dist;
    
    coord = [Number(req.query.lon), Number(req.query.lat)];
    dist = Number(req.query.dist);
    console.log('Request query nearby:', coord, dist);
    // Be sure to invoke ensureIndex on every mongoDB instance so as to index fields that contain lat/lon,
    // ideally from the mongo shell, as otherwise $geoNear queries may fail: db.staches.ensureIndex({ loc: "2dsphere" })

    Stache.find(
       { loc :
         { $near :
          {
          $geometry : {type : "Point", coordinates : coord},
          $maxDistance : dist // meters
          }
         }
      },
      function(err,staches) {
        if(err) throw err;
        res.send(staches);
      }
    );
  } else {
    res.status(400).json('Query must contain geolocation.');
  }
};

exports.addDiscovered_By = function(discovery, next){
  Stache.update(
                { _id: discovery.stache_id },
                { $addToSet: { discovered_by: discovery.user_fbid } }, //refactor to Mongoose
                function(err, count){
                  if(err) throw err;
                  next();
                }
               );
  next();
};

// Get signature for client side direct upload to aws s3
exports.sign_s3 = function(req, res) {
  var object_name = req.query.s3_object_name;
  var mime_type = req.query.s3_object_type;
  console.log('req.query: ', req.query);

  var now = new Date();
  var expires = Math.ceil((now.getTime() + 1000000)/1000); // 1000 seconds from now
  var amz_headers = "x-amz-acl:public-read"; // the object will be publicly available for download

  var put_request = "PUT\n\n" + mime_type + "\n" + expires + "\n" + amz_headers + "\n/" + S3_BUCKET + "/" + object_name;

  // Generate signature as a SHA hash of the compiled AWS secret key and the PUT request
  var signature = crypto.createHmac('sha1', AWS_SECRET_KEY).update(put_request).digest('base64');
  // Strip surrounding whitespace from signature, escape special characters
  signature = encodeURIComponent(signature.trim());
  // preserve '+' characters
  signature = signature.replace('%2B','+');

  var url = 'https://' + S3_BUCKET + '.s3.amazonaws.com/' + object_name;

  var credentials = {
      signed_request: url + "?AWSAccessKeyId=" + AWS_ACCESS_KEY + "&Expires=" + expires + "&Signature=" + signature,
      url: url
  };
  console.log('credentials: ', credentials);
  res.write(JSON.stringify(credentials));
  res.end();
};
