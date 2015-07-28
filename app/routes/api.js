var express = require('express')
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()

module.exports = function(app) {
    
    var users = app.helper.loadController('users')
    var upload = app.helper.loadController('upload')
    
    // API
    var router = express.Router()
    app.helper.loadMiddleware(router, '*', 'api_access_control')
    app.helper.loadMiddleware(router, '*', 'api_authenticate')
    app.helper.loadMiddleware(router, '*', 'api_ratelimiter')
    
    router.post('/users/register', users.create, users.createToken)
    router.post('/users/login', users.login, users.createToken)
    router.get('/users/profile', users.show)
    router.get('/users/logout', users.logout)
    router.post('/users/edit', users.edit)
    
    router.post('/images', multipartMiddleware
        , upload.init
        , upload.check
        , upload.save
        , upload.thumb
    )
    
    app.use('/api/v1', router)
    
}