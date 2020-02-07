/**
 * students.js
 * 数据操作文件模块
 * 任务：操作文件中的数据，只处理数据，不管性业务
 * 
 */
const fs = require('fs');
const dbPath = './mock/db.json';
/**
 * 获取所有学生的列表
 */
exports.find = function (callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return callback(err);
        var students = data === '' ? '' : JSON.parse(data).students;
        console.log(students);
        callback(null, students);
    })
}

/**
 * 查询对应学生 id 的所有信息
 */
exports.findById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return callback(err);
        var students = data === '' ? '' : JSON.parse(data).students;
        var ret = students.find((item) => {
            return item.id == id;
        })
        callback(null, ret);
    })
}


/**
 * 添加保存学生
 */
exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return callback(err);
        var students = [];
        if (data !== '') {
            var students = JSON.parse(data).students;
            // 处理id为唯一值
            student.id = parseInt(students[students.length - 1].id + 1);
            student.age = parseInt(student.age);
            student.gender = parseInt(student.gender);
        } else {
            student.id = 0;
        }
        // 将用户传递的对象保存到数组中
        students.push(student);

        // 把对象数据转化成字符串
        var ret = JSON.stringify({
            students: students
        })
        // 把字符串重新写入文件
        fs.writeFile(dbPath, ret, (err) => {
            if (err) return callback(err);
            callback(null);
        })
    })
}


/**
 * 更新学生
 */
exports.update = function (student, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return callback(err);
        student.id = parseInt(student.id);
        var students = data === '' ? [] : JSON.parse(data).students;
        var stu = students.find((item) => {
            return item.id === student.id;
        })
        for (let key in stu) {
            stu[key] = student[key];
        }

        var ret = JSON.stringify({
            students: students
        })
        // 把字符串重新写入文件
        fs.writeFile(dbPath, ret, (err) => {
            if (err) return callback(err);
            callback(null);
        })
    })
}



/**
 * 删除学生
 */
exports.delete = function (id, callback) {
    // 1、获取要删除学生的 id
    // 2、根据 id 执行删除操作
    // 3、根据操作结果进行发送相应结果
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return callback(err);
        var students = data === '' ? [] : JSON.parse(data).students;
        var deleteId = students.findIndex(function (item) {
            return item.id === id;
        })
        students.splice(deleteId, 1);
        console.log('啦啦啦')
        console.log(students)
        var ret = '';
        if (students.length != 0) {
            // 把对象数据转化成字符串
            ret = JSON.stringify({
                students: students
            })
        }

        console.log(ret)
        // 把字符串重新写入文件
        fs.writeFile(dbPath, ret, (err) => {
            console.log('哈哈哈哈哈哈哈' + ret);
            if (err) return callback(err);
            callback(null);
        })
    })
}
