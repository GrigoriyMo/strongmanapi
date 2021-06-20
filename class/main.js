module.exports = class Main {
    constructor(){
        this.id ;
    }
    set_id(id){
        this.id = id;
    }

    validate(){
        var flag = 1;
        for(var key in this){
            if(this[key] === undefined || this[key]===""){
                flag = 0;
            }
        } 
        return flag || new Error ({ message: "Данные заполнены не полностью" });
    }
}