//Testing modules
var mocha = require('mocha');
var should = require('should');
var request = require('supertest');

//App modules to test
var server = require('./server/server.js');
var config = require('./server/server-config.js')
var routes = require('./server/routes.js');
var stacheController = require('./server/stache/stache.controller.js');

//Database modules
var mongoose = require('mongoose');
var connectionString = require('./server/config/test.js');
mongoose.connect(connectionString || 'mongodb://localhost/specter/server-test');

//Basic server tests
describe('Stache API', function(){
  describe('GET /staches', function(){
    it('should receive requests', function(done){
      request(server)
      .get('/staches')
      .expect('Content-Type', /json/)
      .expect(200, done);
    });

    it('should return an array of caches when sent geocoords', function(done){
      var temp = request(server).get('/staches/?coord=40+5+100').expect('Content-Type', /json/);
      console.log( temp );
      temp.expect(200, done);
    });
  });
});