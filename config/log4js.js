
module.exports = function(app) {

    var logsDir = app.dirs.logs

    return {
        appenders: [
            { type: 'console' },
            {
                // 访问日志
                category: 'access',
                type: 'dateFile',
                filename: logsDir + '/access/access.log',
                pattern: '_yyyy-MM-dd',
                maxLogSize: 1024000,
                backups:3
            },
            {
                // 运行时异常日志
                category: 'exception',
                type: 'dateFile',
                filename: logsDir + '/exception/exception.log',
                pattern: '_yyyy-MM-dd',
                maxLogSize: 1024000,
                backups:3
            },
            {
                // 一般信息
                category: 'info',
                type: 'dateFile',
                filename: logsDir + '/info/info.log',
                pattern: '_yyyy-MM-dd',
                maxLogSize: 1024000,
                backups:3
            },
            {
                // 错误日志
                category: 'error',
                type: 'dateFile',
                filename: logsDir + '/error/error.log',
                pattern: '_yyyy-MM-dd',
                maxLogSize: 1024000,
                backups:3
            },
            {
                // 业务日志
                category: 'biz',
                type: 'dateFile',
                filename: logsDir + '/biz/biz.log',
                pattern: '_yyyy-MM-dd',
                maxLogSize: 1024000,
                backups:3
            },
            {
                // 调试日志
                category: 'debug',
                type: 'file',
                filename: logsDir + '/debug/debug.log',
                maxLogSize: 1024000,
                backups:3
                 
            }
        ],
        
        levels: {
            access: 'ALL',
            exception: 'ALL',
            info: 'ALL',
            error: 'ALL',
            biz: 'ALL',
            debug: 'ALL',
            perf: 'ALL'
        },
        
        replaceConsole: true
    }
}
