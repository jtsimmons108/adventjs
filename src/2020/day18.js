const utils = require('../advent-utils');
const start = new Date().getTime();
const input = utils.readInputAsList('../../inputs/2020/day18.txt');


function eval(string){
    const parts = string.split(' ');
    let ans = Number(parts[0]);
    for(let i = 1; i < parts.length - 1; i += 2){
        let next = Number(parts[i + 1])
        if (parts[i] == '+'){
            ans += next;
        }else{
            ans *= next;
        }
    }
    return ans;
}

function evalPlusFirst(string){
    const parts = string.split(' ');
    if (!string.includes('+')){
        let prod = 1;
        for(let i = 0; i < parts.length; i += 2){
            prod *= Number(parts[i]);
        }
        return prod;
    } else{
        for(let i = 1; i < parts.length - 1; i += 2){
            if (parts[i] == '+'){
                let ans = Number(parts[i - 1]) + Number(parts[i + 1]);
                let newString = string.replace(parts.slice(i - 1, i + 2).join(' '), ans);
                return evalPlusFirst(newString);
            }
        }
    }
}

function evalWithParenthesis(string){
    let maxDepth = findMaxDepth(string);
    if (maxDepth == 0){
        return eval(string);
    }
    let depth = 0;
    for(let i in string){
        if(string[i] == '('){
            depth++;
            if (depth == maxDepth){
                let closing = string.indexOf(')', i);
                let current = string.slice(i, closing + 1);
                let answer = eval(current.slice(1, -1));
                newString = string.replace(string.slice(i, closing+1), answer);
                return evalWithParenthesis(newString);
            }
        } else if(string[i] == ')'){
            depth--;
        }
    }
}

function evalWithParenthesisPlusFirst(string){
    let maxDepth = findMaxDepth(string);
    if (maxDepth == 0){
        return evalPlusFirst(string);
    }
    let depth = 0;
    for(let i in string){
        if(string[i] == '('){
            depth++;
            if (depth == maxDepth){
                let closing = string.indexOf(')', i);
                let current = string.slice(i, closing + 1);
                let answer = evalPlusFirst(current.slice(1, -1));
                newString = string.replace(string.slice(i, closing+1), answer);
                return evalWithParenthesisPlusFirst(newString);
            }
        } else if(string[i] == ')'){
            depth--;
        }
    }
}

function findMaxDepth(string){
    let index = 0;
    let maxDepth = 0;
    let depth = 0;
    for(let index in string){
        if(string[index] == '('){
            depth++;
            maxDepth = Math.max(depth, maxDepth);
        }else if(string[index] == ')'){
            depth--;
        }
    }
    return maxDepth;
}


let part1 = input.map(line => evalWithParenthesis(line)).reduce((a, b) => a + b);

let part2 = input.map(line => evalWithParenthesisPlusFirst(line)).reduce((a, b) => a + b);
console.log(new Date().getTime() - start);
console.log(part1);
console.log(part2);