

module.exports = function(app) {
	var conf = require("./app")(app)
	
	conf.log4js = require("./log4js")(app)
	conf.mongoose = require("./mongoose")(app)
	conf.redis = require("./redis")(app)
	conf.mail = require("./mail")(app)
	
	app.conf = conf
}