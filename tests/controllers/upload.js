/**
 * 上传相关
 * 
 */

module.exports = function(app, request, should, mongoose) {
    describe('\n\n 文件上传 \n', function() {
        
        it('上传图片', function (done) {
            request.post(done, {
                url: '/images',
                attach: ['image', app.dirs.upload + '/test.jpg'],
                cb: function(body) {
                    if (!('url' in body.result)) {
                        throw new Error(JSON.stringify(body))
                    }
                }
            })
        })
    })
}