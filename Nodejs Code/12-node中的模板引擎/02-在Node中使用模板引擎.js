// 加载相关模块，使用require('art-template')
var template = require('art-template');

// 定义要替换的字符串
var str = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>02-在Node中使用art-template</title>
    </head>
    <body>
        <p>hello {{ name }}</p>
    </body>
    </html>
`;

// 使用AIP，render
var result = template.render(str, {
    name: 'Jack'
});
console.log(result);