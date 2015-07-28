/**
 * 验证示例 
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema


function dob (val) {
    if (!val) return val;
    return (val.getMonth() + 1) + "/" + val.getDate() + "/" + val.getFullYear();
}

function capitalize (val) {
    if ('string' != typeof val) val = '';
    return val.charAt(0).toUpperCase() + val.substring(1);
}

function validator(val) {
    return val == 'something';
}
var custom = [validator, 'Uh oh, {PATH} does not equal "something".']

    var UserSchema = new Schema({
    name: {
        type: String,
        default: '', // 默认值
        unique: true, // 唯一索引
        index: true,  // 普通索引
        // http://mongoosejs.com/docs/api.html#schematype_SchemaType-index
        
        required: true, // 不能为空
        required: '{PATH} is required!', // 自定义 error msg
        select: true, // 参考下面url
        // http://mongoosejs.com/docs/api.html#schematype_SchemaType-select
        
        sparse: true, // 参考下面url
        // http://mongoosejs.com/docs/api.html#schematype_SchemaType-sparse 
    },

    // get 数据在取出时会被修改
    born: { type: Date, get: dob },

    // set 数据在入库前会被修改
    title: { type: String, set: capitalize },

    // 一些简单规则

    // 日期类型可用规则 expires
    created_at: { type: Date, expires: 60*60*24 },
    // 参考下面url
    // http://mongoosejs.com/docs/api.html#schema_date_SchemaDate-expires

    // 数字类型可用规则 min max
    age: {
        type: Number,
        max: [100, 'The value of path `{PATH}` ({VALUE}) exceeds the limit ({MAX}).'], 
        min: 1
    },

    // 字符串类型可用规则 enum lowercase match trim uppercase
    // http://mongoosejs.com/docs/api.html#schema_string_SchemaString-enum

    admin: { type: String, match: /^a/ },



    // 自定义验证规则 validate
    something: { type: String, validate: custom }
})

UserSchema.path('title').validate(function (title) {
    return title.length > 0
}, 'Article title cannot be blank')

mongoose.model('ValidateDemo', UserSchema)
