// 用户

var mongoose = require('mongoose')
var randomstring = require('randomstring')
var Admin = mongoose.model('Admin')
//var datetime = mongoose.model('validate_demo')

module.exports = {
    checkAuth: function (req, res, next) {
        
        if (/\/login/i.test(req.path) ) {
            return next()
        }
        
        var app = req.app
        var conf = app.conf
        var value = app.cookie.get(req, conf.cookie.adminAuthName)
        
        if ( value ) {
            req.admin = value
            return next()
        }
        
        res.redirect('/admin/login?returnUrl=' + req.path)
        res.end()
    },
    
    login: function(req, res, next) {
        var body = req.body
        
        Admin.findOne({username: body.username}).exec(function(err, admin) {
            if (err) {
                res.error(err)
            } else if (Util.checkPassword(body.password, admin.password)) {
                req.admin = admin
                next()
                
            } else {
                res.error('用户不存在或密码错误.')
            }
        })
    },
    
    attempt: function(req, res) {
        var app = req.app
        var conf = app.conf
        var admin = req.admin
        
        var value = {
            _id: admin._id
            , username: admin.username
            , status: admin.status
        }
        
        app.cookie.set(req, res, conf.cookie.adminAuthName, value)

        //res.redirect('/admin/main')
        res.success({url:'/admin/main', msg:'登录成功'})
    },
    
    loginshow: function(req, res){
        res.render('admin/login')
    },
    
    

    logout: function(req, res) {
        var app = req.app
        var conf = app.conf
        app.cookie.set(req, res, conf.cookie.adminAuthName, '', -1)
        res.redirect('/admin/login')
    },
    
    register: function(req, res){
        res.render('admin/adduser')
    },
    
    list: function(req, res) {
        User.find({}).exec(function(err, users) {
            if (err) {
                users = {}
            }
            res.render('admin/userlist', {'users':users})
        })
        
    }
    
}