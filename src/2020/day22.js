const utils = require('../advent-utils');
const start = new Date().getTime();
const input = utils.readInputAsString('../../inputs/2020/day22.txt').split('\n\n');
let [player1, player2] = input.map(line => line.split('\n').slice(1).map(Number));

function playGame(player1, player2, recursive){
    let hands = new Set();
    while (player1.length > 0 && player2.length > 0){
        let gameState = player1.join(',') + 'vs' + player2.join(',');
        if (recursive && hands.has(gameState)){
            return [,1];
        }
        hands.add(gameState);
        let p1Card = player1.shift();
        let p2Card = player2.shift();
        let handWinner = 0;
        if (recursive && player1.length >= p1Card && player2.length >= p2Card){
            let [,res] = playGame(player1.slice(0, p1Card),
                                        player2.slice(0, p2Card), true);
            handWinner = res;
        }
        else{
            handWinner = p1Card > p2Card ? 1 : 2;
        } 

        if (handWinner == 1){
            player1.push(p1Card, p2Card);
        }else{
            player2.push(p2Card, p1Card);
        }
    }
    
    let [winner, result] = player1.length == 0 ? [player2, 2] : [player1, 1]
    return [winner, result];
}

function calculateScore(hand){
    let cards = hand.length;
    return hand.map((card, i) => (cards - i) * card).reduce((a, b) => a + b)
}


let [part1Hand, part1Winner] = playGame([...player1], [...player2], false);
let [part2Hand, part2Winner] = playGame([...player1], [...player2], true);
let part1 = calculateScore(part1Hand);
let part2 = calculateScore(part2Hand);
const end = new Date().getTime();
console.log('Run Time:', end - start);
console.log('Part 1: ', part1);
console.log('Part 2: ', part2);
