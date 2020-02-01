const express = require('express');
const app = express();
const port = 3000;
var fs = require('fs');
var template = require('art-template');

var comments = [];

app.use('/public/', express.static('./public/'));

app.get('/', (req, res) => {
    fs.readFile('./views/user.json', function (err, data) {
        if (err) return console.log('error');
        var data = JSON.parse(data);
        comments = data;
    })
    fs.readFile('./views/index.html', function (err, data) {
        if (err) return res.end('404 Not Found!');
        var result = template.render(data.toString(), {
            comments: comments
        })
        res.end(result);
    })
})

app.get('/post', (req, res) => {
   
    fs.readFile('./views/post.html', function (err, data) {
        if (err) return res.end('404 Not Found!');
        res.end(data);
    })
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
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
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