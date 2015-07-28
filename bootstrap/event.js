var util = require("util")
var events = require("events")

module.exports = function(app) {
    app = app || {}
    function Event() {
        events.EventEmitter.call(this)
    }

    util.inherits(Event, events.EventEmitter)

    app.event = new Event()
    return app.event
}