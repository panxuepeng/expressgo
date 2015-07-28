
// 扩展 res 对象
// 增加 res.success res.error 两个方法

var express = require("express")
var _ = require('underscore')

module.exports = function(app) {
    var response = express.response
    
    response.success = function (result, format) {

        if (result && typeof result === 'object' && result.toJSON) {
            result = result.toJSON()
        }
        
        this.json({status: 1, result: result})
    }
    
    // 错误信息的几种调用方式
    // res.error('msg')
    // res.error(err)
    // res.error('msg', code)
    response.error = function (err, code) {
        var req = this.req
        var errcode = app.errcode
        code = code || errcode.NORMAL.code // 默认错误码
        var error = {code: code, msg: ''}
        var errType = typeof err
        
        if (errType === 'string') {
            error.msg = err
        } else if (errType === 'object') {
            
            if (err.name === 'errcode') {
                error.code = err.code
                error.msg = err.msg
            } else if (err.name === 'ValidationError') {
                // 整理 Model 验证产生的错误信息
                var msgs = []
                for (var key in err.errors) {
                    msgs.push(key +": "+ err.errors[key].message)
                }
                error.msg = msgs.join('; ')
            } else {
                // 其他错误
                error = err
                app.event.emit('onerror', error)
            }
        }
        
        
        // 返回方式：
        // api/ajax 使用json，其他情况使用错误页面
        if (/api/i.test(req.baseUrl) || req.xhr) {
            this.json({status: 0, error: error})
        } else {
            this.render('error', {error: error})
        }
    }
    
}