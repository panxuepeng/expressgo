// 初始化 data 下的目录
var shell = require('shelljs')

module.exports = function(app) {
	var dirs = app.dirs
	
	mkdir(dirs.tmp)
	mkdir(dirs.upload)
	mkdir(dirs.cache)
	
	var logspath = dirs.logs
	mkdir(logspath)
	mkdir(logspath + '/access')
	mkdir(logspath + '/biz')
	mkdir(logspath + '/debug')
	mkdir(logspath + '/info')
	mkdir(logspath + '/error')
	mkdir(logspath + '/exception')
}

function mkdir(path) {
	if( !shell.test('-d', path) ){
		shell.mkdir('-p', path)
		console.log('mkdir '+ path)
	}
}