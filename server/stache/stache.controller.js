var Stache = require('../stache/stache.js');

// Creates a new stache
exports.post = function(req, res) {
    var newStache = {
        title: req.body.title,
        author: req.body.author,
        location: req.body.location,
        content: req.body.content
    }
    new Stache(newStache).save();
}

// Returns a list of staches
exports.getAll = function(req, res) {

}

// Returns a single stache
exports.getOne = function(req, res) {

}