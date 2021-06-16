var Main = require('./main');

class ProtocolsElement extends Main{
    constructor(obj) {
        super();
        this.id ;
        this.img = obj.img;
        this.alt = obj.alt;
        this.text = obj.text;
        this.results = obj.results;
    }
}

module.exports.ProtocolsElement = ProtocolsElement;
