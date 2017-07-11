/**
 * Created by MAKS on 11.07.2017.
 */
const object = require('./singleton');
object.setParam1(10)

object.getParam1()

console.log('Param1 is: ' + object.getParam1())

Car = require('./Car');

var car1 = new Car('123458', 'bmw');
var car2 = new Car('123458', 'toyota');

car2.color = 'green'

console.log('1 Car = ' + car1.getName())
console.log('2 Car = ' + car2.getName())
console.log('1 Car Color= ' + car1.color)
console.log('2 Car Color= ' + car2.color)