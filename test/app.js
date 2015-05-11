var request = require('supertest');
var assert = require('assert');
var app = require('../app.js');
var controllers = require('../controllers/college.js');

describe('GET /', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('GET /login', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/login')
      .expect(200, done);
  });
});

describe('GET /signup', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/signup')
      .expect(200, done);
  });
});

describe('GET /api', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/api')
      .expect(200, done);
  });
});

describe('GET /contact', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/contact')
      .expect(200, done);
  });
});

describe('GET /random-url', function() {
  it('should return 404', function(done) {
    request(app)
      .get('/reset')
      .expect(404, done);
  });
});

describe('GET /colleges', function(){
  it('should return 200 OK', function(done){
    request(app)
        .get('/colleges')
        .expect(200, done);
  })
});

describe('GET /topcolleges', function(){
  it('should return 200 OK', function(done){
    request(app)
        .get('/topcolleges')
        .expect(200, done);
  })
});