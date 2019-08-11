// 路由系统
let Route = require('./route');
let Layer = require('./layer');
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
Router.prototype.get = function(path,handler){
    // 创建一个层，把成放到stack中
    // 在创建一个route 里面专门存放handler
    // layer.route = route
    // 调用route方法 返回当前层对应的route的实例
    let route = this.route(path);
    route.get(handler); // 把这个handler 存放到当前的route的stack中
}
Router.prototype.handler = function(req,res,done){

}
module.exports = Router