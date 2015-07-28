
var app = require('./_header')

app.set('views', app.dirs.views)
app.set('view engine', app.conf['view engine'])

// load routes and controllers
require("./app/routes/index")(app)

var port = app.conf.port || 80
app.listen(port)

app.event.emit('onstart', port)
module.exports = app
