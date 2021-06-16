var Main = require('./main');

class DirectionElement extends Main{
    constructor(obj) {
        super();
        this.id ;
        this.job = obj.job;
        this.name = obj.name;
        this.alt = obj.alt;
        this.vk = obj.vk;
        this.facebook = obj.facebook;
        this.instagram = obj.instagram;
        this.photo = obj.photo;
    }
}

module.exports.DirectionElement = DirectionElement;
