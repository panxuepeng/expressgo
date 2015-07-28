
module.exports = function(app) {
    
    require('./mongoose')(app.conf.mongoose)
    require('./mkdir')(app)
    
    var Redis = require('./redis')(app)
    var Util = require('./util')(app)
    var Cookie = require('./cookie')(app)
    var Auth = require('./auth')(app)
    var logger = require('./log4js')(app)
    var mail = require('./mail')(app)
//    global.Logger = logger
    global.Log = logger
    app.logger = logger
    app.debug = logger.debug
    
    app.mail = mail
    app.cookie = Cookie
    global.Redis = Redis
    global.Util = Util
    global.Auth = Auth
    require('./res')(app)
    require('./tokenauth')(app)
    
    app.set('views', app.dirs.views)
    app.set('view engine', 'ejs')
}
