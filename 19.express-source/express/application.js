const http = require('http');
const url = require('url');
const Router = require('./router')
function Application(){ // 提供一个创建应用的类
    // 路由和应用的分离 
    // this.routes = [
    //     {path:'*',method:'*',handler(req,res){
    //         res.end(`Cannot ${req.method} ${req.url}`)
    //     }}
    // ];
    this.router = new Router();
}
Application.prototype.get = function(path,...handler){
    // 自己不再处理放置路由的逻辑 交给路由自己去管理
    this.router.get(path,handler)
    // this.router.push({
    //     path,
    //     method:'get',
    //     handler
    // });
}
Application.prototype.listen = function(){
    http.createServer((req,res)=>{
        // 需要将req，res交给路由来处理 
        function done(){
            res.end(`Cannot ${req.method} ${req.url}`);
        }
        this.router.handler(req,res,done);


        // let {pathname} = url.parse(req.url);
        // let method = req.method.toLowerCase();
        // for(let i = 1;i<this.routes.length;i++){
        //     let {path,method:m,handler} = this.routes[i];
        //     if(pathname === path && method === m){
        //        return handler(req,res); // 调用匹配到的handler 传入req和res
        //     }
        // }
        // this.routes[0].handler(req,res);
    }).listen(...arguments)
}
module.exports = Application
