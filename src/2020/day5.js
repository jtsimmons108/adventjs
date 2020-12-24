const utils = require('../advent-utils');
require('constants');
const input = utils.readInputAsList('../../inputs/2020/day5.txt');

function findZone(directions, upper){
    let left = 0;
    let right = Math.pow(2, directions.length) - 1;

    for(let letter of directions){
        if (letter == upper){
            left = Math.ceil((left + right) / 2);
        }else{
            right = Math.floor((left + right) / 2);
        }
    }
    return left;
}

function getSeatId(directions){
    let row = findZone(directions.slice(0, 7), 'B');
    let col = findZone(directions.slice(7), 'R');
    return row * 8 + col;
}

function getSeatIdBinary(directions){
    return parseInt(directions.replace(/[FL]/g,'0').replace(/[BR]/g, '1'), 2);
}

const seatIds = input.map(line => getSeatId(line)).sort((a, b) => a-b);

const part1 = seatIds[seatIds.length - 1];
const part2 = seatIds.find((_, index) => seatIds[index] + 1 != seatIds[index + 1]) + 1;

console.log('Part 1:', part1);
console.log('Part 2:', part2);
