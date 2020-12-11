const utils = require('../advent-utils')
const input = utils.readInputAsList('../../inputs/2019/day22.txt')

function cut(pos, amt, length){
    return (pos - amount) % length;
}

function dealWithIncrement(pos, inc, length){
    return (post * inc) % length;
}

const newStack = (pos, length) =>{
    return length - pos;
}

const procs = []
const deckSize = 10011;
for(let line of input){
    const sep = line.split(/\s/);
    let func;
    if (sep.length == 2){
        func = (pos) => (pos - Number(sep[1]) + deckSize) % deckSize;

    }else if (sep[2] == 'new'){ 
        func = (pos) => deckSize - 1 - pos;

    }else{
        func = (pos) => (pos * Number(sep[3])) % deckSize;
    }
    procs.push(func)
}

let shuffle = procs.reduce((f, g) => g(f))
const target = 2020;
let start = target;
procs.forEach(func => start = func(start));
console.log(start);
let count = 1;
while(start != target){
    procs.forEach(func => start = func(start));
    count++;
}
console.log(count);




