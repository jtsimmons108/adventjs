const utils = require('../advent-utils');
const start = new Date().getTime();
let input = utils.readInputAsList('../../inputs/2020/day25.txt');

let mod = 20201227;

let [card, door] = input.map(Number);
let subject = 7;

let cardPK = 1;
let cardLoop = 0;
while (cardPK != card){
    cardPK = (cardPK * subject) % mod;
    cardLoop++;
}
let doorPK = 1;
let doorLoop = 0;
while (doorPK != door){
    doorPK = (doorPK * subject) % mod;
    doorLoop++;
}

let encryptionKey = 1; 
subject = door;
for(let i = 0; i < cardLoop; i++){
    encryptionKey = (encryptionKey * subject) % mod;
}

const end = new Date().getTime();
console.log('Run Time:', end - start);
console.log('Part 1:', encryptionKey);
console.log('Part 2: Complete');