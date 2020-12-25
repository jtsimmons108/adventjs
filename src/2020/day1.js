const utils = require('../advent-utils')
const start = new Date().getTime();
const expenses = utils.readInputAsList('../../inputs/2020/day1.txt')
                    .map(Number)
let part1, part2;
for(let i = 0; i < expenses.length; i++){
    for(let j = i + 1; j < expenses.length; j++){
        if(expenses[i] + expenses[j] == 2020){
            part1 = expenses[i] * expenses[j];
        }
        for(let k = j + 1; k < expenses.length; k++){
            if(expenses[i] + expenses[j] + expenses[k] == 2020){
                part2 = expenses[i] * expenses[j] * expenses[k];
            }
        }
    }
}
const end = new Date().getTime();
console.log('Run Time:', end - start);
console.log('Part 1:', part1);
console.log('Part 2:', part2);