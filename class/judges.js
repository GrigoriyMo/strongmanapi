var Main = require('./main');

class JudgesElement extends Main{
    constructor(obj) {
        super();
        this.id ;
        this.name = obj.name;
        this.level = obj.level;
        this.pic = obj.pic;
    }
}

module.exports.JudgesElement = JudgesElement;
