var should = require('should')
  , request = require('supertest')
  
var PasswordHash = require('phpass').PasswordHash;
var passwordHash = new PasswordHash();
var password = 'abc123';

var hash = passwordHash.hashPassword(password);
console.log(hash)

var hash = passwordHash.hashPassword(password);
console.log(hash)

describe('PasswordHash', function() {
	it('passwordHash.checkPassword', function() {
		should(true).eql(passwordHash.checkPassword(password, hash))
	})
})
