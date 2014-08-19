// Database modules
var mongoose = require('mongoose');
var should = require('should');
var assert = require('assert');

// Schemas and fixtures
var Stache = require('../staches/stache.model.js');
var User = require('../users/user.model.js');
var fixtures = require('./test.fixtures.js');

// Use test database
var config = require('../config/test.js');
var db = mongoose.connect(config.mongodb);

// trap any errors from mongoose connection
mongoose.connection.on('error', function(err){
  console.log(err);
});

describe('Stache model', function() {

  beforeEach(function(done){
    // Clear out db
    Stache.remove(done);
  });

  describe('Save', function() {
    it('should save new staches without error', function(done) {
      var stache1 = new Stache(fixtures.testStache1);
      var stache2 = new Stache(fixtures.testStache2);
      stache1.save(function(err, stache1) {
        stache2.save(function(err, stache2) {
          done();
        });
      });
    });
  });

  describe('Get One by Id', function() {
    var stache1;

    beforeEach(function(done) {
      stache1 = new Stache(fixtures.testStache1);
      stache1.save(function(err, stache1) {
        done();
      });
    });

    it('should retrieve the correct stache by id', function(done) {
      var id = String(stache1._id);
      Stache.findOne({_id: id}, function(err, stache) {
        stache._id.should.eql(stache1._id);
        done();
      });
    });
  });

  describe('Get Nearby', function() {
     var stache1, stache2;

    beforeEach(function(done) {
      stache1 = new Stache(fixtures.testStache1);
      stache2 = new Stache(fixtures.testStache2);
      stache1.save(function(err, stache1) {
        stache2.save(function(err, stache2) {
          done();
        });
      });
    });

    it('should retrieve nearby staches', function(done) {
      var coord = [40, 5];
      var dist = 120000; //120 km

      Stache.find(
        { loc :
           { $near :
            {
            $geometry : {type : "Point", coordinates : coord},
            $maxDistance : dist // meters
            }
           }
        },
        function(err, staches) {
          staches.length.should.eql(2);
          done();
        }
      );
    });
  });

  describe('Stache Model Schema', function() {
    var stache1, stache2;

    beforeEach(function(done) {
      stache1 = new Stache(fixtures.testStache1);
      stache2 = new Stache(fixtures.testStache2);
      stache1.save(function(err, stache1) {
        stache2.save(function(err, stache2) {
          done();
        });
      });
    });

    it('should have required properties', function(done) {
      // Test stache1
      stache1.should.have.property('title', 'Advice From Yoda');
      var coord1 = [40 , 6];
      assert.deepEqual(JSON.stringify(stache1.loc), JSON.stringify(coord1));
      stache1.should.have.property('locked', true);
      stache1.should.have.property('content', 'Train yourself to let go of everything you fear to lose.');

      // Test stache2
      stache2.should.have.property('title', 'Wise Words from Darth Vader');
      var coord2 = [40 , 5];
      assert.deepEqual(JSON.stringify(stache2.loc), JSON.stringify(coord2));
      stache2.should.have.property('locked', false);
      stache2.should.have.property('content', 'The ability to destroy a planet is insignificant next to the power of the force.');
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

describe('User model', function(){

  beforeEach(function(done){
    User.remove(done);
  });

  describe('Signup', function(){
    xit('should save new user without error', function(done){

    });
  });

  describe('Login', function(){
    xit('should authenticate a user upon login', function(done){

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


