const utils = require('../advent-utils');
const start = new Date().getTime();
const input = utils.readInputAsList('../../inputs/2020/day12.txt');

const deltas = {0: [1, 0], 90: [0, 1], 180: [-1, 0], 270:[0, -1]}

let x1, y1, x2, y2, direction;
[x1, y1, x2, y2, direction] = Array(5).fill(0);
let wpx = 10;
let wpy = 1;
input.forEach(line => {
    let move = line[0];
    let amt = Number(line.slice(1));
    switch(move){
        case 'F':
            [dx, dy] = deltas[direction]
            x1 += dx * amt;
            y1 += dy * amt;
            x2 += wpx * amt;
            y2 += wpy * amt;
            break;
        case 'N':
            y1 += amt;
            wpy += amt;
            break;
        case 'E':
            x1 += amt;
            wpx += amt;
            break;
        case 'S':
            y1 -= amt;
            wpy -= amt;
            break;
        case 'W':
            x1 -= amt;
            wpx -= amt;
            break;
        case 'R':
            direction = (direction - amt + 360) % 360;
            var turns = 0;
            while (turns < amt){
                [wpx, wpy] = [wpy, -wpx];
                turns += 90;
            }
            break;
        case 'L':
            direction = (direction + amt) % 360;
            var turns = 0;
            while (turns < amt){
                [wpx, wpy] = [-wpy, wpx];
                turns += 90;
            }
            break;
    }
});
let part1 = Math.abs(x1) + Math.abs(y1);
let part2 = Math.abs(x2) + Math.abs(y2);
const end = new Date().getTime();
console.log('Run Time:', end - start);
console.log('Part 1:', part1);
console.log('Part 2:', part2);