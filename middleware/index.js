
module.exports = function(app) {

	app.logger = require('./log4js')(app)
	app.util = require('./util')(app)
	
}