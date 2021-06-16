var Main = require('./main');
class AnnouncementElement extends Main{
    constructor(obj) {
        super();
        this.id ;
        this.pic = obj.pic;
        this.alt = obj.alt;
        this.annotationContent = obj.annotationContent;
        this.annotationTitle = obj.annotationTitle;
        this.url = obj.url;
    }
}

module.exports.AnnouncementElement = AnnouncementElement;
