var Main = require('./main');

class EquipElement  extends Main  {
    constructor(obj) {
        super();
        this.id ;
        this.excercise = obj.excercise;
        this.dimensions = obj.dimensions;
    }
}

module.exports.EquipElement = EquipElement;
