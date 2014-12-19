/**
 * npm install -g mocha
 * mocha
 * 
 */

module.exports = function(app, request, should, mongoose) {

	describe('\n\n GET / \n', function() {
		it('wellcome', function (done) {
			request(app)
			.get('/')
			.expect('Content-Type', /json/)
			.expect(200)
			.expect(/wellcome/)
			.end(done)
		})
	})
	
}