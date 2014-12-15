
var mongoose = require('mongoose')

module.exports = function(conf) {
	if (conf && conf.uri) {
		mongoose.connect(conf.uri, function(err) {
			if ( err ) {
				console.error(conf.uri + ' connect failed.')
			} else {
				console.log(conf.uri + ' connect success.')
			}
		})
	} else {
		console.log('未设置 mongoose 连接信息.')
	}
}