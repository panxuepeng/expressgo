
// 根据token获取用户信息

var passport = require('passport')

module.exports = {
    
    index: function(req, res, next) {
        if (/\/users\/(login|register)/.test(req.path)) {
            return next()
        }

        return passport.authenticate('bearer', 
            {session: false}, 
            function(err, user, info) {
                if (err) { 
                    return next(err)
                }
                if (! user) {
                    var errcode = req.app.errcode
                    return res.error(errcode.AUTH_INVALID_TOKEN)
                }
                req.user = user
                return next()
            }
        )(req, res, next)
    }
}
