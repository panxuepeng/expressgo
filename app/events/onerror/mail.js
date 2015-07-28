
module.exports = function(app) {
    app.event.on('onerror', function(err) {
        /*
        app.mail({
            to: 'dushii@163.com'
            , subject: 'ERROR-' + err.name + ': '+ err.message
            , text: err.stack.substr(0, 200)
        })
        */
    })
}