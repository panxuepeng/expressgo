var passport = require('passport')
var BearerStrategy = require('passport-http-bearer').Strategy
var User = require('mongoose').model('User')

module.exports = function(app) {

    var conf = app.conf.tokenauth

    passport.use(new BearerStrategy({},
        function(token, cb) {
            // asynchronous validation, for effect...
            process.nextTick(function () {
                // Find the user by token.  If there is no user with the given token, set
                // the user to `false` to indicate failure.  Otherwise, return the
                // authenticated `user`.  Note that in a production-ready application, one
                // would want to validate the token for authenticity.

                return Redis.get(conf.prefix + token, function(err, uid) {
                    if (err) {
                        return cb(err, false)
                    }
                    return User.findOne({_id: uid}).exec(cb)
                })
            })
        }
    ))

}