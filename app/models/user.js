/**
 * User Collection
 */

var mongoose = require('mongoose')
	, Schema = mongoose.Schema


var UserSchema = new Schema({
	username: {type: String, unique: true, required: "用户名不能为空"}
	
	, password: {type: String, required: "密码不能为空"}
	
	, remember_token: {type: String}
	
	, created_at: {type: Date, default: Date.now}
	
	// 用户状态: 0删除 1正常
	, status: {type: Number, default: 1}
})


UserSchema.path('username').validate(function(value){
	return /^(?:[a-z0-9]+[_\-+.]?)*[a-z0-9]+@(?:([a-z0-9]+-?)*[a-z0-9]+.)+([a-z]{2,})+$/i.test(value)
}, '用户名需要是一个有效的Email')



/**
 * Methods
 */
UserSchema.methods = {
	
}

UserSchema.statics = {
	
}

mongoose.model('User', UserSchema)
