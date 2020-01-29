var http = require('http');
var fs = require('fs');
var url = require('url');
var template = require('art-template');

var comments = [];

http.createServer(function (req, res) {
    var parseObj = url.parse(req.url, true);
    var pathName = parseObj.pathname;
    if (pathName === '/') {
        fs.readFile('./views/user.json', function (err, data) {
            if (err) return console.log('error');
            var data = JSON.parse(data);
            comments = data;
        })
        fs.readFile('./views/index.html', function (err, data) {
            if (err) return res.end('404 Not Found!');
            var result = template.render(data.toString(), {
                comments: comments
            })
            res.end(result);
        })
    } else if (pathName.indexOf('/public/') === 0) {
        // 当访问到public目录下的资源时，就可以统一处理那些需要加载的资源了。通过`url.indexOf('/public/') === 0`进行判断，所请求的方式是：

        //  /public/css/main.css
        //  /publis/js/main.css
        //  /publis/imgs/logo.png
        //  /public/lib/jquery.js
        // 使用readFile时必须加上  .  
        fs.readFile('.' + pathName, function (err, data) {
            if (err) return res.end('404 Not Found!');
            res.end(data);
        });
    } else if (pathName === '/post') {
        fs.readFile('./views/post.html', function (err, data) {
            if (err) return res.end('404 Not Found!');
            res.end(data);
        })
    } else if (pathName === '/commit') {
        var comment = parseObj.query;
        comment.dateTime = formatDate(new Date());
        comments.push(comment);
        var commentStr = JSON.stringify(comments);
        fs.writeFile('./views/user.json', commentStr, function (err) {
            if (err) return console.log('error!');
            console.log('记录成功！');
        })
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    } else {
        fs.readFile('./views/404.html', function (err, data) {
            if (err) return res.end('404 Not Found!');
            res.end(data);
        })
    }
}).listen(3000, function (error) {
    if (error) return console.log('error!');
    console.log('running....');
})

function formatDate(date) {

    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mm = date.getMinutes();
    var s = date.getSeconds();
    return y + '/' + isZero(m) + '/' + isZero(d) + ' ' + isZero(h) + ':' + isZero(mm) + ':' + isZero(s);
}
function isZero(m) {
    return m < 10 ? '0' + m : m
}