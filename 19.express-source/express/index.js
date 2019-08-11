
const Application = require('./application');
const Router = require('./router');
createApplication.Router = Router;
function createApplication(){
    // 创建一个应用
    return new Application(); 
}
module.exports = createApplication