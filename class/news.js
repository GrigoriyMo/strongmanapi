var Main = require('./main');

class NewsElement extends Main{
    constructor(obj) {
        super();
        this.id ;
        this.imgsrc = obj.imgsrc;
        this.imgalt = obj.imgalt;
        this.title = obj.title;
        this.text = obj.text;
        this.date = obj.date;
        this.url = obj.url;
    }
}

module.exports.NewsElement = NewsElement;
