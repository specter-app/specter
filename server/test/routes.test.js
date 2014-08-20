//Testing frameworks
var mocha = require('mocha');
var should = require('should');
var request = require('supertest');

//Test helpers
var fixture = require('./test.fixtures.js');

//Server
var server = require('../server.js');

//Database modules
var mongoose = require('mongoose');
db = mongoose.connection;

db.on('error', function(err){
  console.log(err);
});

describe('Basic server endpoint tests', function(){

    var postRes1;
    var staches = [fixture.testStache1, fixture.testStache2];

  describe('Stache API', function(){
    
    before(function(done){
      db.collections['staches'].drop(function(err){
        if(err) throw err;
        db.collections['staches'].insert(staches, function(err, docs){
          if(err) throw err;
          postRes1 = docs[0];
          //call ensureIndex to guard against lat/lon indexing failure for $geoNear queries
          db.collections['staches'].ensureIndex({ loc: '2dsphere' }, function(err){
            if(err) throw err;
            done();
          });
        });
      });
    });

    //TO DO: add user to
    describe('POST /staches', function(){
      it('should post a stache', function(done){
        request(server)
        .post('/staches')
        .send(fixture.testStache3)
        .expect(201)
        .end(function(err, res){
          if(err) throw err;
          done();
        });
      });
    });

    describe('GET /staches', function(){

      it('should retrieve nearby staches with geolocation in query string', function(done){
        request(server)
        .get('/staches/?dist=100&lon=40&lat=5')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res){
          if(err) throw err;
          //should return only the one result within range of [40, 5]
          should.equal(res.body.length, 1);
        });

        request(server)
        .get('/staches/?dist=1000000&lon=40&lat=5')
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
        .expect(400)
        .end(function(err, res){
          if(err) throw err;
          done();
        });
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
          should.equal(getRes.body.created_by, postRes1.created_by);
          should.equal(getRes.body.lat, postRes1.lat);
          should.equal(getRes.body.lon, postRes1.lon);
          should.equal(getRes.body.content, postRes1.content);
          done();
        });

      xit('should retrieve staches by user', function(done){

      });

      });
    });
  });

  describe('User API', function(){

    // before(function(done){
      // db.collections['users'].drop(function(err){
      //   if(err){
      //     console.log('HERE');
      //     throw err;
      //   }
        // db.collections['users'].insert(fixture.testUser2, function(err, docs){
        //   if(err){
        //     console.log('YO');
        //     throw err;
        //   }
        //   db.collections['users'].ensureIndex({ fbid: 'text' }, function(err){
        //     done();
        //   });
        // });
      // });
    // });

    xit('should accept requests via /signup', function(done){
      request(server)
      .post('/users/signup')
      .send(fixture.testUser1)
      .expect(201)
      .end(function(err, res){
        if(err) throw err;
        done();
      });
    });

    xit('should successfully sign up a new user via /signup', function(done){
      request(server)
      .post('/users/signup')
      .send(fixture.testUser1)
      .expect(201)
      .end(function(err, res){
        if(err) throw err;
        //should.equal(fixture.testUser1.username, res.body.username);
        //should receive message confirming success of signup and token
        done();
      });
    });

    it('should create and login new user via POST request via /login/:id', function(done){
      request(server)
      .post('/users/login/1234')
      .send(fixture.testUser1)
      .expect(201)
      .end(function(err, res){
        if(err) throw err;
        should.equal(res.body.fbid, '1234');
        done();
      })
    });

    it('should login an existing user via GET request via /login/:id', function(done){
      request(server)
      .get('/users/login/1234')
      .expect(200)
      .end(function(err, res){
        if(err) throw err;
        should.equal(res.body.fbid, '1234');
        should.equal(res.body.first_name, 'Bob');
        should.equal(res.body.last_name, 'Owen');
        done();
      })
    });

  });

  describe('Discoveries API', function(){

    it('should accept POST requests via /discoveries', function(done){
      request(server)
      .post('/discoveries/?sid=' + postRes1._id + '&fbid=1234')
      .expect(201)
      .end(function(err, res){
        if(err) throw err;
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
