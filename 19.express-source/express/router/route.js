const Layer = require('./layer');
function Route(){
    this.stack = [];
}
Route.prototype.get = function(handler){
    let layer = new Layer('/',handler);
    layer.method = 'get';
    this.stack.push(layer);
}
Route.prototype.dispatch = function(){

}
module.exports = Route