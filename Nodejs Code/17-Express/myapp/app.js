const express = require('express');
// 创建服务应用程序
// 也就是原来的 http.createServer
const app = express();
const port = 3000;

// 公开指定目录
app.use('/public/', express.static('./public/'));

app.get('/', (req, res) => res.send('Hello World!'));


app.listen(port, () => console.log(`Example app listening on port ${port}!`));