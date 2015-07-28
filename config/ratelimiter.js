module.exports = function(app) {
    return {
        // 访问次数
        max: 60,
        
        // 持续时间，单位是毫秒
        duration: 60000,
        
        msg: '访问过于频繁，请稍后再试'
    }
}