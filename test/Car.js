/**
 * Created by MAKS on 11.07.2017.
 */
var Car = function(id, name){

    this.vinId = id;
    this.name = name;

    this.setVinId = function(id) {
        this.vinId = id;
    }
    this.getVinId = function(){
        return this.vinId;
    }

    this.setName = function (name) {
        this.name = name;
    }
    this.getName = function () {
        return this.name;
    }
}

module.exports = Car
