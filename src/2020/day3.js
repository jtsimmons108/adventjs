const utils = require('../advent-utils');
const start = new Date().getTime();
const input = utils.readInputAsList('../../inputs/2020/day3.txt')

const slopes = [[1,1], [3,1], [5,1], [7,1], [1,2]];
const cols = input[0].length;

let part1, part2 = 1;

slopes.forEach(slope => {
    [dc, dr] = slope;
    trees = 0;
    input.forEach((line, index) => {
        if(index % dr == 0 && line.charAt(dc / dr * index % cols) == '#'){
            trees++;
        }
    });
    if(dc == 3){
        part1 = trees;
    }
    part2 *= trees;
});
const end = new Date().getTime();
console.log('Run Time:', end - start);
console.log('Part 1:', part1);
console.log('Part 2:', part2);




