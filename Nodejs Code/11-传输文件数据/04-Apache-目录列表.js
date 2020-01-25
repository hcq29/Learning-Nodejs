var http = require('http');
var fs = require('fs');

var server = http.createServer()
var wwwDir = 'E:/study/test/'; //这里填入默认路径
server.on('request', function(req, res){
    fs.readFile('./template.html',function(err, data){
        if(err) return console.log('文件不存在');

        fs.readdir(wwwDir, function(err , file){
            if(err){
                return console.log('目录不存在');
            }
            console.log(file);
            var content = '';
            file.forEach(item => {
                content += `
                    <tr>
                        <td data-value="index.html"><a class="icon file" draggable="true">${item}</a></td>
                        <td class="detailsColumn" data-value="280">280 B</td>
                        <td class="detailsColumn" data-value="1578843824">2020/1/12 下午11:43:44</td>
                    </tr>
                `
            });
            data = data.toString();
            data = data.replace('^_^',content)
            res.end(data);
        })
    })
}).listen(3000, function(error){
    if(error) return console.log('服务器开启失败');
    console.log('服务器开启成功，可以通过 http://127.0.0.1:3000 进行访问');
})