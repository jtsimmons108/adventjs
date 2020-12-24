const utils = require('../advent-utils');
const input = utils.readInputAsString('../../inputs/2020/day6.txt')
                .split('\n\n');

function intersect(a, b){
    return new Set([...a].filter(e => b.has(e)))
}

Array.prototype.sum = function() { return this.reduce((a, b) => a + b) };

const part1 = input.map(group => new Set(group.replace(/\n/g,'')).size)
                .sum();

const part2 = input.map(group => {
        return group.split('\n')
                .map(answers => new Set(answers))
                .reduce((a, b) => intersect(a, b))
                .size;
}).sum();


console.log('Part 1:', part1);
console.log('Part 2:', part2);

