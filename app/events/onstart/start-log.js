
module.exports = function(app) {
	app.event.on('onstart', function(port) {
		console.log(app.get('name') + ' started on port '+ port+ ' at '+ new Date)
	})
}