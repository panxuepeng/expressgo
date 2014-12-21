
module.exports = function(app) {
	
	var conf = Helper.loadConf("app")
	
	conf.log4js = Helper.loadConf("log4js")
	conf.mongoose = Helper.loadConf("mongoose")
	conf.redis = Helper.loadConf("redis")
	conf.mail = Helper.loadConf("mail")
	
	app.conf = conf
	global.Conf = conf
	return conf
}