var Stache = require('./stache.model.js');

// Creates and saves a new stache
exports.save = function(req, res) {
    var stache_data = {
        title: req.body.title,
        author: req.body.author,
        loc: [req.body.lon, req.body.lat],
        content: req.body.content,
        locked: req.body.locked,
        clue: req.body.clue,
        password: req.body.password
    };

    var stache = new Stache(stache_data);
    stache.save(function(err) {
        if (err) throw err;
        console.log('Stache saved!');
        res.send('Stache saved!');
    });
};

// Returns a single stache by ID if client geolocation is within range
exports.getOne = function(req, res) {
    Stache.findOne({_id: req.params.id}, function(err, stache) {
      if (err) res.send(err.status, err);
      // if (!isAtLocation(req.query.lon, req.query.lat)) return res.send('Out of range of stache.');
      if (stache.locked && req.query.password !== stache.password) return res.send('Failed to open stache.');
      res.send(stache);
    });
};

// Returns a list of nearby staches
exports.getNearby = function(req, res) {
  console.log('HI');
  console.log(req.query.coord);
  if (req.query.coord) {
    var query = req.query.coord.split(" ");
    var coord = [Number(query[0]), Number(query[1])];
    var dist = Number(query[2]);
  } else {
    console.log('no coord specif');
    var coord = [40, 5];
    var dist = 100000;
  }

    // Tell MongoDB to index fields that contain lat/lon
    // run this command from a mongo prompt:
    // db.[collection_name].ensureIndex({ [field_name]: "2d" })

    // maxDistance takes input in radians
    // The radius of the Earth is approximately 3,959 miles or 6,371 kilometers.
    var point = { type : "Point", coordinates : coord};
    Stache.geoNear(point, { maxDistance : dist/3959 }, function(err, staches, stats) {
       res.send(staches);
    });
};
