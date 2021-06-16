var Main = require('./main');
class EquipmentElement extends Main{
    constructor(obj) {
        super();
        this.id ;
        this.name = obj.name;
        this.sell = obj.sell;
        this.rent = obj.rent;
    }
}

module.exports.EquipmentElement = EquipmentElement;
