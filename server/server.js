var app = require('./server-config.js');
var mongoose = require('mongoose');

app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function(){
  console.log('Server listening on port', server.address().port);
});


var mongoUri = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/specter';

console.log("mongoUri: ", mongoUri);
mongoose.connect(mongoUri);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
