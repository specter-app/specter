var should = require('should');
var mongoose = require('mongoose');
var config = require('../config');
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
        // Clear out db
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
        it('should save new staches without error', function(done) {
            var stache1 = new Stache(testStache1);
            var stache2 = new Stache(testStache1);
            stache1.save(function(err, stache1) {
                stache2.save(function(err, stache2) {
                    done();
                });
            });
        });
    });

    describe('Get One by ID', function() {
        var stache1, stache2;

        beforeEach(function(done) {
            stache1 = new Stache(testStache1);
            stache2 = new Stache(testStache1);
            stache1.save(function(err, stache1) {
                stache2.save(function(err, stache2) {
                    done();
                });
            });
        });

        it('should retrieve the correct stache', function(done) {
            var id = String(stache1._id);
            Stache.findOne({_id: id}, function(err, stache) {
              stache._id.should.eql(stache1._id);
              done();
            });
        });
    });

    describe('Get Nearby', function() {
       
    });

    describe('Stache Model Schema', function() {
        var stache1, stache2;

        beforeEach(function(done) {
            stache1 = new Stache(testStache1);
            stache2 = new Stache(testStache1);
            stache1.save(function(err, stache1) {
                stache2.save(function(err, stache2) {
                    done();
                });
            });
        });

        it('should have required properties', function(done) {
            // Test stache1
            stache1.should.have.property('title', 'Advice From Yoda');
            // stache1.should.have.property('loc', [50, 5]);
            stache1.should.have.property('locked', true);
            stache1.should.have.property('content', 'Train yourself to let go of everything you fear to lose.');

            // Test stache2
            stache2.should.have.property('title', 'Advice From Yoda');
            // stache2.should.have.property('loc', [50, 5]);
            stache2.should.have.property('locked', true);
            stache2.should.have.property('content', 'Train yourself to let go of everything you fear to lose.');
            done();
        });

        it('should have default properties', function(done) {
            // Test stache1
            should.exist(stache1._id);
            should.exist(stache1.date);
            should.exist(stache1.author);
            should.exist(stache1.locked);
            should.exist(stache1.clue);
            should.exist(stache1.password);

            // Test stache2
            should.exist(stache2._id);
            should.exist(stache2.date);
            should.exist(stache2.author);
            should.exist(stache2.locked);
            should.exist(stache2.clue);
            should.exist(stache2.password);
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


