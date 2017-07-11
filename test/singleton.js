/**
 * Created by MAKS on 11.07.2017.
 */
// Объявление модуля как глобальной переменной
var singleton = function(){

    var param1;
    // Внутренняя логика
    function sayHello(name){
        console.log('Hello, ' + name);
    }

    function setParam1(value){
        param1 = value;
    }
    function getParam1(){
        return param1;
    }

    // Внешнее API
    return {
        sayHello: sayHello,
        setParam1: setParam1,
        getParam1: getParam1
    }
}()

module.exports = singleton;