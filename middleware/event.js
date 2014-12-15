var util = require("util")
var events = require("events")

function Event() {
    events.EventEmitter.call(this)
}

util.inherits(Event, events.EventEmitter)

var event = new Event()

module.exports = function(app) {
	return event
}