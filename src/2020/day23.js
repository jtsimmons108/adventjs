const utils = require('../advent-utils');
const Cup = require('./cup');
const start = new Date().getTime();

let input = utils.readInputAsString('../../inputs/2020/day23.txt')
                    .split('').map(Number).map(n => new Cup(n));


function playGame(start, limit, rounds){
    const cups = {};
    for(let i = start.length + 1; i <= limit; i++){
        start.push(new Cup(i));
    }
    for(let i = 0; i < start.length; i++){
        let next = i == start.length - 1 ? 0 : i + 1;
        start[i].next = start[next];
    }
    start.forEach(c => cups[c.value] = c);

    let current = start[0];

    for(let i = 0; i < rounds; i++){
        let first = current.next;
        let second = first.next;
        let third = second.next;
        let picked = new Set([first.value, second.value, third.value]);
        current.next = third.next;
        let target = current.value == 1 ? input.length : current.value - 1;
        while (picked.has(target)){
            target = target == 1 ? input.length : target - 1;
        }
        let destination = cups[target];
        let temp = destination.next;
        destination.next = first;
        third.next = temp;
        current = current.next;
    }
    return cups;
}

let first = playGame(input, input.length, 100);
let cup = first[1];
let part1 = '';
for(let i = 0; i < input.length - 1; i++){
    part1 += cup.next.value;
    cup = cup.next;
}

let second = playGame(input, 1000000, 10000000);
let target = second[1];
let part2 = target.next.value * target.next.next.value;

console.log('Part 1: ', part1);
console.log('Part 2: ', part2);