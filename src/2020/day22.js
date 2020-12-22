const utils = require('../advent-utils');
const input = utils.readInputAsString('../../inputs/2020/day22.txt').split('\n\n');
let [player1, player2] = input.map(line => line.split('\n').slice(1).map(Number));

let rounds = 0;

while (player1.length > 0 && player2.length > 0){
    let p1Card = player1.shift();
    let p2Card = player2.shift();
    if (p1Card > p2Card){
        player1.push(p1Card, p2Card);
    }else{
        player2.push(p2Card, p1Card);
    }
    rounds++;
}

let winner = player1.length == 0 ? player2 : player1
let cards = winner.length;
let score = winner.map((card, i) => (cards - i) * card).reduce((a, b) => a + b)
console.log(score);
