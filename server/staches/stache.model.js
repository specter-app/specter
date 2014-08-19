//  The Stache model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// Stache collection
// ToDo: validation middleware
var StacheSchema = new Schema({
    stache_id: ObjectId,
    title: {type: String, required: true},
    date: {type: Date, default: Date.now},
    created_by: {type: String, required: true}, //user_id
    discovered_by: [String], //user_id
    lon: {type: Number, required: true},
    lat: {type: Number, required: true},
    loc: {type: [Number], index: '2dsphere', required: true},
    content: {type: String, required: true},
    tags: [String],
    locked: {type: Boolean, default: false},
    clue: {type: String, default: 'None'},
    password: {type: String, default: 'None'}
});

var Stache = mongoose.model('Stache', StacheSchema);

module.exports = Stache;