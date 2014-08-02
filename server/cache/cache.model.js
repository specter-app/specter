//  The Cache model

var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var digicacheSchema = new Schema({
    digicache: ObjectId,
    title: String,
    date: {type: Date, default: Date.now},
    author: {type: String, default: 'Anonymous'},
    content: String
});

module.exports = mongoose.model('Post', postSchema);