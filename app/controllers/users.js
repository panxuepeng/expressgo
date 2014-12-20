
var mongoose = require('mongoose')
var User = mongoose.model('User')

module.exports = {
	create: function(req, res) {
		var post = req.query
		var post = {
			username: post.username
		 	, password: Util.password(Util.md5('111111'))
		}
		
		var user = new User(post)
		user.save(function(err) {
			if (err) {
				res.jsonp([500, err])
			} else {
				res.jsonp([200, user])
			}
		})
	},
	
	login: function(req, res) {
		var post = req.body || req.query
		
		Auth.attempt(post, false, function(err, user) {
			if (err) {
				res.jsonp([500, err])
			} else {
				res.jsonp([200, '登录成功'])
			}
		})
	},
	
	show: function(req, res) {
		var uid = req.params.uid
		
		User.findOne({ _id: uid}).exec(function (err, user) {
			if (err) {
				res.jsonp([500, err])
			} else if (!user) {
				res.jsonp([404, 'NOT FOUND'])
			} else {
				res.jsonp([200, user])
			}
		})
	},
	
	logout: function(req, res) {
		Auth.logout(req)
		res.jsonp([200, '退出成功'])
	}
	
}