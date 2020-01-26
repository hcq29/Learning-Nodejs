// 加载相关模块，使用require('art-template')
var template = require('art-template');
var fs = require('fs');

fs.readFile('./tpl.html', function (error, data) {
    if (error) return console.log('读取文件失败！');

    // 使用AIP，render
    var result = template.render(data.toString(), {
        name: 'Jack'
    });
    console.log(result);
})

