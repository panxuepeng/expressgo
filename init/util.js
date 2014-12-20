var crypto = require('crypto')
var PasswordHash = require('phpass').PasswordHash

module.exports = function(app) {
	var Hash = new PasswordHash()
	var secretKey = app.conf.secretKey
	
	var encode = function(str, secret) {
		secret = secret || secretKey
		var cipher = crypto.createCipher('aes192', secret)
		var enc = cipher.update(str, 'utf8', 'hex')
		enc += cipher.final('hex')
		return enc;
	}

	var decode = function(str, secret) {
		secret = secret || secretKey
		var decipher = crypto.createDecipher('aes192', secret)
		var dec = decipher.update(str, 'hex', 'utf8')
		dec += decipher.final('utf8')
		return dec
	}

	var md5 = function(str) {
		var md5sum = crypto.createHash('md5')
		md5sum.update(str)
		str = md5sum.digest('hex')
		return str
	}

	var password = function(str) {
		return Hash.hashPassword(md5(str)+secretKey)
	}
	
	var checkPassword = function(str, encodeStr) {
		return Hash.checkPassword(md5(str)+secretKey, encodeStr)
	}
	
	app.util = {
		encode: encode
		, decode: decode
		, md5: md5
		, password: password
		, checkPassword: checkPassword
	}
	
	return app.util
}
