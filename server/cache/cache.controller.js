var Cache = require('../cache/cache.js');

// Creates a new cache
exports.post = function(req, res) {
    var newCache = {
        title: req.body.title,
        author: req.body.author,
        location: req.body.location,
        content: req.body.content
    }
    new Cache(newCache).save();
}

// Returns a list of caches
exports.getAll = function(req, res) {

}

// Returns a single cache
exports.getOne = function(req, res) {

}