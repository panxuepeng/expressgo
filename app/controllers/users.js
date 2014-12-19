
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
				return res.send(err)
			}
			res.jsonp([200, user])
		})
	},
	
	login: function(req, res) {
		var post
		if (req.body) {
			post = req.body
		} else {
			post = {
				username: req.params.username
				, password: req.params.password
			}
		}
		
		Auth.attempt(post, false, function(err, user) {
			if (err) {
				res.jsonp([500, err])
			} else {
				res.jsonp([200, '登录成功'])
			}
		})
	},
	
	show: function(req, res) {
		var uid = req.params.id
		var user
		
		if (!uid) {
			user = Auth.viaRemember(req)
		//	console.log(user)
			uid = user.id
		}
		
		User.findOne({ _id: uid}).exec(function (err, user) {
			if (err) {
				res.jsonp([500, err])
			} else if (!user) {
				res.jsonp([404, 'NOT FOUND'])
				
			} else {
			
				var userinfo = {
					username: user.username
				}
				
				res.jsonp([200, userinfo])
			}
		})
	},
	
	logout: function(req, res) {
		Auth.logout(req, res)
		res.jsonp([200, '退出成功'])
	}
	
}