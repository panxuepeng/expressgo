
// 访问频率限制
var Limiter = require('ratelimiter')

module.exports = {
    
    index: function(req, res, next) {
        var conf = req.app.conf
        var id
        
        if (req.user) {
            id = req.user._id
        } else {
            id = req.ip
        }
        
        var limit = new Limiter({
            id: id,
            db: req.app.redis,
            max: conf.ratelimiter.max,
            duration: conf.ratelimiter.duration
        })
        
        limit.get(function(err, limit) {
            if (err) return next(err)
            // pass
            if (limit.remaining) return next()
            
            // block
            var code = req.app.errcode.RATE_LIMIT_EXCEED.code
            res.error(conf.ratelimiter.msg, code)
        })
        
    }
}
