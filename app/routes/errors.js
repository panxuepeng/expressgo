
module.exports = function(app) {

    // assume "not found" in the error msgs
    // is a 404. this is somewhat silly, but
    // valid, you can do whatever you like, set
    // properties, use instanceof etc.
    app.use(function(err, req, res, next) {
        // treat as 404
        if (~err.message.indexOf('not found')) {
            return next()
        }
        
        app.event.emit('onexception', err)
        
        // error page
        //res.status(500).render('500', { error: err.stack })
        res.status(500).send(err.message)
    })

    // assume 404 since no middleware responded
    app.use(function(req, res, next) {
        if (/^\/admin/i.test(req.path)) {
            res.redirect('/')
        }
        res.status(404).send('Not Found')
        //res.status(404).render('404', { url: req.originalUrl, error: 'Not found' })
    })

}