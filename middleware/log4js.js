
var log4js = require('log4js')

module.exports = function(app) {
	var exports = {}
	
	log4js.configure(app.conf.log4js)

	var accessLogger = log4js.getLogger('access')
	var exceptionLogger = log4js.getLogger('exception')
	var infoLogger = log4js.getLogger('info')
	var errorLogger = log4js.getLogger('error')
	var bizLogger = log4js.getLogger('biz')
	var debugLogger = log4js.getLogger('debug')

	// 运行时异常日志
	exports.exception = function(err) {
		exceptionLogger.error(err)
	}

	// 错误日志
	exports.error = function(err, caller) {
		if ( !err ) {
			return
			
		} else if ( typeof err === 'object' && err.errors ) {
		
			// model验证错误信息
			err = err.errors
		} else if ( typeof err === 'object' && err.message ) {
		
			// 不需要保持调用堆栈等信息
			err = err.message
		}
		
		if ( caller ) {
			err = [caller, err]
		}
		
		errorLogger.error(err)
	}

	// 普通消息日志
	exports.info = function(err, caller) {
		if ( caller ) {
			err = [caller, err]
		}
		infoLogger.info(err)
	}

	// 业务日志
	exports.biz = function(err, caller) {
		if ( caller ) {
			err = [caller, err]
		}
		bizLogger.info(err)
	}

	// 调试日志
	exports.debug = function(err, caller) {
		if ( caller ) {
			err = [caller, err]
		}
		debugLogger.debug(err)
	}


	process.on('exit', function() {
		exceptionLogger.fatal('服务异常关闭')
	})
	
	// 访问日志
	// 日志级别对应规则：
	// http responses 3xx, level = WARN
	// http responses 4xx & 5xx, level = ERROR
	// else, level = INFO
	app.use(log4js.connectLogger(accessLogger, {level: 'auto'}))
	
	return exports
}
