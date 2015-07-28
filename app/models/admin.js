/**
 * User Collection
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema


var AdminSchema = new Schema({
    username: {type: String, unique: true, required: "用户名不能为空"}
    
    , password: {type: String, required: "密码不能为空"}
    
    , truename: {type: String}
    
    // 创建时间
    , created_at: {type: Date, default: Date.now}

    // 管理员状态: 0删除 1普通 2超级
    , status: {type: Number, default: 1}
})

/**
 * Methods
 */
AdminSchema.methods = {

}

AdminSchema.statics = {

}

mongoose.model('Admin', AdminSchema)
