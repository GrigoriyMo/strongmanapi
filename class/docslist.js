var Main = require('./main');
 
class DocslistElement  extends Main {
    constructor(obj) {
        super();
        this.id ;
        this.url = obj.url;
        this.title = obj.title;
    }

}

module.exports.DocslistElement = DocslistElement;
