var glob = require("glob")

module.exports = function(app) {
	
	// 批量加载某子目录下的js文件
	app.loadDirs = function(dirs) {
		for(var i=0; i < dirs.length; i++) {
			glob.sync(app.root + dirs[i] +'/**/*.js').forEach(function(file) {
				console.log(['load', file])
				require(file)
			})
		}
	}
	
	app.loadFunction = function(dir) {
		var partent = app.root + dir +'/**/*.js'
		console.log(['autoload partent', partent])
		glob.sync(partent).forEach(function(file) {
			console.log(['autoload file', file])
			require(file)(app)
		})
	}
}