//  The Stache model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// Stache collection
// ToDo: validation middleware
var StacheSchema = new Schema({
    stache: ObjectId,
    title: {type: String, required: true},
    date: {type: Date, default: Date.now},
    author: {type: String, default: 'Anonymous'},
    loc: {type: [Number], index: '2dsphere', required: true},
    content: {type: String, required: true},
    tags: [String],
    locked: {type: Boolean, default: false},
    clue: {type: String, default: 'None'},
    password: {type: String, default: 'None'}
});

var Stache = mongoose.model('Stache', StacheSchema);
module.exports = Stache;