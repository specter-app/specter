var app = require('./server-config.js');
var mongoose = require('mongoose');

app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function(){
  console.log('Server listening on port', server.address().port);
});

mongoose.connect('mongodb://localhost/specter');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
