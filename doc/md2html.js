
// 将文档由markdown格式批量转为html格式
// 需要安装全局工具: npm install -g github-markdown
// 需要安装工具: npm install shelljs
// 使用方法：node md2html

var shell = require("shelljs")

shell.cat(shell.ls('api_v1/*.md')).to('api.md')
shell.exec('ghmd --dest api_v1/api.html api.md')
shell.rm('api.md')

var script = '<script src="http://libs.baidu.com/jquery/1.11.3/jquery.js"></script>'
script += '\n<style>\n' + shell.cat('assets/toc.css') + '\n</style>'
script += '\n<script>\n' + shell.cat('assets/toc.js') + '\n</script>'

var html = shell.cat('api_v1/api.html')
html = html.replace('<body>',  + '<body>\n'+script)
html.to('api_v1/api.html')


/*
shell.ls('api_v1/*.md').forEach(function(file) {
    var text = []
    text.push(shell.cat(file))
    text.join('\n\n\n').to('api.md')
    
    var newname = file
    newname = newname.replace('api_v1/', 'api_v1/html2/')
    newname = newname.replace('.md', '.html')
    var cmd = 'ghmd --dest '+ newname +' '+ file
    console.log(cmd)
    shell.exec(cmd)
})
*/
