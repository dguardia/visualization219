var request = require('supertest');
var assert = require('assert');
var controllers = require('../controllers/college.js');


describe('Controllers College', function(){
    it('should have index return 200', function(){
        assert.equal(typeof controllers.index , "function")
    });
    it('should have getCollegeById return 200', function(){
        assert.equal(typeof controllers.getCollegeById, "function")
    })
});