//Testing modules
var mocha = require('mocha');
var should = require('should');
var request = require('supertest');

//App modules to test
var server = require('../server/server.js');
var app = require('../server/server-config.js')
var routes = require('../server/routes.js');
var stacheController = require('../server/stache/stache.controller.js');

//Database modules
var mongoose = require('mongoose');
var config = require('../server/config/test.js');
var db = mongoose.connect(config.mongodb);

mongoose.connection.on('error', function(err){
  console.log('MONGOOSE ERROR', err);
});

var test_stache = {
    title: 'Veggie Burger',
    author: 'Bob',
    loc: [40, 5],
    content: 'HEY THERE PAL! WAY TO FIND ME!',
    tags: ['greeting', 'nonsense'],
    locked: false,
}

//Basic server tests
describe('Stache API', function(){

  beforeEach(function(done){
    mongoose.connection.collections['staches'].drop(function(err){
      mongoose.connection.collections['staches'].insert(test_stache, function(err, docs){
        id = docs[0]._id;
        done();
      });
    });
  });

  describe('POST /staches', function(){
    xit('should post a stache', function(done){
      var req = request(server)
      .post('/staches')
      .expect(201, done);
      
      console.log( req );
    });
  });

  describe('GET /staches', function(){
    it('should receive requests', function(done){
      request(server)
      .get('/staches')
      // .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        var result = res.body[0];
        console.log('RESULT', result);
        should.equal(result.title, test_stache.title);
        done();
      })
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
    mongoose.connection.close();
    console.log('Database connection closed.');
    done();
  });
});
