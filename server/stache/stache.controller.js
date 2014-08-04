var Stache = require('./stache.model.js');

// Creates and saves a new stache
exports.save = function(req, res) {
    // Q: Put data in req.body or req.params?
    // REST endpoints should have directory-like structure -> req.body
    var stache_date = {
        title: req.body.title,
        author: req.body.author,
        longitude: req.body.lon,
        latitude: req.body.lat,
        loc: [req.body.lon, req.body.lat],
        content: req.body.content
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
}

// Returns a list of staches
exports.list = function(req, res) {
    // Todo: use req.params to for query parameters
    // i.e. tags, time
    Stache.find({}, function(err, staches) {
        console.log("staches: ", staches);
        res.json(staches);
    });
}

// Returns a single stache
exports.getOne = function(req, res) {
    console.log("params: ", req.params);
    Stache.findOne({title: req.params.title}, function(err, stache) {
        res.send(stache);
    });
}

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
}
