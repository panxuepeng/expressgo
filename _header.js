
// 该文件被 app.js & console.js 引用

var express = require('express')

var app = express()

app.set('name', 'expressgo')

// bootstrap, before config
require('./bootstrap/index')(app)

// load config
require(app.root +'config/index')(app)

// load models
Helper.load(app.root +'app/models/**/*.js')

// init, after config
require(app.root +'init/index')(app)

// middleware
require(app.root +'middleware/index')(app)

// events
Helper.load(app.root +'app/events/**/*.js')

app.event.emit('onbeforestart')

module.exports = app