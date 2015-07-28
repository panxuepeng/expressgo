var mongoose = require('mongoose')
var dateFormat = require('dateformat')

module.exports = function(app) {
    mongoose.appUtils = {
        date2str: function(date) {
            return date ? dateFormat(date, "yyyy-mm-dd HH:MM:ss"): date
        },
        date2int: function(date) {
            return date ? Math.round(date.getTime() / 1000): date
        }
        
    }
}