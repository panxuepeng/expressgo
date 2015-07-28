

module.exports = function(app) {
    var util = app.util
    var md5 = util.md5
    var encode = util.encode
    var decode = util.decode
    var conf = app.conf
    
    var cookie = {}

    // 加密规则
    // 例如 value = 'a'
    // str = '{"key":"a","type":"string"}'
    // code = encode(str, conf.secretKey+req.ip)
    // cookieValue = md5(str) + md5(code) + code
    cookie.set = function(req, res, name, value, maxAge) {
        if (!name) {
            throw new Error('cookie name is required.')
        }

        maxAge = maxAge || conf.cookie.maxAge || 3600
        var type = typeof value
        if (type === 'object') {
            value = JSON.stringify(value)
        }
        var o = {key: value, type: type}

        value = JSON.stringify(o)
        var secret = this.secret(req)
        var code = encode(value, secret)
        code = md5(value) + md5(code) + code
        res.cookie(name, code, {path: '/', maxAge: maxAge, httpOnly:true})

        return true
    }

    cookie.get = function(req, name) {
        if (!req.cookies) {
            throw new Error('req.cookies is undefined')
        }
        var code = req.cookies[name]
        , decodeStr = ''
        , value = ''
        , md5Value = ''
        , md5Code = ''

        if ( code && code.length > 64 ) {
            md5Value = code.substr(0, 32)
            md5Code = code.substr(32, 32)
            code = code.substr(64)
            
            if ( md5Code !== md5(code) ) {
                return false
            }
            
            var secret = this.secret(req)
            decodeStr = decode(code, secret)
            
            if ( md5Value !== md5(decodeStr) ) {
                return false
            }
            
            var o = null
            try {
                // 当 decodeStr 不能正确解析时会抛异常，这里直接忽略掉这个异常
                o = JSON.parse(decodeStr)
            } catch(e){
                // log
                value = false
            }

            if ( o && o.key ) {
                value = o.key
                if (o.type === 'object') {
                    value = JSON.parse(value)
                } else if (o.type === 'number') {
                    value = parseInt(value, 10)
                }
            }
        }
        return value
    }
    
    cookie.secret = function(req) {
        userAgent = req.get('User-Agent') || ''
        
        // 过滤掉里面的版本号数字，避免浏览器升级导致cooke验证失败
        userAgent = userAgent.replace(/[\d.]/g, '*')
        
        return md5(conf.secretKey + req.ip + userAgent)
        
    }

    return cookie

}