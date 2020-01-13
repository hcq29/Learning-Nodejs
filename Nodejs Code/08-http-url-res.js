var http = require('http');

var server = http.createServer();

server.on('request', function(req, res){
    var url = req.url;
    res.setHeader('Content-Type','text/html; charset=utf-8');
    if(url == '/'){
        res.end('index');
    }else if(url == '/clothes'){
        var clothes = [
            {
                name: '衬衫',
                price: 400
            },
            {
                name: '裤子',
                price: 300
            },
            {
                name: '帽子',
                price: 150
            }
        ]
        res.end(JSON.stringify(clothes));
    }else if(url == '/fruits'){
        var fruits = [
            {
                name: '苹果',
                price: 5
            },
            {
                name: '香蕉',
                price: 3
            },
            {
                name: '葡萄',
                price: 6
            }
        ]
        res.end(JSON.stringify(fruits));
    }else{
        res.end('404 Not Found!');
    }
}).listen(3000, function(error){ //链式写法
    if(error){
        console.log('服务器开启失败！');
    }else{
        console.log('服务器已开启，可以通过http://127.0.0.1:3000/ 进行访问');
    }
})