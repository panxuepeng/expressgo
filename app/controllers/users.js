
var mongoose = require('mongoose')
var User = mongoose.model('User')

module.exports = {
	create: function(next) {
		
	},
	login: function(next) {
		var uid = req.params.uid
		
		User.findOne({ username: post.username}).exec(function(err, user) {
			if (err) {
				res.jsonp([500, err])
			} else if ( !user ) {
				res.jsonp([404, '用户不存在或密码错误'])
			} else if ( user.password !== utils.hashPassword(post.password) ) {
				res.jsonp([405, '用户不存在或密码错误.'])
			} else {
				res.jsonp([200, '登录成功'])
			}
		})
	},
	show: function(next) {
		
	},
	logout: function(next) {
		
	}
	
}