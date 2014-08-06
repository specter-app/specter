//  The Stache model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// Stache collection
// ToDo: validation middleware
var StacheSchema = new Schema({
    stache: ObjectId,
    title: String,
    date: {type: Date, default: Date.now},
    author: {type: String, default: 'Anonymous'},
    loc: {type: [Number], index: '2dsphere'},
    content: String,
    tags: [String]
});

var Stache = mongoose.model('Stache', StacheSchema);
module.exports = Stache;