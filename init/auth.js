
var mongoose = require('mongoose')
var User = mongoose.model('User')

module.exports = function(app) {
	var conf = app.conf
	var util = app.util
	
	var auth = {
		// 取得已登入的用户信息
		user: function() {
			
		},
		
		// 取得登入用户的 ID
		id: function() {
			
		},
		
		// 通过用户的 ID 来登入应用程序
		loginUsingId: function(uid, next) {
			User.findOne({_id: uid}).exec(function(err, user) {
				if (err) {
					next(err)
				} else if (user && util.checkPassword(post.password, user.password)) {
					
					next(null, user)
				} else {
					next('用户不存在或密码错误.')
				}
			})
		},
		
		// 认证一个用户并且「记住」他
		// 假如您想要在您的应用程序内提供「记住我」的选项，您可以在 attempt 方法的第二个参数复制为 true ，这样就可以保留用户的认证身份 (或直到他手动登出为止)。当然，您的 users 数据库表必需包括一个字串类型的 remember_token 字段来储存「记住我」的标记。
		attempt: function(post, isRemember, next) {
			
			User.findOne({username: post.username}).exec(function(err, user) {
				if (err) {
					next(err)
				} else if (user && util.check(post.password, user.password)) {
					next(null, user)
				} else {
					next('用户不存在或密码错误.')
				}
			})
		},
		
		// validate 方法可以让您验证用户信息而不真的登入应用程序
		validate: function(post) {
			
		},
		
		// 让用户在单一请求内登入。不会有任何 session 或 cookie 被产生
		once: function(post) {
			
		},
		
		// 将一个已存在的用户实例登入您的应用程序
		login: function(user) {
			
		},
		
		// 通过记住我来认证用户
		viaRemember: function(req) {
			
		},
		
		// 判定一个用户是否已经登入您的应用程序
		check: function() {
			
		},
		
		// 将用户登出
		logout: function(req) {
			
		}
	}
	
	app.auth = auth
	return auth
}