
module.exports = function(app) {
	
	var Event = require('./event')(app)
	
	global.Event = Event
	

	require('./env')(app)
	require('./dirs')(app)
	
	var helper = require('./helper')(app)
	global.Helper = helper
}
