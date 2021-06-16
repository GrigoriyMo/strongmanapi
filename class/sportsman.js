var Main = require('./main');

class SportsmanElement extends Main{
    constructor(obj) {
        super();
        this.id ;
        this.city = obj.city;
        this.name = obj.name;
        this.pic = obj.pic;
    }

}

module.exports.SportsmanElement = SportsmanElement;
