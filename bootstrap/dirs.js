var path = require('path')
	, rootPath = path.normalize(__dirname + '/../')
	
module.exports = function(app) {
	
	app.root = rootPath
	console.log(['rootPath', rootPath])
	
	app.dirs = {
		storage: rootPath + '/storage'
		, logs: rootPath + '/storage/logs'
		, tmp: rootPath + '/storage/tmp'
		, upload: rootPath + '/storage/upload'
		, cache: rootPath + '/storage/cache'
	}
}