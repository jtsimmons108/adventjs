const utils = require('../advent-utils')

let expenses = utils.readInputAsList('../../inputs/2020/day1.txt')
                    .map(Number)

for(let i = 0; i < expenses.length; i++){
    for(let j = i + 1; j < expenses.length; j++){
        if(expenses[i] + expenses[j] == 2020){
            console.log(expenses[i] * expenses[j])
        }
        for(let k = j + 1; k < expenses.length; k++){
            if(expenses[i] + expenses[j] + expenses[k] == 2020){
                console.log(expenses[i] * expenses[j] * expenses[k])
            }
        }
    }
}