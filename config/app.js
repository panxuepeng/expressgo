
module.exports = function(app) {
    var conf = {
        port: 8080
        , debug: false
        , domain: 'http://shetuan.cn'
        , secretKey: 'b43186d328fe0ae997e18694aeb2080'
        , 'view engine': 'ejs'
        
        // 注意: 尺寸小的在后面
        //       默认返回最后一个尺寸的图片
        , thumbList: [[970, 1024], [270, 480]]
        
        // 用户头像尺寸，正方形
        , avatarList: [500, 200, 100]
        
        // 活动分类
        , interest: {
            1: '足球', 2:' 篮球', 3: '排球', 4: '音乐'
            , 5: '文学', 6: '绘画', 7: '天文'
        }
        
        , pretty: false, // html源码是否漂亮格式显示
    }

    return conf
}