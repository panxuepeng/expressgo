var crypto = require('crypto')

module.exports = function(app) {

	var encode = function(str, secret) {
		var cipher = crypto.createCipher('aes192', secret)
		var enc = cipher.update(str, 'utf8', 'hex')
		enc += cipher.final('hex')
		return enc;
	}

	var decode = function(str, secret) {
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
		return md5(md5(str) + str)
	}
	
	return {
		encode: encode
		, decode: decode
		, md5: md5
		, password: password
	}
}
