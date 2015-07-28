/**
 * User Collection
 */

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var appUtils = mongoose.appUtils

var UserSchema = new Schema({
    username: {type: String, unique: true, required: "用户名不能为空"}
    , password: {type: String, required: "密码不能为空"}
    
    // 注册时间
    , created_at: {type: Date, default: Date.now, get: appUtils.date2int}

    // 用户状态: -1冻结 0删除 1正常
    , status: {type: Number, default: 1}
}, {
    toObject: {
        getters: true
    },
    toJSON: {
        getters: true
    }
})

/**
 * Methods
 */
UserSchema.methods = {

}

UserSchema.statics = {

}

mongoose.model('User', UserSchema)
