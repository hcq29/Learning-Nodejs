// 1. 加载http核心模块
var http = require('http');

// 2. 使用http.createServer() 方法创建一个Web服务器
//    - 返回一个Server实例
var server = http.createServer()

// 3. 理解服务器是干什么的？
//    - 提供服务，是对数据的服务
//    - 发请求
//    - 接收请求
//    - 处理请求
//    - 发送相应
//    - 注册request请求事件
//    - 当客户端请求过来，就会自动触发服务器的request请求事件，然后执行第二个参数，也就是回调函数
server.on('request', function(){
    console.log('收到客户端的请求了');
});


// 4. 绑定端口号，启动服务器
// 涉及到网络通信的就一定需要端口号
server.listen(3000, function(error){
    if(error){
        console.log('服务器开启失败！');
    }else{
        console.log('服务器已开启，可以通过http://127.0.0.1:3000/ 进行访问');
    }
})



