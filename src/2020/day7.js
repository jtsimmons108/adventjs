const utils = require('../advent-utils');
const start = new Date().getTime();
const input = utils.readInputAsList('../../inputs/2020/day7.txt');

Array.prototype.sum = function() { return this.reduce((a, b) => a + b) };

function holdsShinyGoldBag(bag){
    const currentBag = allBags[bag];
    if (Object.keys(currentBag).length == 0){
        return false;
    }
    if (currentBag.hasOwnProperty('shiny gold')){
        return true;
    }
    return Object.keys(currentBag).some(bag => holdsShinyGoldBag(bag));
}

function getBagsHeld(bag){
    const contents = allBags[bag];
    if (Object.keys(contents).length == 0){
        return 0;
    }
    return Object.entries(contents).map(([b, n]) => n + n * getBagsHeld(b)).sum();
}

const pattern = /(.+) bags contain (.+)/
const bags = /(\d+) ([a-z|\s]+) bags?/

const allBags = {};

input.forEach(line => {
    [container, contents] = line.match(pattern).slice(1,3);
    
    if (!allBags[container]){
        allBags[container] = {};
    }
    const currentBag = allBags[container];

    const children = contents.split(', ')
            .map(content => content.replace('no', '0'));

    children.forEach(child => {
        [number, type] = child.match(bags).slice(1,3);
        if (+number > 0){
            currentBag[type] = +number;
        }
    })
            
});

let part1 = Object.keys(allBags).filter(holdsShinyGoldBag).length;
let part2 = getBagsHeld('shiny gold')

const end = new Date().getTime();
console.log('Run Time:', end - start);
console.log('Part 1:', part1);
console.log('Part 2:', part2);