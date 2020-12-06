const utils = require('../advent-utils');
const input = utils.readInputAsList('../../inputs/2020/day3.txt')

const slopes = [[1,1], [3,1], [5,1], [7,1], [1,2]];
const cols = input[0].length;
let product = 1;

slopes.forEach(slope => {
    [dc, dr] = slope;
    trees = 0;
    input.forEach((line, index) => {
        if(index % dr == 0 && line.charAt(dc / dr * index % cols) == '#'){
            trees++;
        }
    });
    console.log(slope, trees);
    product *= trees;
});

console.log(product)




