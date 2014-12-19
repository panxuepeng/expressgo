/**
 * npm install -g mocha
 * mocha
 * 
 */
var mongoose = require('mongoose')
  , should = require('should')
  , request = require('supertest')
  , app = require('../app')

console.log('\n\n ==============\n   start test\n ==============\n')

describe('Array', function() {
	describe('#indexOf()', function() {
		it('should return -1 when the value is not present', function() {
			should(-1).eql([1, 2, 3].indexOf(5))
			should(-1).eql([1, 2, 3].indexOf(0))
			
			should(0).eql([1, 2, 3].indexOf(1))
		})
	})
})

function test(name) {
	require(name)(app, request, should, mongoose)
}


test('./controllers/index')