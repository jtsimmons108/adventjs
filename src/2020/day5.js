const utils = require('../advent-utils');
require('constants');
const input = utils.readInputAsList('../../inputs/2020/day5.txt');


function findZone(directions, upper){
    let left = 0;
    let right = Math.pow(2, directions.length) - 1;

    for(let letter of directions){
        if (letter == upper){
            left = Math.floor((left + right) / 2) + 1;
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

let seatIds = input.map(line => getSeatId(line)).sort((a, b) => a-b);

let part1 = seatIds[seatIds.length - 1];
let part2 = seatIds.filter((value, index) => {
    return seatIds[index] + 1 != seatIds[index + 1]
})[0] + 1;

console.log(part1, part2)