// 用户

var mongoose = require('mongoose')
var User = mongoose.model('User')
var randomstring = require('randomstring')
var _ = require('underscore')

module.exports = {
    
    create: function(req, res, next) {
        var post = req.body
        var post = {
            username: post.username
            , password: Util.password(post.password)
            , mobile: post.mobile
        }
        
        var user = new User(post)
        user.save(function(err) {
            if (err) {
                res.error(err)
            } else {
                //res.success(user)
                req.user = user
                next()
            }
        })
    },
    
    login: function(req, res, next) {
        
        User.findOne({username: req.body.username})
        .exec(function(err, user) {
            if (err) {
                res.error(err)
            } else if (user && Util.checkPassword(req.body.password, user.password)) {
                
                req.user = user
                next()
                
            } else {
                res.error('用户不存在或密码错误.')
            }
        })
    },
    
    // 创建会话信息
    createToken: function(req, res) {
        var conf = req.app.conf.tokenauth
        var user = req.user
        var access_token = randomstring.generate()
        
        delete user.password
        
        Redis.set(conf.prefix + access_token, user._id, function(err) {
            Redis.expire(conf.prefix + access_token, conf.expired)
            var result = {
                access_token: access_token,
                expired_at: conf.expired + Math.ceil(Date.now() / 1000),
                user: user
            }
            res.success(result)
        })
    },
    
    show: function(req, res) {
        var user_id = req.query.user_id || req.user._id
        
        User.findOne({ _id: user_id}, {password: 0})
        .exec(function (err, user) {
            if (err) {
                res.error(err)
            } else {
                res.success(user)
            }
        })
    },
    
    edit: function(req, res) {
        var user_id = req.user._id
        var post = req.body
        
        if (_.isEmpty(post)) {
            return res.error(req.app.errcode.BAD_PARAMS)
        }
        
        if (post.password) {
            post.password = Util.password(post.password)
        }
        
        save(post)
        
        function save(post) {
            User.findByIdAndUpdate(user_id, post, function(err, user) {
                if (err) {
                    return res.error(err)
                }
                
                user = user.toObject()
                delete user.password
                return res.success(user)
            })
        }
    },
    
    
    logout: function(req, res) {
        var conf = req.app.conf.tokenauth
        Redis.del(conf.prefix + req.query.access_token, function(err) {
            if (err) {
                return res.error(err)
            }
            return res.success('ok')
        })
    }
    
}