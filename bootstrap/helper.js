var glob = require("glob")
var shell = require("shelljs")
var deepExtend = require('deep-extend')

module.exports = function(app) {
    var helper = {}

    // 批量加载某子目录下的js文件
    helper.load = function(pattern) {
        //console.log(['loadDir pattern', pattern])
        
        glob.sync(pattern).forEach(function(file) {
            //console.log(['load', file])
            var obj = require(file)
            if (typeof obj === 'function') {
                obj(app)
            }
        })
    }

    // 加载全局设置，局部覆盖全局同名项
    helper.loadConf = function(name) {
        return require(app.root +'config/'+ name)(app)
    }
    
    helper.loadController = function(name) {
        return require(app.root + '/app/controllers/'+ name)
    }

    helper.loadMiddleware = function(router, path, name) {
        var obj = require(app.root + '/app/middleware/'+ name)
        router.all(path, obj.index)
    }

    return helper
}