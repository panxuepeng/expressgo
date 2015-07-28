/**
 * 用户
 * 
 */

module.exports = function(app, request, should, mongoose) {
    
    describe('\n\n 用户 \n', function() {
        var userinfo = {}
        
        it('删除测试用户', function(done) {
            
            var User = mongoose.model('User')
            User.remove({username:"czsada"}, function (err) {
                if (err) new Error(JSON.stringify(err))
                done()
            })

        })
        
        it('用户注册', function(done) {
            request.post(done, {
                url: '/users/register',
                data: {
                    username:"_test",
                    password:"111111",
                    mobile: '15652320228'
                }
            })
        })

        it('用户登录', function(done) {
            request.post(done, {
                url: '/users/login',
                data: {
                    username:"_test",
                    password:"111111"
                },
                cb: function(body) {
                    userinfo = body.result
                    
                    // 将用户登录信息记录到 app 变量
                    app.data.userinfo = userinfo
                }
            })
        })
        
        it('用户信息', function(done) {
            request.get(done, {
                url: '/users/profile'
            })
        })
        
    })
}