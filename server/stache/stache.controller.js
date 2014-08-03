var Stache = require('./stache.model.js');

// Creates and saves a new stache
exports.save = function(req, res) {
    // Q: Put data in req.body or req.params?
    // REST endpoints should have directly like structure
    var newStache = {
        title: req.body.title,
        author: req.body.author,
        longitude: req.body.lon,
        latitude: req.body.lat,
        coord: [req.body.lon, req.body.lat],
        content: req.body.content
    };

    new Stache(newStache).save(function(err) {
        if (err) throw err;
        console.log('Stache saved!');
        res.send('Stache saved!');
    });
}

// Returns a list of staches
exports.list = function(req, res) {
    // Todo: use req.params to for query parameters
    // i.e. tags, time
    Stache.find(function(err, stache) {
        console.log("staches: ", staches);
        res.send(staches);
    });
}

// Returns a single stache
exports.getOne = function(req, res) {
    Stache.findOne({name: req.params.name}, function(err, stache) {
        res.send([{Stache: stache}]);
    });
}

// Returns a list of nearby staches
exports.near = function(req, res) {
    // Tell MongoDB to index fields that contain lat/lon
    // run this command from a mongo prompt: 
    // db.[collection_name].ensureIndex({ [field_name]: "2d" })
    Stache.find({coord: {$near: [req.params.lon, req.params.lat], 
        $maxDistance: req.params.dist / 68.91}}, function(err, staches) {
            console.log("staches: ", staches);
            // res.send(staches);
            res.send(200);
        });
}