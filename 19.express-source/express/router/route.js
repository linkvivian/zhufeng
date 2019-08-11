const Layer = require("./layer");
function Route() {
  this.stack = [];
}
Route.prototype.get = function(handlers) {
  handlers.forEach(handler => {
    let layer = new Layer("/", handler); // 方便扩展
    layer.method = "get";
    this.stack.push(layer);
  });
};
Route.prototype.dispatch = function(req, res, out) {
  let idx = 0;
  let next = () => {
    if (idx >= this.stack.length) return out(); // 内部执行后 会从内部出去到外层
    let layer = this.stack[idx++];
    if (layer.method === req.method.toLowerCase()) {
      layer.handler(req,res,next); // 执行对应方法
    } else {
      next();
    }
  };
  next();
};
module.exports = Route;
