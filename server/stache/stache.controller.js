var Stache = require('./stache.model.js');

// Creates and saves a new stache
exports.save = function(req, res) {
    var stache_data = {
        title: req.body.title,
        author: req.body.author,
        loc: [req.body.lon, req.body.lat],
        content: req.body.content,
        tags: req.body.tags,
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
      // if (stache.locked && req.query.password !== stache.password) return res.send('Failed to open stache.');
      res.send(stache);
    });
};

// Returns a list of nearby staches
exports.getNearby = function(req, res) {
    var query, coord, dist;

    if (req.query.coord) {
        console.log('query nearby');
        query = req.query.coord.split(" ");
        coord = [Number(query[0]), Number(query[1])];
        dist = Number(query[2]);
    } else {
        console.log('grab all');
        coord = [37.7837, -122.4089]; // temporary default coordinates
        dist = 100; // default search radius (meters)
    }

    // Tell MongoDB to index fields that contain lat/lon
    // run this command from a mongo prompt:
    // db.staches.ensureIndex({ loc: "2dsphere" })

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
            res.send(staches);
        }
    );
};
