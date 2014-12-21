var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

module.exports = function(app) {

	var logger = require('./log4js')(app)
	global.Logger = logger
	global.Log = logger
	
	require('./access-control')(app)
	
	app.use(cookieParser())
	app.use(bodyParser.urlencoded({extended: true}))
	app.use(bodyParser.json())
}