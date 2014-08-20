// User model/schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User collection
var UserSchema = new Schema({
  first_name: String,
  last_name: String,
  profile_photo: String,
  // username: {type: String, required: true, validate: /\S+/},
  staches_created: [String],
  staches_discovered: [String, Date], // [stache, date]
  current_heatmap: [Number, Number, String, Date] // [lon, lat, color hex, date]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
