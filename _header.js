
// 该文件被 app.js & console.js 引用

var express = require('express')

var app = express()

global.App = app

app.set('name', 'shetuan')

// bootstrap, before config
require('./bootstrap/index')(app)

// load config
require(app.root +'config/index')(app)

// load models
Helper.load(app.root +'app/models/**/*.js')

// init, after config & models
require(app.root +'init/index')(app)

// events
Helper.load(app.root +'app/events/**/*.js')

app.event.emit('onbeforestart')

module.exports = app