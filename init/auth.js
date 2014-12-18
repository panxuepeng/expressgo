
module.exports = function(app) {
	var conf = app.conf
	var auth = {
		user: function() {
		
		},
		
		id: function() {
		
		},
		
		loginUsingId: function() {
		
		},
		
		attempt: function() {
			
		},
		
		// validate 方法可以让您验证用户信息而不真的登入应用程序
		validate: function() {
			
		},
		
		// 让用户在单一请求内登入。不会有任何 session 或 cookie 被产生
		once: function() {
			
		},
		
		check: function() {
			
		},
		
		// 将一个已存在的用户实例登入您的应用程序
		login: function() {
			
		},
		
		viaRemember: function() {
			
		},
		
		logout: function() {
			
		}
		
	}
	
	app.auth = auth
}