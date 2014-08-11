//Testing frameworks
var mocha = require('mocha');
var should = require('should');
var request = require('supertest');

//Test helpers
var fixture = require('./test.fixtures.js');
var Stache = require('../stache/stache.model.js');

//Database modules
var mongoose = require('mongoose');
db = mongoose.connection;

db.on('error', function(err){
  console.log(err);
});

//Basic server route tests
describe('Stache API', function(){
  var staches = [];
  staches.push(fixture.testStache1, fixture.testStache2, fixture.testStache3);

  describe('POST /staches', function(){
    it('should post a stache', function(done){
      request('http://localhost:8000')
      .post('/staches')
      .send(staches[0])
      .expect(201, done);
    });
  });

  describe('GET /staches', function(){

    // beforeEach(function(done){
    //   mongoose.connection.collections['staches'].drop(function(err){
    //     mongoose.connection.collections['staches'].insert(staches, function(err, docs){
    //       done(docs);
    //     });
    //   });
    // });

    xit('should receive requests', function(done){
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

    xit('should return an array of caches when sent geocoords', function(done){
      var temp = request(server).get('/staches/?coord=40+5+100')
      // .expect('Content-Type', /json/);
      .expect(200)
      .end(function(err, res){
        console.log(res.text);
        done();
      });
    });
  });

  after(function(done){
  //   db.collections['staches'].drop(function(err){
  //     if(err) throw err;
      db.close(function(err){
        if(err) throw err;
        console.log('Database connection closed.');
        done();
      });
  //   });
  });
});
