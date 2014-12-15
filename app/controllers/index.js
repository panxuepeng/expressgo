

module.exports = {
	wellcome: function(req, res, next) {
		res.jsonp([200, 'wellcome'])
	}
}