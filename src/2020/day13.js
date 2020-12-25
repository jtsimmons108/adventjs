const utils = require('../advent-utils');
const start = new Date().getTime();
const input = utils.readInputAsList('../../inputs/2020/day13.txt');

const arrivalTime = Number(input[0]);
const busses  = Object.entries(input[1].split(',')).filter(([n, e]) => e !== 'x')
                        .map(e => e.map(Number))
                        .map(e => {
                            let bus = {}
                            bus['busId'] = e[1];
                            bus['waitTime'] = e[1] - arrivalTime % e[1];
                            bus['targetMod'] = (e[1] - e[0] % e[1]) % e[1];
                            return bus;
                        });

const myBus = busses.reduce((b1, b2) => b1.waitTime < b2.waitTime ? b1 : b2);
let part1 = myBus.busId * myBus.waitTime;

let part2 = 0;
let inc = busses[0].busId;
let i = 1;

while (i < busses.length){
    part2 += inc;
    if (part2 % busses[i].busId === busses[i].targetMod){
        inc *= busses[i].busId;
        i++;
    }
}
const end = new Date().getTime();
console.log('Run Time:', end - start);
console.log('Part 1:', part1);
console.log('Part 2:', part2);

