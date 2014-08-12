//Testing frameworks
var mocha = require('mocha');
var should = require('should');
var request = require('supertest');

//Test helpers
var fixture = require('./test.fixtures.js');
var Stache = require('../stache/stache.model.js');

//Server
var server = require('../server.js');

//Database modules
var mongoose = require('mongoose');
db = mongoose.connection;

db.on('error', function(err){
  console.log(err);
});

//Basic server route tests
describe('Stache API', function(){

  describe('POST /staches', function(){
    it('should post a stache', function(done){
      request(server)
      .post('/staches')
      .send(fixture.testStache3)
      .expect(201, done);
    });
  });

  describe('GET /staches', function(){

    var stachesRes, postRes1, postRes2, postRes3;
    var staches = [fixture.testStache1, fixture.testStache2, fixture.testStache3];
    
    before(function(done){
      db.collections['staches'].drop(function(err){
        if(err) throw err;
        db.collections['staches'].insert(staches, function(err, docs){
          if(err) throw err;
          stachesRes = docs;
          postRes1 = docs[0];
          postRes2 = docs[1];
          postRes3 = docs[2];
          // console.log('DOCS', docs);
          //call ensureIndex to guard against lat/long indexing failure for $geoNear queries
          db.collections['staches'].ensureIndex({ loc: "2dsphere" }, function(err){
            done();
          });
        });
      });
    });

    it('should retrieve nearby staches with geolocation in query string', function(done){
      request(server)
      .get('/staches/?coord=40+5+100')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if(err) throw err;
        //should return only the one result within range of [40, 5]
        should.equal(res.body.length, 1);
      });

      request(server)
      .get('/staches/?coord=40+5+1000000')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if(err) throw err;
        //should return all 3 results since max distance is so large
        should.equal(res.body.length, 3);
        done();
      });
    });

    it('should error 400 on retrieve nearby staches if no id param or geolocation query', function(done){
      request(server)
      .get('/staches')
      // .expect('Content-Type', /json/)
      .expect(400, done);
    });

    it('should retrieve a correct stache by id', function(done){
      request(server)
      .get('/staches/' + postRes1._id)        
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, getRes){
        if(err) throw err;
        should.equal(getRes.body._id, postRes1._id);
        should.equal(getRes.body.title, postRes1.title);
        should.equal(getRes.body.author, postRes1.author);
        should.equal(getRes.body.lat, postRes1.lat);
        should.equal(getRes.body.lon, postRes1.lon);
        should.equal(getRes.body.content, postRes1.content);
        done();
      });

    });
  });

  after(function(done){
    db.db.dropDatabase(function(err){
      if(err) throw err;
      db.close(function(err){
        if(err) throw err;
        console.log('Database connection closed.');
        done();
      });
    });
  });
});
