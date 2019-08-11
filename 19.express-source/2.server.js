const express = require('express');
const app = express(); 

app.get('/',function(req,res,next){ // 可以对某个请求做一系列操作
    console.log(1);
    next();
},function(req,res,next){
    console.log(2);
    next();
},
function(req,res,next){
    console.log(3);
    next();
});
app.get('/',function(req,res,next){
    console.log(4);
})
app.listen(3000);
