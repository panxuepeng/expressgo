module.exports = function(app) {
    return {
        userAuthName: 'u', // 用于前台用户身份验证的cookie name
        adminAuthName: 'au', // 用于管理员身份验证的cookie name
        maxAge: 3600000 * 24 * 1, // 默认有效期1天
    }
}