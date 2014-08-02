//  The Stache model

var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var stacheSchema = new Schema({
    stache: ObjectId,
    title: String,
    date: {type: Date, default: Date.now},
    author: {type: String, default: 'Anonymous'},
    location: {type: Number},
    content: String
});

module.exports = mongoose.model('Stache', stacheSchema);