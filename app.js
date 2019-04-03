//引入express文件
var express = require("express");

//引入 path 模块,用来解析url
var path = require("path");

//引入 bodyparser 中间件,用来解析 post 请求的数据
var bodyparser = require("body-parser");

//引入 multer 中间件,用来上传文件
var multer = require("multer");
//配置 multer,上传文件的目录
var upload = multer({
    dest: "upload"
});


//创建实例
var app = express();

//默认主页路由,返回字符串
app.get('/', function (req, res) {
    res.send("hello");
});

//index主页路由, get方式返回一个页面
app.get('/index', function (req, res) {
    res.sendFile(path.resolve('./views/index.html'));
});

//点击登录按钮,跳转到用户登录界面
app.get('/login', function (req, res) {
    res.sendFile(path.resolve('./views/login.html'));
});

//点击提交按钮,获取用户名和密码进行验证(假设用户名:admin,密码:123)
//get方法

// app.get(('/usrlogin'), function (req, res) {
//     if (req.query.usrname == "admin"&&req.query.passwd=="123") {
//         res.sendFile(path.resolve('./views/usrlogin.html'));
//     }else{
//         res.send("用户名或密码错误");
//     }
// });

//post方法,使用中间件body-parser
app.use(bodyparser.urlencoded({
    extended: false
}));
app.post('/usrlogin', function (req, res) {
    if (req.body.usrname === "admin" && req.body.passwd === "123") {
        res.send("登陆成功");
    } else {
        res.send("登录失败");
    }
});
//注意三点:
//1-安装和引入中间件 body-parser : var bodyparser= require("body-parser");
//2-在实例 app上挂载中间件 : app.use(bodyparser.urlencoded({extended: false}));
//3-使用req.body解析 post 数据 : req.body.usrname

//上传文件
//先配置上传入口路由
app.get('/upload', function (req, res) {
    res.sendFile(path.resolve("./views/upload.html"));
});
//配置上传目录
app.post('/uploadfile', upload.single('f1'),function (req, res) {
    res.send(req.file.originalname+"上传成功")
})




//监听3000端口
app.listen(3000, function () {
    console.log("监听3000端口");
})