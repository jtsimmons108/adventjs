const utils = require('../advent-utils');
const input = utils.readInputAsList('../../inputs/2020/day14.txt');


function getAllMemoryLocations(maskedNumber){
    let regs = [];
    let xs = [...maskedNumber].filter(c => c === 'X').length;
    for(let i = 0; i < Math.pow(2, xs); i++){
        let current = [...maskedNumber]
        let subs = bin(i, xs);
        let x = 0;
        for(let j = 0; j < MASK_LENGTH; j++){
            if(current[j] == 'X'){
                current[j] = subs[x++];
            }
        }
        regs.push(parseInt(current.join(''), 2))
    }
    return regs
}

function getMaskedNumberPart1(n, mask){
    let masked = [...n].map((e, i) => mask[i] === 'X' ? e : mask[i])
    return parseInt(masked.join(''), 2);
}

function getMaskedNumberPart2(n, mask){
    return masked = [...n].map((e, i) => {
        if      (mask[i] === 'X') return 'X';
        else if (mask[i] === '1') return '1';
        else                      return e;
    }).join('');
}

function bin(n, length){
    return n.toString(2).padStart(length, '0')
}

const mem1 = {};
const mem2 = {};

const maskPattern = /mask = ([01X]+)/
const memPattern = /mem\[(\d+)\] = (\d+)/
let mask;
const MASK_LENGTH = 36;

input.forEach(line => {
    if (line.match(maskPattern)){
        mask = line.match(maskPattern)[1];
    }else{
        [reg, val] = line.match(memPattern).slice(1,3).map(Number);
        binVal = bin(val, MASK_LENGTH)
        binReg = bin(reg, MASK_LENGTH);
        mem1[reg] = getMaskedNumberPart1(binVal, mask);
        getAllMemoryLocations(getMaskedNumberPart2(binReg, mask))
            .forEach(r => mem2[r] = +val);
    }
});

let part1 = Object.values(mem1).reduce((a, b) => a + b);
let part2 = Object.values(mem2).reduce((a, b) => a + b);

console.log('Part 1:', part1);
console.log('Part 2:', part2);
