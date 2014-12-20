var os = require('os')

var envMap = {
	'local': ['baike001','panxuepeng']
}
module.exports = function(app) {
	app = app || {}
	app.env = ''
	var hostname = os.hostname()
	
	for(var name in envMap) {
		if (envMap[name].indexOf(hostname) > -1) {
			
			// 检测运行环境
			app.env = name
			
			break
		}
	}
	
	return app.env
}