var os = require('os')

var envMap = {
	'local': ['baike001']
}
module.exports = function(app) {
	
	app.env = ''
	var hostname = os.hostname()
	
	for(var key in envMap) {
		if (envMap[key].indexOf(hostname) > -1) {
			app.env = key
			break
		}
	}
}