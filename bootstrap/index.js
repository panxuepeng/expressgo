
module.exports = function(app) {

    var Event = require('./event')(app)

    global.Event = Event


    require('./istest')(app)
    require('./dirs')(app)
    require('./mongoose')(app)
    app.errcode = require('./errcode')(app)

    var helper = require('./helper')(app)
    app.helper = helper
    
    global.Helper = helper
}
