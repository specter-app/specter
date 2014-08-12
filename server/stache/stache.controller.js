var Stache = require('./stache.model.js');

// Creates and saves a new stache
exports.save = function(req, res) {
    var stache_data = {
        title: req.body.title,
        author: req.body.author,
        lon: req.body.lon,
        lat: req.body.lat,
        loc: [req.body.lon, req.body.lat],
        content: req.body.content,
        tags: req.body.tags,
        locked: req.body.locked,
        clue: req.body.clue,
        password: req.body.password
    };
    var stache = new Stache(stache_data);
    stache.save(function(err, savedStache) {
        if (err) throw err;
        console.log('Stache saved with id:', savedStache._id);
        res.status(201).json(savedStache);
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
    var query, coord, dist;

    if (req.query.coord) {
        query = req.query.coord.split(" ");
        coord = [Number(query[0]), Number(query[1])];
        dist = Number(query[2]);
        console.log('query nearby:', coord, dist);
    } else {
        console.log('grab all');
        coord = [-122.4089, 37.7837]; // temporary default coordinates
        dist = 10000000; // default search radius (meters)
        res.status(400).json({message: 'Query must contain geolocation.'});
        return;
    }

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
};
