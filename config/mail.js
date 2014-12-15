
module.exports = function(app) {
	return {
		transport: "SMTP", // SMTP¡¢SENDMAIL
		transportOptions: {
			// just for SMTP (more details in path_to_nodemailer/lib/engines/smtp.js)
			host: "smtp.163.com",
			port: "25",
			auth: {
				user: "your email",
				pass: "password"
			}
		},
		message: {
			to: '',	// Comma separated list of recipients
			subject: '', 
			html: '',	// HTML body
			
			text: '',	// plaintext body
			from: "apphudong@163.com",	// sender info
			headers: {'X-Laziness-level': 1000},
			attachments: []	// An array of attachments
		}
	}
}