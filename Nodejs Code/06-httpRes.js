var http = require('http');
var server = http.createServer();
// request 请求事件处理函数，需要接受两个参数
    // Request 请求对象
        // 请求对象可以用来获取客户端的一些请求信息，例如请求路径
    // Response 相应对象
        // 相应对象可以用来给客户端发送相应消息
server.on('request', function(request, response){
    console.log('收到客户端的请求，客户端请求的路径是： ' + request.url);
    console.log("客户端的端口号： "+ request.socket.remotePort);
    console.log("客户端的远程地址： "+ request.socket.remoteAddress);

    // response 对象的一个方法：write 可以用来给客户端发送相应数据
    // write可以用多次，但是最后一定要使用 end 来表示结束响应，否则客户端会处于一直等待的状态。
    // 内容类型: text/plain  
    response.setHeader('Content-Type','text/html; charset=utf-8'); 
    response.write('客户端，你好！');
    response.write('我是Node服务器');


    // 告诉客户端，服务器的话说完了，客户端可以执行给用户了
    response.end();

    // 因为我们的服务器的处理能力是很弱的，无论是什么路径的请求，返回的救过都是一样的
    // 思考：
    // 怎样让我们的服务器处理不同的请求相应不同的结果呢？
    // 比如说：输入/（浏览器默认从/开始访问），这时候返回一个index
    // /login  返回登录
    // /register 返回注册
})

server.listen(3000, function(error){
    if(error){
        console.log('服务器开启失败！');
    }else{
        console.log('服务器已开启，可以通过http://127.0.0.1:3000/ 进行访问');
    }
})

