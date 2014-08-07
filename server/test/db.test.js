var should = require('should');
var mongoose = require('mongoose');
var config = require('../config');
var stachController = require('../stache/stache.controller.js');

process.env.NODE_ENV = 'test';
var mongoUri = config[process.env.NODE_ENV].mongodb;
var db = mongoose.connect(mongoUri);

// trap any errors from mongoose connection
mongoose.connection.on('error', function(err){
    console.log(err);
});




// After tests are done, 
// drop the database and close the connection
after(function(done) {
    db.connection.db.dropDatabase(function() {
        db.connection.close(function(){
            done();
        });
    });
});


