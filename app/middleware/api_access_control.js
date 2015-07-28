
module.exports = {

    index: function(req, res, next) {

        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Credentials", "true")
        res.header("Access-Control-Allow-Headers", "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type")
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
        
        next()
    }

}