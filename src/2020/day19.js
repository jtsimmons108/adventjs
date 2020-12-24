const utils = require('../advent-utils');
const input = utils.readInputAsString('../../inputs/2020/day19.txt');

let [rules, messages] = input.split('\n\n').map(section => section.split('\n'));
const patterns = Array(rules.length);

const known = {}
rules.forEach(rule => {
    [n, pattern] = rule.split(': ');
    if (pattern.includes('\"')){
        pattern = pattern[1];
        known[n] = [pattern];
    }else{
        pattern = pattern.split(' | ').map(part => part.split(' ').map(Number));
    }
    patterns[n] = pattern;
});


function buildRule(rule){
    let matches = [];
    for (let possible of patterns[rule]){
        if (possible.length == 1) {
            matches = matches.concat(known[possible[0]]);
        }else{
            [first, second] = possible;
            for (let f of known[first]){
                for (let s of known[second]){
                    matches.push(f + s);
                }
            }
        }
    }
    known[rule] = matches;
}

while(Object.keys(known).length < patterns.length){
    for(let i in rules){
        if (!known.hasOwnProperty(i) && patterns[i].every(list => list.every(r => known.hasOwnProperty(r)))){
            buildRule(i);
        }
    }
}
let valid = new Set(known[0])
let starts = new Set(known[42]);
let ends = new Set(known[31]);
let part1 = messages.filter(m => valid.has(m)).length;
messages = messages.filter(m => m.length > 24);
function testLonger(m){
    let i = 0; 
    while (ends.has(m.slice(m.length - 8*(i + 1), m.length - 8 * i))){
        i++;
    }
    if (i == 0){
        return false;
    }
    m = m.slice(0, m.length - 8 * i);
    if (m.length < (i + 1) * 8){
        return false;
    }
    for(let n = 0; n < m.length; n += 8){
        if (!starts.has(m.slice(n, n+8))){
            return false;
        }
    }
    return true;
}

part2 = part1 + messages.filter(testLonger).length;
console.log('Part 1:', part1);
console.log('Part 2:', part2);