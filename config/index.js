var shell = require("shelljs")

module.exports = function(app) {

    var conf = Helper.loadConf("app")

    conf.log4js = Helper.loadConf("log4js")
    conf.mongoose = Helper.loadConf("mongoose")
    conf.redis = Helper.loadConf("redis")
    conf.mail = Helper.loadConf("mail")
    conf.tokenauth = Helper.loadConf("tokenauth")
    conf.cookie = Helper.loadConf("cookie")
    conf.ratelimiter = Helper.loadConf("ratelimiter")

    app.conf = conf
//    global.Conf = conf
    
    // load test or local variables
    var testFile = app.root + '/config/.test'
    var envFile = app.root + '/config/.env'
    
    if (app.env === 'test' && shell.test('-f', testFile)) {
        require(testFile)(app)
    } else if (shell.test('-f', envFile)) {
        require(envFile)(app)
    }

    return conf
}