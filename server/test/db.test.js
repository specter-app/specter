// Database modules
var mongoose = require('mongoose');
var should = require('should');
var assert = require('assert');

// Schemas and fixtures
var Stache = require('../staches/stache.model.js');
var User = require('../users/user.model.js');
var Discovery = require('../discoveries/discovery.model.js');
var fixtures = require('./test.fixtures.js');
var userController = require('../users/user.controller.js');
var stacheController = require('../staches/stache.controller.js');
var discoveryController = require('../discoveries/discovery.controller.js');

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
      should.exist(stache1.created_by);
      should.exist(stache1.locked);

      // Test stache2
      should.exist(stache2._id);
      should.exist(stache2.date);
      should.exist(stache2.created_by);
      should.exist(stache2.locked);
      done();
    });
  });
});

describe('User model', function(){

  beforeEach(function(done){
    User.remove(done);
  });

  describe('Login', function(){
    it('should save a new user without error', function(done){
      var user2 = new User(fixtures.testUser2);
      user2.save(function(err, savedUser){
        should.equal(user2.fbid, savedUser.fbid);
        should.equal(user2.first_name, savedUser.first_name);
        should.equal(user2.last_name, savedUser.last_name);
        done();
      });
    });
  });

});

describe('Discovery model', function(){

  before(function(done){
    Stache.remove(function(err){
      if(err) throw err;
      User.remove(function(err){
        if(err) throw err;
        done();
      });
    });
  });

  beforeEach(function(done){
    Discovery.remove(function(err){
      if(err) throw err;
      done();
    });
  });

  describe('Discover', function(){
    it('should save a new discovery to the Discovery collection without error', function(done){
      var discovery1 = new Discovery(fixtures.testDiscovery1);
      discovery1.save(function(err, savedDiscovery){
        if(err) throw err;
        should.equal(discovery1.stache_id, savedDiscovery.stache_id);
        should.equal(discovery1.user_fbid, savedDiscovery.user_fbid);
        done();
      });
    });
  });

  describe('Add to user and stache models', function(){

    var testStache;
    var testUser;
    var testDiscovery;
    var savedDiscovery;

    before(function(done){
      testStache = new Stache(fixtures.testStache3);
      testUser = new User(fixtures.testUser2);
      testStache.save(function(err, savedStache){
        testUser.save(function(err, savedUser){
          done();
        });
      });
    });

    beforeEach(function(done){
      testDiscovery = new Discovery( { stache_id: testStache._id, user_fbid: testUser.fbid } );
      testDiscovery.save(function(err, doc){
        if(err) throw err;
        savedDiscovery = doc;
        done();
      });
    });

    it('should add a new user to respective stache upon discover', function(done){      
      should.equal(testDiscovery.stache_id, savedDiscovery.stache_id);
      should.equal(testDiscovery.user_fbid, savedDiscovery.user_fbid);
      userController.addStaches_Discovered(testDiscovery, function(){
        User.find({fbid: savedDiscovery.user_fbid}, function(err, user){
          user[0].staches_discovered.should.containEql(String(testStache._id)); //convert to String since type is Object since id
          done();
        });
      });
    });

    it('should add a new stache to respective user upon discover', function(done){
      should.equal(testDiscovery.stache_id, savedDiscovery.stache_id);
      should.equal(testDiscovery.user_fbid, savedDiscovery.user_fbid);
      stacheController.addDiscovered_By(testDiscovery, function(){
        Stache.find({_id: savedDiscovery.stache_id}, function(err, stache){
          stache[0].discovered_by.should.containEql(String(testUser.fbid));
          done();
        });
      });    
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


