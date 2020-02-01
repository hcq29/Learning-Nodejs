const express = require('express');
const app = express();
const port = 3000;
var fs = require('fs');
app.engine('html', require('express-art-template'));

app.use('/public/', express.static('./public/'));

var comments = [];
app.get('/', (req, res) => {
    fs.readFile('./views/user.json', function (err, data) {
        if (err) return console.log('error');
        var data = JSON.parse(data);
        comments = data;
    })
    res.render('index.html', {
        comments: comments
    });
})

app.get('/post', (req, res) => {
    res.render('post.html');
})

app.get('/commit', (req, res) => {
    var comment = req.query;
    comment.dateTime = formatDate(new Date());
    comments.push(comment);
    var commentStr = JSON.stringify(comments);
    fs.writeFile('./views/user.json', commentStr, function (err) {
        if (err) return console.log('error!');
        console.log('记录成功！');
    })
    res.redirect('/');  // 替换简单
})

app.listen(port, function (error) {
    if (error) return console.log('error!');
    console.log('running....');
})

function formatDate(date) {

    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mm = date.getMinutes();
    var s = date.getSeconds();
    return y + '/' + isZero(m) + '/' + isZero(d) + ' ' + isZero(h) + ':' + isZero(mm) + ':' + isZero(s);
}
function isZero(m) {
    return m < 10 ? '0' + m : m
}