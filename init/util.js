var crypto = require('crypto')
var _ = require('underscore')
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
        var decipher
        var dec = ''
        
        secret = secret || secretKey
        decipher = crypto.createDecipher('aes192', secret)
        
        // 避免解密失败导致异常
        dec = decipher.update(str, 'hex', 'utf8')
        try {
            dec += decipher.final('utf8')
        } catch(e){
            app.logger.exception('decode error: '+str)
        }
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
    
    var date2int = function(date) {
        return Math.round(+ new Date(date)/1000)
    }

    app.util = {
        encode: encode
        , decode: decode
        , md5: md5
        , password: password
        , checkPassword: checkPassword
        , date2int: date2int
    }

    return app.util
}
