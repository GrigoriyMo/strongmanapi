var Main = require('./main');

class RatingElement extends Main{
    constructor(obj) {
        super();
        this.id ;
        this.place = obj.place;
        this.fio = obj.fio;
        this.tournament1result = obj.tournament1result;
        this.tournament2result = obj.tournament2result;
        this.tournament3result = obj.tournament3result;
        this.tournament4result = obj.tournament4result;
        this.tournament5result = obj.tournament5result;
        this.tournament6result = obj.tournament6result;
        this.tournament7result = obj.tournament7result;
        this.tournament8result = obj.tournament8result;
        this.tournament9result = obj.tournament9result;
        this.result = obj.result;
    }
}

module.exports.RatingElement = RatingElement;
