const utils = require('../advent-utils');
const Cup = require('./cup');
const start = new Date().getTime();

let input = utils.readInputAsString('../../inputs/2020/day23.txt')
                    .split('').map(Number).map(n => new Cup(n));

const cups = {};
input.forEach(c => cups[c.value] = c);
for(let i = 10; i <= 1000000; i++){
    input.push(new Cup(i));
}
for(let i = 0; i < input.length; i++){
    let next = i == input.length - 1 ? 0 : i + 1;
    let prev = i == 0 ? input.length - 1 : i - 1;
    input[i].next = input[next];
    input[i].prev = input[prev];
}

input.forEach(c => cups[c.value] = c);

let current = input[0];

for(let i = 0; i < 10000000; i++){
    let first = current.next;
    let second = first.next;
    let third = second.next;
    let picked = new Set([first.value, second.value, third.value]);
    current.next = third.next;
    third.next.prev = current;
    let target = current.value == 1 ? input.length : current.value - 1;
    while (picked.has(target)){
        target = target == 1 ? input.length : target - 1;
    }
    let destination = cups[target];
    let temp = destination.next;
    first.prev = destination;
    destination.next = first;
    temp.prev = third;
    third.next = temp;
    current = current.next;
}

function printCircle(current){
    let result = `(${current.value}) `;
    current = current.next;
    for(let i = 0; i < input.length - 1; i++){
        result += current.value + ','
        current = current.next;
    }
    console.log(result);
}

let first = cups[1].next;
let second = first.next;
console.log(first.value * second.value);