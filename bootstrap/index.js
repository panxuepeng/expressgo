
module.exports = function(app) {

	require('./env')(app)
	require('./dirs')(app)
	require('./helper')(app)
	
	var Event = require('./event')(app)
	
	global.Event = Event
}
