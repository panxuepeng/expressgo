
module.exports = function(app) {

	app.logger = require('./log4js')(app)
	app.util = require('./util')(app)
	app.event = require('./event')(app)
	
}