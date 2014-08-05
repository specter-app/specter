var Stache = require('./stache.model.js');

// Creates and saves a new stache
exports.save = function(req, res) {
    // Q: Put data in req.body or req.params?
    // REST endpoints should have directory-like structure -> req.body
    var stache_data = {
        title: req.body.title,
        author: req.body.author,
        longitude: req.body.lon,
        latitude: req.body.lat,
        loc: [req.body.lon, req.body.lat],
        content: req.body.content,
        locked: req.body.locked,
        clue: req.body.clue,
        password: req.body.password
    };

    // Test data
/*    var stache_data = {
        title: 'Stache 2',
        author: 'user1',
        longitude: 50,
        latitude: 90,
        loc: [50, 90],
        content: 'Roses are red, violets are blue, digital caches are awesome.'
    };
*/
    var stache = new Stache(stache_data)
    stache.save(function(err) {
        if (err) throw err;
        console.log('Stache saved!');
        res.send('Stache saved!');
    });
};

// Returns a single stache by ID if client geolocation is within range
exports.getOne = function(req, res) {
    console.log("params: ", req.params);
    Stache.findOne({_id: req.params.id}, function(err, stache) {
      if (err) res.send(err.status, err);
      // if (!isAtLocation(req.query.lon, req.query.lat)) return res.send('Out of range of stache.');
      if (stache.locked && req.query.password !== stache.password) return res.send('Failed to open stache.');
      res.send(stache);
    });
};

// Returns a list of nearby staches
exports.near = function(req, res) {
    console.log("params: ", req.params);
    // Tell MongoDB to index fields that contain lat/lon
    // run this command from a mongo prompt: 
    // db.[collection_name].ensureIndex({ [field_name]: "2d" })
    /*Stache.find({loc: {$near: [req.params.lon, req.params.lat], 
        $maxDistance: req.params.dist}}, function(err, staches) {
            console.log("staches: ", staches);
            res.send(staches);
        });*/
    Stache.find({loc: {$near: [40, 5], $maxDistance: 500}}, function(err, staches) {
        console.log("staches: ", staches);
        res.send(staches);
    });
};
