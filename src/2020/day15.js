const utils = require('../advent-utils');
const start = new Date().getTime();
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
let part2 = prev;
const end = new Date().getTime();
console.log('Run Time:', end - start);
console.log('Part 1:', part1);
console.log('Part 2:', part2);