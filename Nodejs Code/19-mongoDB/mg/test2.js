const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/user', {useNewUrlParser: true});

const userSchema = {
    name: String,
    age: Number,
    hobbise: String
}
const User = mongoose.model('User', userSchema);

const user1 = new User({
    name: 'Jack',
    age: 20,
    hobbise: '打球'
})
const user2 = new User({
    name: 'Mary',
    age: 21,
    hobbise: '唱歌'
})
const user3 = new User({
    name: 'Mike',
    age: 20,
    hobbise: '打球'
})
// 增加数据
// user1.save().then(() => console.log('插入成功'));
// user2.save().then(() => console.log('插入成功'));
// user3.save().then(() => console.log('插入成功'));

// 查找数据
User.find(function(err, res){
    if(err) return console.log('err');
    return console.log(res);
})

// 按条件查找，一个或者多个
// User.find({
//     name: 'Mike'
// },function(err, res){
//     if(err) return console.log('err');
//     return console.log(res);
// })

// 按条件查找，一个
// User.findOne({
//     name: 'Mike'
// },function(err, res){
//     if(err) return console.log('err');
//     return console.log(res);
// })

// 删除
// User.remove({
//     name: 'Jack'
// },function(err, res){
//     if(err) return console.log('error');
//     return console.log(res);
// })

// 更新
// 需要修改的条件
// var query = { name: 'Mary' };
// User.findOneAndUpdate(query, { age: 20 }, function(err, res){
//     if(err) return console.log('error');
//     return console.log(res);
// })

