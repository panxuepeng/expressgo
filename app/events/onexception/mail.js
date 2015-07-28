
module.exports = function(app) {
    app.event.on('onexception', function(err) {
        /*
        app.mail({
            to: 'dushii@163.com'
            , subject: 'EXCEPTION-' + err.name + ': '+ err.message
            , text: err.stack.substr(0, 200)
        })
        */
    })
}