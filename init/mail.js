var nodemailer = require('nodemailer')
var _ = require('underscore')

module.exports = function(app) {
    
    return function(msg, cb) {
        
        var mailconf = app.conf.mail
        
        var transport = nodemailer.createTransport(mailconf.option)
        
        msg = _.extend({}, mailconf.message, msg)
        
        transport.sendMail(msg, function(error, info) {
            if (error) {
                return app.logger.error(error)
            }
            
            app.logger.info('Message sent: ' + info.response)
            
            if (typeof cb === 'function') {
                cb()
            }
        })
    }
    
}