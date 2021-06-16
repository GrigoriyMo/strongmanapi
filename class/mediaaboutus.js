var Main = require('./main');

class MediaAboutUsElement extends Main {
    constructor(obj) {
        super();
        this.id ;
        this.imgsrc = obj.imgsrc;
        this.imgalt = obj.imgalt;
        this.medianame = obj.medianame;
        this.title = obj.title;
        this.text = obj.text;
        this.date = obj.date;
        this.url = obj.url;
    }
}

module.exports.MediaAboutUsElement = MediaAboutUsElement;
