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
console.log(invalid);

Array.prototype.sum = function() {return this.reduce((a, b) => a + b)};
Array.prototype.max = function() {return this.reduce((a, b) => Math.max(a, b))}
Array.prototype.min = function() {return this.reduce((a, b) => Math.min(a, b))}

for (let startIndex in input){
    const range = [input[startIndex]];
    let endIndex = +startIndex + 1;
    while (range.sum() < invalid){
        range.push(input[endIndex]);
        endIndex++;
    }

    if(range.sum() == invalid){
        console.log(range.min() + range.max());
        break;
    }
}



