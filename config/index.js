var shell = require('shelljs')
var deepExtend = require('deep-extend')

module.exports = function(app) {
	var env = app.env || ""
	if (env) {
		env = env + '/'
	}
	
	var conf = loadIfExist("app")
	
	conf.log4js = loadIfExist("log4js")
	conf.mongoose = loadIfExist("mongoose")
	conf.redis = loadIfExist("redis")
	conf.mail = loadIfExist("mail")
	
	app.conf = conf
	
	
	
	function loadIfExist(name) {
		var _conf = require(app.root +'config/'+ name)(app)
		var _envConf
		var envFile = app.root + 'config/' + env + name + '.js'
		
		if (shell.test('-f', envFile)) {
			console.log(['load envFile', envFile])
			_envConf = require(envFile)(app)
			_conf = deepExtend({}, _conf, _envConf)
		}
		
		return _conf
	}
	
	return conf
}