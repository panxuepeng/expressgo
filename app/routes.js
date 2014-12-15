var express = require('express')

module.exports = function(app) {
	var index = require(app.root + '/app/controllers/index')
	var users = require(app.root + '/app/controllers/users')

	var router = express.Router()
	router.get('/', index.wellcome)
	router.get('/create', users.create)
	router.get('/login', users.login)
	router.get('/show/:uid', users.show)
	router.get('/logout/:uid', users.logout)
	
	app.use('/', router)
}