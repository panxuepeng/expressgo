
var os = require('os')

// 是否正在执行测试
function isMochaTest(argv) {
    return argv[1].indexOf('_mocha') > 0
}

// 检测运行环境
module.exports = function(app) {
    app.env = ''
    var hostname = os.hostname()
    
    if (isMochaTest(process.argv)) {
        app.env = 'test'
    }
    
    return app.env
}