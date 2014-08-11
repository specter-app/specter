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

    beforeEach(function(done){
      db.collections['staches'].drop(function(err){
        if(err) throw err;
        done();
      });
    });

    xit('should retrieve nearby staches', function(done){
      
      var staches = [fixture.testStache1, fixture.testStache2, fixture.testStache3];
      
      before(function(done){
        db.collections['staches'].insert(staches, function(err, docs){
          if(err) throw err;
          done(docs);
        });
      });

      request(server)
      .get('/staches')
      // .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        var result = res.body[0];
        console.log('RESULT', result);
        should.equal(result.title, test_stache.title);
        done();
      });
    });

    it('should retrieve a correct stache by id', function(done){
      request(server)
      .post('/staches')
      .send(fixture.testStache2)
      .expect(201)
      .end(function(err, postRes){
        request(server)
        .get('/staches/' + postRes.body._id)        
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, getRes){
          should.equal(getRes.body._id, postRes.body._id);
          should.equal(getRes.body.title, postRes.body.title);
          should.equal(getRes.body.author, postRes.body.author);
          should.equal(getRes.body.lat, postRes.body.lat);
          should.equal(getRes.body.lon, postRes.body.lon);
          should.equal(getRes.body.content, postRes.body.content);
          done();
        });
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
