const express = require('./express');
const app = express(); 
// 路由中的next 和 中间件的next 是什么关系
app.use('/',function(req,res,next){
   setTimeout(()=>{ 
    next(); // 只要在next中传递了错误  说明代码出错了
   },1000)
})
app.use('/a',function(req,res,next){
    console.log('middle 2')
    next('error');
})
app.get('/a/b',function(req,res,next){
    next();
})
app.use(function(err,req,res,next){
    res.end(err);
})
app.listen(3000);
