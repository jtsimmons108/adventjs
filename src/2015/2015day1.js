const fs = require('fs');
const utils = require('../advent-utils')

let data = utils.readInputAsString('inputs/2015day1.txt');

let floor = 0;
for (let c of data){
    floor += c == '(' ? 1 : -1;
}
console.log(floor)