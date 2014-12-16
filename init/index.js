
module.exports = function(app) {

	require('./mongoose')(app.conf.mongoose)
	require('./mkdir')(app)
	require('./redis')(app)
	require('./util')(app)
}
