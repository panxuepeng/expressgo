/**
 * 用户
 * 
 */

module.exports = function(app, request, should, mongoose) {
    
    describe('\n\n 用户 \n', function() {
        
        it('用户退出', function(done) {
            request.get(done, {
                url: '/users/logout',
                access_token: app.data.userinfo.access_token
            })
        })

    })
}