const utils = require('../advent-utils');
const input = utils.readInputAsList('../../inputs/2020/day9.txt').map(Number);

function containsSummingPair(preamble, target){
    for(let i = 0; i < preamble.length - 1; i++){
        for(let j = i + 1; j < preamble.length; j++){
            if (preamble[i] + preamble[j] == target){
                return true;
            }
        }
    }
    return false;
}

const size = 25;
const preamble = input.slice(0, size);
let index = size;

while(containsSummingPair(preamble, input[index])){
    preamble.shift();
    preamble.push(input[index]);
    index++;
}

const invalid = input[index];
let part1 = invalid;

let startIndex = 0;
let endIndex = 0;
let sum = input[startIndex];

while(sum != invalid){
    endIndex = startIndex + 1;
    while(sum < invalid){
        sum += input[endIndex];
        endIndex++;
    }
    if(sum > invalid){
        startIndex++;
        sum = input[startIndex];
    }
}

const contiguous = input.slice(startIndex, endIndex);
let part2 = Math.min(...contiguous) + Math.max(...contiguous);

console.log('Part 1:', part1);
console.log('Part 2:', part2);


