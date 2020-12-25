const utils = require('../advent-utils');
const start = new Date().getTime();
const input = utils.readInputAsList('../../inputs/2020/day10.txt');

const adapters = input.map(Number).sort((a, b) => a - b)
adapters.unshift(0);
adapters.push(adapters[adapters.length - 1] + 3);
let ones = 0;
let threes = 0;
for(let i = 1; i < adapters.length; i++){
    ones += adapters[i] - adapters[i-1] === 1;
    threes += adapters[i] - adapters[i-1] === 3;
}
let part1 = ones * threes;

const paths = {}
adapters.forEach(adapter => {
    const close = adapters.filter(val => val - adapter > 0 && val - adapter < 4)
    paths[adapter] = close;
})
known = {}
function getNumPathsFrom(target){
    if(paths[target].length == 0){
        return 1;
    }
    if (known[target]){
        return known[target];
    }
    let total = 0;
    for(let path of paths[target]){
        total += getNumPathsFrom(path);
    }
    known[target] = total;
    return total;
}

let part2 = getNumPathsFrom(0);
const end = new Date().getTime();
console.log('Run Time:', end - start);
console.log('Part 1:', part1);
console.log('Part 2:', part2);

