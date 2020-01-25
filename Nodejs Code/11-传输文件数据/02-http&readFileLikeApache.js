var http = require('http');
var fs = require('fs');

var server = http.createServer();
var wwwDir = '.'; //这里填入默认路径
server.on('request',function(req, res){
    var url = req.url;
    var filePath = './index.html';
    if(url !== '/'){
        filePath = url;
    }
    fs.readFile(wwwDir + filePath,function(error, data){
        if(error){
            return res.end('404 Not Found');
        }
        res.end(data);
    })


}).listen(3000, function(error){
    if(error){
        console.log('服务器开启失败！');
    }else{
        console.log('服务器已开启，可以通过http://127.0.0.1:3000/ 进行访问');
    }
})