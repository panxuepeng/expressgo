
module.exports = function(app) {
    return {
        transport: "SMTP" // SMTP¡¢SENDMAIL
        , option: {
            host: "smtp.163.com"
            , port: "25"
            , auth: {
                user: "******@163.com"
                , pass: "******"
            }
        }
        , message: {
            from: "******@163.com"
            , to: '' // a, b, c
            , subject: ''
            , text: ''
            , html: ''
            
            , headers: {'X-Laziness-level': 1000}
            , attachments: []
        }
    }
}