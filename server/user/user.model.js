// User model/schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User collection
var UserSchema = new Schema({
  user_id: Schema.ObjectId,
  username: {type: String, required: true},
  hashedPassword: {type: String, required: true},
  salt: {type: String, required: true},
  stachesCreated: [String],
  stachesDiscovered: [[String, Date, [{lat: Number, lon: Number, dist: Number}]]],
  currentHeatMap: [[Number, Number, Number]],
  firstName: String,
  lastName: String,
  profilePhoto: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
