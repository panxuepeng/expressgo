
module.exports = function(app) {
    app.event.on('onwellcome', function(req) {
        console.log('onwellcome')
    })
}