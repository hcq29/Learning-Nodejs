var http = require('http');
var fs = require('fs');

var server = http.createServer();

server.on('request', function(req, res){
    var url = req.url;
    if (url === '/') {
        fs.readFile('index.html',function(error,data){
            if(error){
                res.setHeader('Content-Type','text/plain; charset=utf-8');
                res.end('读取文件错误');
            }else {
                res.setHeader('Content-Type','text/html; charset=utf-8');
                res.end(data.toString());
            }
        })
    } else if(url === '/css'){
        fs.readFile('style.css',function(error,data){
            if(error){
                res.setHeader('Content-Type','text/plain; charset=utf-8');
                res.end('读取文件错误');
            }else {
                res.setHeader('Content-Type','text/css; charset=utf-8');
                res.end(data.toString());
            }
        })
    }else if(url === '/study'){
        fs.readFile('study.jpg',function(error,data){
            if(error){
                res.setHeader('Content-Type','text/plain; charset=utf-8');
                res.end('读取图片错误');
            }else {
                res.setHeader('Content-Type','image/jpeg'); //图片无需编码
                res.end(data);
            }
        })
    }else {
        res.end('404 Not Found!');
    }
}).listen(3000,function(error){
    if (error) {
        console.log('访问服务器失败！');
    } else {
        console.log('访问服务器成功，可以打开 http://127.0.0.1:3000 进行访问');
    }
})

