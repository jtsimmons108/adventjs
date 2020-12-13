const utils = require('../advent-utils');
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
console.log(myBus.busId * myBus.waitTime);

let time = 0;
let inc = busses[0].busId;
let i = 1;

while (i < busses.length){
    time += inc;
    if (time % busses[i].busId === busses[i].targetMod){
        inc *= busses[i].busId;
        i++;
    }
}

console.log(time);