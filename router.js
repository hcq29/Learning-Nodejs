/**
 * router.js
 */
// Express 提供了一个方式专门包装路由
const express = require('express');
// 创建一个路由容器
const router = express.Router();
const fs = require('fs');
const Student = require('./students');

// 把路由都挂在到 router 路由容器中
router.get('/students', (req, res) => {
    Student.find((err, students) => {
        if (err) return res.status(500).end('Server Error....');
        if (!students) {
            res.render('index.html', {
                students: [
                    {
                        id: '无', name: '无', gender: '无', age: '无', hobbies: '无'
                    }
                ],
                show: false
            });
        }else{
            res.render('index.html', {
                students: students,
                show: true
            });
        }
    })
})
router.get('/students/new', (req, res) => {
    res.render('new.html');
})
router.post('/students/new', (req, res) => {
    console.log(req.body)
    // ...
    // 1.获取表单数据
    // 2、处理
    //        将数据保存到students.json 文件中
    // 3、发送相应
    //     先读取文件，转成对象
    //     然后网对象中插入数据
    //     讲对象转为字符串
    //     将字符串再次写入文件
    Student.save(req.body, (err) => {
        if (err) return res.status(500).end('Server Error....');
        res.redirect('/students');
    })

})
router.get('/students/edit', (req, res) => {
    // 1、在客户端的列表页中处理链接问题（需要有 id 参数）
    // 2、获取要编辑的学生 id
    // 3、渲染编辑页面
    Student.findById(parseInt(req.query.id), (err, student)=>{
        if(err) return res.status(500).end('Server error....');
        res.render('edit.html',{
            student: student
        })
    })
})
router.post('/students/edit', (req, res) => {
    // 1、获取表单数据
    // 2、更新
    // 3、发送相应
    Student.update(req.body, (error)=>{
        if(error) return res.status(500).end('Server error....');
        res.redirect('/students');
    })
})
router.get('/students/delete', (req, res) => {
    Student.delete(parseInt(req.query.id), (err)=>{
        if(err) return res.status(500).end('Server error....');
        res.redirect('/students');
    })
})
// 把router导出
module.exports = router;