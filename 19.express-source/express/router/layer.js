function Layer(path,handler){
    this.path = path;
    this.handler = handler;
}
// 判断当前层有没有和请求的路径匹配到
Layer.prototype.match = function(pathname){
    return this.path === pathname;
}


module.exports = Layer