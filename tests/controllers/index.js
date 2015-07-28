/**
 * npm install -g mocha
 * mocha
 * 
 */

module.exports = function(app, request, should, mongoose) {
    var prefix = '/api/v1/'
    describe('\n\n '+ prefix +' \n', function() {
        it('wellcome', function (done) {
            request(app)
            .get(prefix+'')
            .set('Authorization', 'Bearer 123456789')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(/wellcome/)
            .end(done)
        })
    })
}