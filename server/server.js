var app = require('./server-config.js');
var mongoose = require('mongoose');

app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function(){
  console.log('Server listening on port', server.address().port);
});

var production = 'mongodb://MongoLab-p:0y_6JMYwAj8Mm9Q1cl0D2SHWTxskyt21DSnuzeGnOAk-@ds050077.mongolab.com:50077/MongoLab-p';
var development = 'mongodb://localhost/specter';
var mongoUri = production;

/*
var mongoUri = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/specter';*/

mongoose.connect(mongoUri);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
