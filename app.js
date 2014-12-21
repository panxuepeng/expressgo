
var app = require('./_header')

// load routes and controllers
require("./app/routes")(app)
require("./app/errors")(app)

var port = app.conf.port || 80
app.listen(port)

app.event.emit('onstart', port)
module.exports = app
