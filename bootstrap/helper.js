var glob = require("glob")
var shell = require("shelljs")
var deepExtend = require('deep-extend')

module.exports = function(app) {
	var helper = {}
	
	// 批量加载某子目录下的js文件
	helper.load = function(pattern) {
		console.log(['loadDir pattern', pattern])
		
		glob.sync(pattern).forEach(function(file) {
			console.log(['load', file])
			var obj = require(file)
			if (typeof obj === 'function') {
				obj(app)
			}
		})
	}
	
	helper.loadConf = function(name) {
		var env = app.env || ""
		if (env) {
			env = env + '/'
		}
		
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
	
	return helper
}