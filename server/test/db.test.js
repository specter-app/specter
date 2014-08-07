var should = require('should');
var mongoose = require('mongoose');
var config = require('../config');
// var stachController = require('../stache/stache.controller.js');
var Stache = require('../stache/stache.model.js');
var testStache1, testStache2;

process.env.NODE_ENV = 'test';
var mongoUri = config[process.env.NODE_ENV].mongodb;
var db = mongoose.connect(mongoUri);

// trap any errors from mongoose connection
mongoose.connection.on('error', function(err){
    console.log(err);
});

console.log('NODE_ENV: ' + process.env.NODE_ENV);
 
if ( process.env.NODE_ENV !== 'test' ) {
    console.log("NODE_ENV does not equal 'test'!");
    process.exit(1);
}

describe('Stache model', function() {

    beforeEach(function(done){
        //clear out db
        Stache.remove(done);
 
        testStache1 = {
            title: 'Advice From Yoda',
            author: 'Yoda',
            loc: [50, 5],
            content: 'Train yourself to let go of everything you fear to lose.',
            tags: ['Wise', 'Advice'],
            locked: true,
            clue: 'Training Plan',
            password: 'L3tG0'
        };
 
        testStache2 = {
            title: 'Wise Words from Darth Vader',
            author: 'Darth Vader',
            loc: [40, 5],
            content: 'The ability to destroy a planet is insignificant next to the power of the force.',
            tags: ['Wise', 'Evil']
        };
    });

    describe('Save', function() {
        var stache;

        beforeEach(function(done) {
            stache = new Stache(testStache1);
            stache.save(function(err, stache) {
                done();
            });
        });

        it('should have required properties', function(done) {
            stache.should.have.property('title', 'Advice From Yoda');
            // stache.should.have.property('loc', [50, 5]);
            stache.should.have.property('locked', true);
            stache.should.have.property('content', 'Train yourself to let go of everything you fear to lose.');
            done();
        });

        it('should have default properties', function(done) {
            should.exist(stache._id);
            should.exist(stache.date);
            should.exist(stache.author);
            should.exist(stache.locked);
            should.exist(stache.clue);
            should.exist(stache.password);
            done();
        });
    });
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


