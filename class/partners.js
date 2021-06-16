var Main = require('./main');
class PartnersElement extends Main {
    constructor(obj) {
        super();
        this.id ;
        this.pic = obj.pic;
        this.url = obj.url;
        this.alt = obj.alt;
        this.width = obj.width;
        this.height = obj.height;
    }

}

module.exports.PartnersElement = PartnersElement;
