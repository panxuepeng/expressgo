var express = require('express')
var bodyParser = require('body-parser')

module.exports = function(app) {
    
    var index = app.helper.loadController('index')
    var router = express.Router()
    router.use(bodyParser.urlencoded({extended: true}))
    router.use(bodyParser.json())

    router.get('/', index.wellcome)
    
    app.use('/', router)
    
    require('./api')(app)
    require('./admin')(app)
    require('./errors')(app)
}