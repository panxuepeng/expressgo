
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
app.loadDir('app/models')
app.loadDir('app/events')

// load routes and controllers
require("./app/routes")(app)

var port = app.conf.port || 80
app.listen(port)

app.event.emit('onstart', port)
module.exports = app
