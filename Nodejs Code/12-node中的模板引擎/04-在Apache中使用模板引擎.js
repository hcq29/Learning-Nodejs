var http = require('http');
var fs = require('fs');
var template = require('art-template');

var server = http.createServer()
var wwwDir = 'E:/study/test/'; //这里填入默认路径
server.on('request', function (req, res) {
    fs.readFile('./template.html', function (err, data) {
        if (err) return console.log('文件不存在');

        fs.readdir(wwwDir, function (err, files) {
            if (err) {
                return console.log('目录不存在');
            }
            console.log(files);
            let filesObj = [];
            for (let i = 0; i < files.length; i++) {
                var stat = fs.lstatSync(wwwDir + files[i]);
                var is_direc = stat.isDirectory();
                var size = (stat.size / 1024).toFixed(2) + "KB";
                var dtime = formatDate(stat.mtimeMs);
                if (is_direc) {
                    filesObj[i] = {
                        type: 'dir',
                        name: files[i],
                        size: size,
                        mtime: dtime
                    }
                } else {
                    filesObj[i] = {
                        type: 'file',
                        name: files[i],
                        size: size,
                        mtime: dtime
                    }
                }
            }
            console.log(filesObj)
            var ret = template.render(data.toString(), {
                filesObj: filesObj
            })
            res.end(ret);
        })
    })
}).listen(3000, function (error) {
    if (error) return console.log('服务器开启失败');
    console.log('服务器开启成功，可以通过 http://127.0.0.1:3000 进行访问');
})

function formatDate(shijianchuo) {

    //时间戳是整数，否则要parseInt转换
    var time = new Date(shijianchuo); // 需要使用Date格式进行日期转化，若是时间戳、字符串时间，需要通过new Date(..)转化
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '/' + isZero(m) + '/' + isZero(d) + ' ' + isZero(h) + ':' + isZero(mm) + ':' + isZero(s);
}
function isZero(m) {
    return m < 10 ? '0' + m : m
}
