var Main = require('./main');

class PhotoVideoElement extends Main{
    constructor(obj) {
        super();
        this.id ;
        this.url = obj.url;
        this.pic = obj.pic;
        this.title = obj.title;
    }

}

module.exports.PhotoVideoElement = PhotoVideoElement;
