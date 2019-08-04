const http = require('http');
const context = require('./context'); // 上下对象
const request = require('./request'); // reques对象
const response = require('./response'); // response对象
module.exports = class {
    constructor(){
        // 生产了一个对象，操作context对象不会导致源文件的变化
        this.context = Object.create(context);
        this.request = Object.create(request);
        this.response = Object.create(response);
    }
    use(fn){
        this.fn = fn;
    }
    // 创建上下文
    createContext(req,res){
        let ctx = this.context;
        ctx.request = this.request; // 将封装的request文件放到ctx对象上
        ctx.response = this.response;
        ctx.request.req = ctx.req = req;
        ctx.response.res = ctx.res = res;
        // 希望request上也拥有 url属性
        // 创建好的上下文返回去即可
        return ctx;
    }
    handleRequest(req,res){ // 处理请求的方法
        let ctx = this.createContext(req,res);
        this.fn(ctx); // 在内部会给ctx属性设置值
        if(ctx.body){
            res.end(ctx.body);
        }
    }
    listen(){
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(...arguments)
    }
}