
var redis = require("redis")

module.exports = function(app) {

    var conf = app.conf.redis

    var client = redis.createClient(conf.port, conf.host, {detect_buffers: true})

    client.on("connect", function () {
        console.log('redis success on '+ conf.host +':'+ conf.port)
    })

    client.on("error", function (err) {
        console.error('redis error on '+ conf.host +':'+ conf.port)
    })

    app.redis = client

    return client
}

/*
    // 将 ["id3", "258", "id2", "172", "id1", "86", "id4", "5"]
    // 转为： 
    //  {
    //	  keys: ['id3', 'id2', 'id1', 'id4'],
    //	  values: {"id3":"258", "id2": "172", "id1": "86", "id4": "5"}
    //  }
    function convertRedisResult(result) {
        var keys = [], values = {}, key, value
        var len = result.length/2

        for (var i = 0; i < len; i++) {
            key = result.shift()
            value = result.shift()
            
            values[key] = value
            keys.push(key)
        }
        
        return {keys:keys, values:values }
    }
*/