//加载核心模块
var fs = require('fs');

fs.readFile('testFile.txt',function(error , data){
    if(error){
        console.log("读取文件失败！");
    }else{
        console.log(data.toString());
    }
});

