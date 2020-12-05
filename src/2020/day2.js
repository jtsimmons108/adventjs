const utils = require('../advent-utils');

function countLetters(password, letter){
    let count = 0;
    for (let l of password){
        if (l == letter){
            count++;
        }
    }
    return count;
}

const input = utils.readInputAsList('../../inputs/2020/day2.txt');
const pattern = /(\d+)-(\d+)\s([a-z]):\s([a-z]+)/;

let part1 = 0;
let part2 = 0;

for (let line of input){
    [min, max, letter, password] = line.match(pattern).slice(1, 5);
    
    let count = countLetters(password, letter);
    if(count >= +min && count <= +max){
        part1++;
    }

    if ((password.charAt(min - 1) == letter) ^ (password.charAt(max - 1) == letter)){
        part2++;
    }

}
console.log(part1, part2);