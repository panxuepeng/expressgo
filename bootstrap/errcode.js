module.exports = function(app) {
    var codes = {
        SYSTEM_ERROR: {code:1000, msg:'系统错误'}
        , API_NOT_FOUND: {code:1001, msg:'API不存在'}
        , RATE_LIMIT_EXCEED: {code:1098, msg:'超过调用频率'}
        , REQUEST_BANNED: {code:1099, msg:'请求被禁止'}
    
        // 业务级
        , NORMAL: {code:2000, msg:'业务级普通错误'}
        , BAD_PARAMS: {code:2001, msg:'参数有误'}
        , MISSING_PARAMS: {code:2002, msg:'缺少必须参数'}
        , OBJECT_ALREADY_EXISTS: {code:2003, msg:'对象已存在'}
        , OBJECT_NOT_EXISTS: {code:2004, msg:'对象不存在'}
        , USERNAME_EXISTS: {code:2005, msg:'用户名已存在'}
        , TELEPHONE_EXISTS: {code:2006, msg:'手机号已存在'}
        , ORIGINE_PASSWORD_WRONG: {code:2007, msg:'原始密码输入错误'}
        , SMS_ERROR: {code:2008, msg:'短信发送失败'}
        , SMS_ERROR: {code:2009, msg:'短信验证码错误'}
        
    
        , AUTH_TOKEN_REQUIRED: {code:2101, msg:'需要登录'}
        , AUTH_INVALID_CREDENTIALS: {code:2102, msg:'登录凭据有误'}
        , AUTH_INVALID_TOKEN: {code:2103, msg:'缺少TOKEN信息'}
        , AUTH_TOKEN_EXPIRED: {code:2104, msg:'TOKEN已过期'}
        , AUTH_USER_NOT_EXISTS: {code:2105, msg:'TOKEN对应的用户不存在'}
    }
    
    for (var key in codes) {
        codes[key].name = 'errcode'
    }
    
    return codes
}