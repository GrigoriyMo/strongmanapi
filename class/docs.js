
var Main = require('./main');
class DocsElement extends Main  {
    constructor(obj) {
        super();
        this.id ;
        this.title = obj.title;
        this.src = obj.src;
    }
}

module.exports.DocsElement = DocsElement;
