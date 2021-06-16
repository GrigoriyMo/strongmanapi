var Main = require('./main');
class RatingvesElement extends Main {
    constructor(obj) {
        super();
        this.id ;
        this.place = obj.place;
        this.fio = obj.fio;
        this.year2017 = obj.year2017;
        this.year2018 = obj.year2018;
        this.year2019 = obj.year2019;
        this.sum = obj.sum;
ъ    }
}

module.exports.RatingvesElement = RatingvesElement;
