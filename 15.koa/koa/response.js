let response = {
    _body:'', // _ 意味着不希望别人访问到私有属性
    get body(){
        return this._body
    },
    set body(value){
        this._body = value;
    }
}


module.exports = response;