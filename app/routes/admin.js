var express = require('express')
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()
var cookieParser = require('cookie-parser')

module.exports = function(app) {
    
    // 管理后台
    var router = express.Router()
    var adminIndex = app.helper.loadController('admin/index')
    var adminLogin = app.helper.loadController('admin/admins')
    
    // 后台URL需要解析cookie
    router.use(cookieParser())
    router.all('*', adminLogin.checkAuth)
    
    router.get('/main', adminIndex.index)
    router.get('/login', adminLogin.loginshow)
    router.get('/logout', adminLogin.logout)
    router.post('/login', adminLogin.login, adminLogin.attempt)
    
    app.use('/admin', router)
}