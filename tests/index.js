/**
 * npm install -g mocha
 * mocha
 * 
 */
var mongoose = require('mongoose')
  , should = require('should')
  , request = require('supertest')
  , app = require('../app')
  , glob = require("glob")
  
console.log('\n\n ==============\n   start test\n ==============\n')

app.data = {
    userinfo: null
    , college: null
    , activity: null
    , chat: null
}
/*
describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            should(-1).eql([1, 2, 3].indexOf(5))
            should(-1).eql([1, 2, 3].indexOf(0))
            
            should(0).eql([1, 2, 3].indexOf(1))
        })
    })
})
*/

function test(name) {
    require(name)(app, request, should, mongoose)
}


var urlPrefix = '/api/v1'
var default_token = '3StrGCjqQMt3cZHzH4PhaQUD7WPWcR5u'

/**
 * option = {url:'', data: {}, cb: function(){}}
 */
request.post = function(done, option) {
    var token = default_token
    if (app.data.userinfo && typeof app.data.userinfo === 'object') {
        token = app.data.userinfo.access_token
    }
    var obj = request(app).post(urlPrefix + option.url)
    
    obj.set('Authorization', 'Bearer ' + token)
    option.attach && obj.attach(option.attach[0], option.attach[1])
    option.data && obj.send(option.data)
    
    obj.expect(200)
    .expect('Content-Type', /json/)
    .expect(function(res) {
        if (!('result' in res.body)) {
            throw new Error(JSON.stringify(res.body))
        } else {
            console.log(JSON.stringify(res.body).substr(0, 300))
            option.cb && option.cb(res.body)
        }
    })
    
    obj.end(done)
}

request.get = function(done, option) {
    var token = app.data.userinfo.access_token || default_token
    request(app)
    .get(urlPrefix + option.url)
    .set('Authorization', 'Bearer ' + token)
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(function(res) {
        if (!('result' in res.body)) {
            throw new Error(JSON.stringify(res.body))
        } else {
            console.log(JSON.stringify(res.body).substr(0, 300))
            option.cb && option.cb(res.body)
        }
    })
    .end(done)
}

var name = process.argv[3]

if (name) {
    name = name.substr(2)
    name = name.trim()
    console.log('测试单个控制器')
    test(app.root+'test/controllers/'+name)
} else {
    
    var controllers = [
        'users',
        'upload',
        'logout'
    ]
    
    console.log('测试控制器：'+ controllers.join())
    
    for(var i=0; i<controllers.length; i++) {
        test(app.root+'tests/controllers/'+ controllers[i])
    }
}
