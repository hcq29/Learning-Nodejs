var http = require('http');

var server = http.createServer();

server.on('request', function(req, res){
    var url = req.url;
    res.setHeader('Content-Type','text/html; charset=utf-8');
	//根据不同的请求路径，发送不同的响应内容    
    if(url == '/'){
       //上面的一次响应一次关闭比较麻烦，建议使用更加简便的方法，直接写入end方法中，表示发送完后就关闭
        res.end('index');
    }else if(url == '/login'){
        res.end('login');
    }else if(url == '/register'){
        res.end('register');
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