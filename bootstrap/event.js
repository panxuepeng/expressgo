var util = require("util")
var events = require("events")

module.exports = function(app) {

	function Event() {
		events.EventEmitter.call(this)
	}

	util.inherits(Event, events.EventEmitter)

	app.event = new Event()
}