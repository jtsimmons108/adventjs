const utils = require('../advent-utils');
const nums = utils.readInputAsString('../../inputs/2020/day15.txt')
                .split(',')
                .map(Number);

const lastSeen = new Array(30000000).fill(0);
nums.slice(0,-1).forEach((e, i) => lastSeen[e] = i + 1);
let prev = nums[nums.length-1];
let count = nums.length;

while (count < 30000000){
    if(lastSeen[prev] === 0){
        next = 0;
    }else{
        next = count - lastSeen[prev]
    }
    lastSeen[prev] = count;
    if(count == 2020){
        part1 = prev;
    }
    count++;
    prev = next;
}

console.log(part1);
console.log(prev);