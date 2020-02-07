/**
 * app.js
 */
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const router = require('./router');

app.engine('html', require('express-art-template'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/public/', express.static('./public/'));
app.use('/node_modules/', express.static('./node_modules/'));
// 把路由容器挂载到 app 服务中
app.use(router);

app.listen(port, (error)=>{
    if(error) return console.log('服务器开启失败！');
    console.log('running in....' + port);
})