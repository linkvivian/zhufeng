const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
Buffer.prototype.split = function(sep){
    let len = Buffer.from(sep).length
    let offset = 0;
    let current;
    let arr = [];
    while(-1!==(current = this.indexOf(sep,offset))){
        arr.push(this.slice(offset,current));
        offset = current + len;
    }
    arr.push(this.slice(offset));
    return arr;
}
http
  .createServer((req, res) => {
    let { pathname, query } = url.parse(req.url);
    console.log(pathname,req.method)
    if (pathname === "/upload" && req.method === "POST") {
        console.log(req.headers["content-type"])
      if (req.headers["content-type"].includes("multipart/form-data")) {

        let boundary = '--'+req.headers["content-type"].split('=')[1];
        // 上传文件
        const arr = [];
        req.on("data", function(chunk) {
          arr.push(chunk);
        });
        req.on("end",function(){
            const content = Buffer.concat(arr); // 二进制数据
            let lines = content.split(boundary).slice(1,-1);
            console.log(lines); // 【buffer,buffer2,buffer3】
        })
      }
      return;
    }

    // ------------
    let filePath = path.join(__dirname, pathname);
    fs.stat(filePath, function(err, statObj) {
      if (err) {
        res.statusCode = 404;
        res.end();
        return;
      }
      if (statObj.isFile()) {
        fs.createReadStream(filePath).pipe(res);
        return;
      } else {
        res.statusCode = 404;
        res.end();
        return;
      }
    });
  })
  .listen(3000);

// 表单是不存在跨域的问题
// 表单格式
// content-type:application/www-x-form-urlencoded
// content-type:application/json
// 文件上传的
// content-type:multipart/form-data (表单) formData
// 分片上传 断点续传
