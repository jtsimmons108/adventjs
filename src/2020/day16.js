const utils = require('../advent-utils');
const start = new Date().getTime();
const input = utils.readInputAsString('../../inputs/2020/day16.txt').split('\n\n');
[ranges, myTicket, nearBy] = input;
nearBy = nearBy.split('\n').slice(1).map(line => line.split(',').map(Number));
myTicket = myTicket.split('\n')[1].split(',').map(Number);
const rulePattern = /(.+): (\d+)-(\d+) or (\d+)-(\d+)/;

rules = {}
ranges.split('\n').forEach(r => {
    const vals = r.match(rulePattern).slice(1,6);
    let current = {};
    ['l1', 'h1', 'l2', 'h2'].forEach((e, i) => current[e] = Number(vals[+i + 1]));
    rules[vals[0]] = (num) => num >= current.l1 && num <= current.h1 || num >= current.l2 && num <= current.h2;
});

const invalid = [];
const valid = [];
nearBy.forEach(ticket => {
    let isValid = true;
    ticket.forEach(n => {
        if (Object.values(rules).filter(r => r(n)).length == 0){
            invalid.push(n);
            isValid = false;
        }
    });
    if (isValid){
        valid.push(ticket);
    }
});

const zipped = [];
for(let i = 0; i < valid[0].length; i++){
    zipped.push([]);
    for(let j = 0; j < valid.length; j++){
        zipped[i].push(valid[j][i]);
    }
}
const possible = {};
Object.entries(rules).forEach(([name, rule], n) => {  
    possible[name] = []
    for(let i = 0; i < zipped.length; i++){
        if (zipped[i].every(e => rule(e))){
            possible[name].push(i);
        }
    }
});


const found = new Set();
while(!Object.values(possible).every(l => l.length == 1)){
    for(let name of Object.keys(possible)){
        if (possible[name].length == 1){
            found.add(possible[name][0]);
        } else{
            possible[name] = possible[name].filter(n => !found.has(n));
        }
    }
}

let part1 = invalid.reduce((a, b) => a + b);
let part2 = Object.keys(possible).filter(key => key.includes('departure'))
                        .map(key => myTicket[possible[key]])
                        .reduce((a, b) => a * b);

const end = new Date().getTime();
console.log('Run Time:', end - start);
console.log('Part 1:', part1);
console.log('Part 2:', part2);

