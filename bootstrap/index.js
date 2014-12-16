
module.exports = function(app) {

	require('./env')(app)
	require('./dirs')(app)
	require('./helper')(app)
	require('./event')(app)
	
}
