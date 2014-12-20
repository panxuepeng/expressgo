
module.exports = function(app) {
	
	var Event = require('./event')(app)
	
	global.Event = Event
	

	require('./env')(app)
	require('./dirs')(app)
	require('./helper')(app)
	
}
