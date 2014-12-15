
var express = require('express')

var app = express()

app.set('name', 'expressgo')

// bootstrap, before config
require("./bootstrap/index")(app)

// load config
require("./config/index")(app)

// init, after config
require("./init/index")(app)

// middleware
require("./middleware/index")(app)

// load models, events
app.loadDirs(['app/models'])

app.loadFunction('app/events/')

// load routes
require("./app/routes")(app)


var port = app.conf.port || 80
app.listen(port)

console.log(app.get('name') + ' started on port '+ port+ ' at '+ new Date)

module.exports = app
