
module.exports = function(app) {
    app.event.on('onexception', function(err) {
        app.logger.exception(err)
    })
}