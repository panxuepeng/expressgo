var glob = require("glob")

module.exports = function(app) {
	
	// 批量加载某子目录下的js文件
	app.load = function (dirs) {
		for(var i=0; i < dirs.length; i++) {
			glob.sync(app.root + dirs[i] +'/**/*.js').forEach(function(file) {
				console.log(['load', file])
				require(file)
			})
		}
	}
}