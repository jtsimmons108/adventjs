const fs = require('fs');
const utils = require('./advent-utils')

let data = utils.readInputAsList('inputs/2015day2.txt');

let total = 0;

for (let line of data){
    [s1, s2, s3] = line.split('x')
                    .map(val => parseInt(val, 10))
                    .sort((a, b) => a-b);

    total += 2 * (s1 * s2 + s2 * s3 + s1 * s3) + s1 * s2;
}

console.log(total)