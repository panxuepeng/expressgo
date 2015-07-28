// node console
var shell = require("shelljs");

var app = require("./_header");

shell.echo("\n请输入要执行的自定义命令:");

process.stdin.resume();

process.stdin.on("data", function(name) {
    name = name.toString().trim();
    var cmdFile = app.root + "app/commands/" + name + ".js";
    var cmdObj = null;
    if (shell.test("-f", cmdFile)) {
        cmdObj = require(cmdFile)(app);
        if (cmdObj) {
            if (typeof cmdObj === "function") {
                cmdObj();
            } else if (typeof cmdObj === "object") {}
        }
    } else {
        console.log("error: " + cmdFile);
    }
});