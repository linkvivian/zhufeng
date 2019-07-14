let Promise = require('./promise')
let promise = new Promise((resolve,reject)=>{
    resolve();
});
let promise2 = promise.then(()=>{
    return promise2; // resolve
})
promise2.then(function(){

},function(err){
    console.log(err);
});
// TypeError: Chaining cycle detected for promise #<Promise>