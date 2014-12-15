

module.exports = {
	wellcome: function(req, res, next) {
		
		req.app.event.emit('onwellcome', req)
		
		res.jsonp([200, 'wellcome'])
		
	}
}