function add(x, y){
    return x + y;
}
module.exports = add;












// exports.add = add;
// exports是一个对象
// 我们可以通过多次为这个对象添加成员实现对外导出多个内部成员

// 如果希望我们在外部直接拿到的不是一个对象，可以是
// 方法
// 字符串
// 数字
// 数组

// 这时候使用以下方法实现