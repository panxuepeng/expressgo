var express = require('express')

module.exports = function(app) {
	function loadController(name) {
		return require(app.root + '/app/controllers/'+ name)
	}
	
	var index = loadController('index')
	var users = loadController('users')
	
	var router = express.Router()
	router.get('/', index.wellcome)
	router.get('/create', users.create)
	router.get('/login', users.login)
	router.get('/show/:uid', users.show)
	router.get('/logout/:uid', users.logout)
	
	app.use('/', router)
}