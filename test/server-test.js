//Testing modules
var mocha = require('mocha');
var should = require('should');
var request = require('supertest');

//App modules to test
var server = require('../server/server.js');
var config = require('../server/server-config.js')
var routes = require('../server/routes.js');

//Basic server tests
describe('Stache API', function(){
  describe('GET /staches', function(){
    it('should return an array of caches', function(done){
      request(server)
      .get('/staches/?coord=40+5+100')
      .expect(200, done);
    });
  });
});