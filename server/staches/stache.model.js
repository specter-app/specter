//  The Stache model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Stache collection
// ToDo: validation middleware
var StacheSchema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },
    created_by: { type: String, ref: 'User', required: true }, //user fbid
    discovered_by: [{ type: String, ref: 'User' }], //possibly more than one user fbid
    lon: { type: Number, required: true },
    lat: { type: Number, required: true },
    loc: { type: [Number], index: '2dsphere', required: true },
    content: { type: String, required: false },
    aws_url: String,
    tags: [String],
    locked: { type: Boolean, default: false },
    clue: String,
    password: String
});

var Stache = mongoose.model('Stache', StacheSchema);

module.exports = Stache;