
module.exports = function(app) {

	require('./mongoose')(app.conf.mongoose)
	require('./mkdir')(app)
	
	var Redis = require('./redis')(app)
	var Util = require('./util')(app)
	var Auth = require('./auth')(app)
	
	global.Redis = Redis
	global.Util = Util
	global.Auth = Auth
}
