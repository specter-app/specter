var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DiscoverySchema = new Schema({
  stache_id: {type: String, required: true},
  user_fbid: {type: String, required: true}
});

var Discovery = mongoose.model('Discovery', DiscoverySchema);

module.exports = Discovery;
