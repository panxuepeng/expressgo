var glob = require("glob")

module.exports = function(app) {
	
	// 批量加载某子目录下的js文件
	app.loadDir = function(dir) {
		var pattern = app.root + dir +'/**/*.js'
		console.log(['loadDir pattern', pattern])
		
		glob.sync(pattern).forEach(function(file) {
			console.log(['load', file])
			var obj = require(file)
			if (typeof obj === 'function') {
				obj(app)
			}
		})
	}
}