// 路由系统
let Route = require("./route");
let Layer = require("./layer");
let url = require("url");
const methods = require("methods");
function Router() {
  this.stack = [];
}
Router.prototype.route = function(path) {
  let route = new Route(); // 创建一个route
  // 创建一个Layer 路径 对应的dispatch方法
  let layer = new Layer(path, route.dispatch.bind(route));
  layer.route = route;
  this.stack.push(layer);
  return route;
};
Router.prototype.use = function(path, handler) {
  if (typeof handler == "undefined") {
    handler = path;
    path = "/";
  }
  let layer = new Layer(path, handler);
  layer.route = undefined; // 中间件没有route属性
  this.stack.push(layer);
};
methods.forEach(method => {
  Router.prototype[method] = function(path, handlers) {
    // 创建一个层，把成放到stack中
    // 在创建一个route 里面专门存放handler
    // layer.route = route
    // 调用route方法 返回当前层对应的route的实例
    let route = this.route(path);
    route[method](handlers); // 把这个handler 存放到当前的route的stack中
  };
});

Router.prototype.handler = function(req, res, out) {
  // 请求到来会执行此方法
  // 先取出用户请求的路径
  let { pathname } = url.parse(req.url);
  let idx = 0;
  // 如果自己处理不了
  // 我需要看一下当前是不是路由 如果是路由需要匹配方法
  let next = err => {
    if (idx >= this.stack.length) return out();
    let layer = this.stack[idx++]; // 在栈中拿到第一层

    // 无论是中间件 还是路由 都统一在最外层的路由系统中处理错误
    if (err) {
      // 如果有错误 就找中间件
      if (!layer.route) {
        // 如果找到了错误处理就让错误中间件执行即可
        if (layer.handler.length === 4) {
          layer.handler(err, req, res, next);
        }
      } else {
        // 是路由继续向下找
        next(err);
      }
    } else {
      if (layer.match(pathname)) {
        // 中间件和路由的区别就是看是否匹配到了方法
        if (!layer.route) {
          // 如果是中间件 如果是错误处理中间件 默认正常情况下是不执行的
          if (layer.handler.length === 4) return next();
          layer.handler(req, res, next);
        } else {
          // 路由
          if (layer.route.match(req.method)) {
            layer.handler(req, res, next);
          } else {
            next();
          }
        }
      }
    }

    // if (layer.match(pathname) && layer.route.match(req.method)) {
    //   // 如果路径相同, 将下一个layer逻辑 就是next方法传递进去
    //   layer.handler(req, res, next); // 执行当前layer上的route的dispatch方法
    // } else {
    //   next();
    // }
  };
  next();
};
module.exports = Router;
