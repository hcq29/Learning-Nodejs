/**
 * router.js
 */
// Express 提供了一个方式专门包装路由
const express = require('express');
// 创建一个路由容器
const router = express.Router();
const fs = require('fs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/user', { useNewUrlParser: true });

const studentSchema = {
    name: String,
    gender: Number,
    age: Number,
    hobbies: String,
    id: Number
}
// {"students":[{"name":"张三","gender":0,"age":2,"hobbies":"fff","id":0}]}

const Student = mongoose.model('Student', studentSchema);


// 把路由都挂在到 router 路由容器中
router.get('/students', (req, res) => {
    Student.find(function (err, students) {
        if (err) return res.status(500).end('Server Error....');
        console.log(students);
        if (students.length == 0) {
            res.render('index.html', {
                students: [
                    {
                        id: '无', name: '无', gender: '无', age: '无', hobbies: '无'
                    }
                ],
                show: false
            });
        } else {
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
    // ...
    // 1.获取表单数据
    // 2、处理
    //        将数据保存到students.json 文件中
    // 3、发送相应
    //     先读取文件，转成对象
    //     然后网对象中插入数据
    //     讲对象转为字符串
    //     将字符串再次写入文件
    Student.find(function (err, students) {
        if (err) return res.status(500).end('Server Error....');
        var id = 1;
        if(students.length != 0){
            id = parseInt(students[students.length - 1].id) + 1;
        }
        var studentObj = {};
        studentObj = req.body;
        studentObj.id = id;
        studentObj.age = parseInt(studentObj.age);
        studentObj.gender = parseInt(studentObj.gender);

        const newStudent = new Student(studentObj);
        newStudent.save().then(() => {res.redirect('/students');});

    })
})
router.get('/students/edit', (req, res) => {
    // 1、在客户端的列表页中处理链接问题（需要有 id 参数）
    // 2、获取要编辑的学生 id
    // 3、渲染编辑页面
    Student.findOne({id: parseInt(req.query.id)}, (err, student) => {
        if (err) return res.status(500).end('Server error....');
        res.render('edit.html', {
            student: student
        })
    })
})
router.post('/students/edit', (req, res) => {
    // 1、获取表单数据
    // 2、更新
    // 3、发送相应
    var id = parseInt(req.body.id);
    var query = { id: id};
    console.log(query)
    var studentObj = {};
        studentObj = req.body;
        studentObj.id = id;
        studentObj.age = parseInt(studentObj.age);
        studentObj.gender = parseInt(studentObj.gender);
    Student.findOneAndUpdate(query, studentObj, function(error, date){
        if (error) return res.status(500).end('Server error....');
        res.redirect('/students');
    })
})
router.get('/students/delete', (req, res) => {
    Student.remove({id:parseInt(req.query.id)}, (err) => {
        if (err) return res.status(500).end('Server error....');
        res.redirect('/students');
    })
})
// 把router导出
module.exports = router;