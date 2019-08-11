// 路由系统
let Route = require('./route');
let Layer = require('./layer');
let url = require('url');
function Router(){
    this.stack = [];
}
Router.prototype.route = function(path){
    let route  = new Route(); // 创建一个route
    // 创建一个Layer 路径 对应的dispatch方法
    let layer = new Layer(path,route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);
    return route;
}
Router.prototype.get = function(path,handlers){
    // 创建一个层，把成放到stack中
    // 在创建一个route 里面专门存放handler
    // layer.route = route
    // 调用route方法 返回当前层对应的route的实例
    let route = this.route(path);
    route.get(handlers); // 把这个handler 存放到当前的route的stack中
}
Router.prototype.handler = function(req,res,out){
    // 请求到来会执行此方法
    // 先取出用户请求的路径 
    let {pathname } = url.parse(req.url);
    let idx = 0;
    let next = () =>{
        if(idx>=this.stack.length) return out(); // 如果自己处理不了
        let layer = this.stack[idx++]; // 在栈中拿到第一层
        if(layer.match(pathname)){
            // 如果路径相同, 将下一个layer逻辑 就是next方法传递进去
            layer.handler(req,res,next);// 执行当前layer上的route的dispatch方法
        }else{
            next()
        }
    }
    next();
    

}
module.exports = Router