// 上传

var gm = require('gm')
    , fs = require('fs')
    , ncp = require('ncp').ncp
    , async = require('async')
    , dateFormat = require('dateformat')
    , shell = require('shelljs')
    , mongoose = require('mongoose')
    , _ = require('underscore')
    
module.exports = {
    init: function(req, res, next) {
        var logger = req.app.logger
        
        if (_.isEmpty(req.files)) {
            return res.error('未检测到上传文件')
        }
        
        // 获取第一个图片文件
        var image
        for (var k in req.files) {
            var item = req.files[k]
            if (/^image/i.test(item.type)) {
                req.files.image = image = item
                break
            }
        }
        
        req.app.logger.debug(req.files)
        
        if (!image) {
            return res.error('未检测到上传的图片文件')
        }
        
        // 判断图片大小
        
        
        fs.readFile(image.path, function (err, data) {
            if (err) res.error(err)
            image.hash = req.app.util.md5(data)
            image.tmpPath = image.path
            image.savePath = req.app.dirs.upload +'/'+ dateFormat("yyyymm/dd")
            
            logger.debug(image.savePath, 'upload.image savePath')
            next()
        })
        
    },
    
    // 检查图片是否存在
    check: function(req, res, next) {
        next()
    },
    
    // 保持原始图片
    save: function(req, res, next) {
        var logger = req.app.logger
        var image = req.files.image
        var tmpPath = image.tmpPath
        var savePath = image.savePath
        var newname = savePath +'/'+ image.hash + '.jpg'
        image.newname = newname
        
        // 创建目录
        if (!shell.test('-d', savePath)) {
            shell.mkdir('-p', [
                savePath,
                savePath.replace('storage', 'public')
            ])
        }
        
        // 保存原始图片
        ncp(tmpPath, newname, function(err) {
            if (err) {
                logger.error(err)
                res.error('图片保存失败')
            }
            
            // 保存数据库
            var data = {
                size: image.size
                , hash: image.hash
            }
            if (req.user) {
                data.user = req.user._id
            }
            next()
        })
    },
    
    // 创建缩略图
    thumb: function(req, res) {
        var logger = req.app.logger
        var conf = req.app.conf
        var newname = req.files.image.newname
        
        // 创建缩略图
        var thumbPath
        async.eachLimit(
            conf.thumbList, 2,
            function(item, cb) {
                thumbPath = newname
                thumbPath = thumbPath.replace('storage', 'public')
                thumbPath = thumbPath.replace('.jpg', '_'+item[0]+'.jpg')
                
                logger.debug(thumbPath, 'upload.thumb thumbPath')
                
                gm(newname)
                .noProfile()
                .resize(item[0], item[1])
                .write(thumbPath, function (err2) {
                    cb(err2)
                })
            },
            function(err3) {
                if (err3) {
                    logger.error(err3, 'upload.thumb 创建缩略图')
                    res.error('创建缩略图失败')
                } else {
                    var url = conf.domain + thumbPath.split('public')[1]
                    logger.debug(url, 'upload.thumb url')
                    res.success({url: url})
                }
            }
        )
    },
    
    // 用户头像、社团logo等
    avatar: function(req, res) {
        var logger = req.app.logger
        var conf = req.app.conf
        var newname = req.files.image.newname
        
        // 创建缩略图
        var thumbPath
        async.eachLimit(
            conf.avatarList, 2,
            function(item, cb) {
                thumbPath = newname
                thumbPath = thumbPath.replace('storage', 'public')
                thumbPath = thumbPath.replace('.jpg', '_'+item+'.jpg')
                
                logger.debug(thumbPath, 'upload.thumb thumbPath')
                
                gm(newname)
                .noProfile()
                .thumb(item, item, thumbPath, 80, 'center', cb)
            },
            function(err3) {
                if (err3) {
                    logger.error(err3, 'upload.thumb 创建缩略图')
                    res.error('创建缩略图失败')
                } else {
                    var url = conf.domain + thumbPath.split('public')[1]
                    logger.debug(url, 'upload.thumb url')
                    res.success({url: url})
                }
            }
        )
    }
}