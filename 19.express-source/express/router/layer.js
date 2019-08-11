function Layer(path,handler){
    this.path = path;
    this.handler = handler;
}
// 判断当前层有没有和请求的路径匹配到
Layer.prototype.match = function(pathname){
    // 如果路径相等就是匹配到了
    if(this.path === pathname){
        return true;
    }
    // 如果是中间件 路径是 / 匹配到了
    if(!this.route){ // 中间件
        if(this.path === '/'){
            return true;
        }
        return pathname.startsWith(this.path+'/');
    }
    return this.path === pathname;
}


module.exports = Layer