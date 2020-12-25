const utils = require('../advent-utils');
const start = new Date().getTime();
const input = utils.readInputAsList('../../inputs/2020/day17.txt');

const fields = ['x', 'y', 'z', 'w'];
String.prototype.extractPoint = function(){
    return Object.fromEntries(
                    this.match(/(-?\d+)/g)
                        .map(Number)
                        .map((n , i) => [fields[i], n]));
}

Object.prototype.point3D = function() {return `(${this.x}, ${this.y}, ${this.z})`};
Object.prototype.point4D = function() {return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`};

function getNeighbors(point){
    let p = point.extractPoint();
    let keys = Object.keys(p);
    let neighbors = [];
    for(let perm = 1; perm < Math.pow(3, keys.length); perm++){
        let deltas = [...perm.toString(3).padStart(keys.length,0)].map(e => [0, 1, -1][e]);
        let current = {};
        keys.forEach((key, i) => current[key] = p[key] + deltas[i]);
        neighbors.push(keys.length == 3 ? current.point3D() : current.point4D());
    }
    return neighbors;
}

function findActiveCubes(active, cycles){
    for(let i = 0; i < cycles; i++){
        let neighborCounts = {};
        let validNeighbors = {};
        active.forEach(p => {
            let neighbors = getNeighbors(p);
            validNeighbors[p] = neighbors.filter(other => active.has(other)).length;
            neighbors.forEach(other => {
                if (!neighborCounts[other]){
                    neighborCounts[other]  = 0;
                }
                neighborCounts[other]++;
            });
        });

        let newActive = new Set();
        Object.entries(neighborCounts)
                    .filter(([point, count]) => !active.has(point) && count == 3)
                    .forEach(([point,])=> newActive.add(point));

        Object.entries(validNeighbors)
                    .filter(([,count]) => count == 2 || count ==3)
                    .forEach(([point,]) => newActive.add(point));

        active = newActive;
    }

    return active.size;
}

let active3D = new Set();
let active4D = new Set();
input.forEach((line, r) => {
    [...line].forEach((ch, c) => {
        if (ch == '#'){
            active3D.add({'x': c, 'y': r, 'z': 0}.point3D());
            active4D.add({'x': c, 'y': r, 'z': 0, 'w': 0}.point4D());
        }
    });
});

let part1 = findActiveCubes(active3D, 6);
let part2 = findActiveCubes(active4D, 6);
const end = new Date().getTime();
console.log('Run Time:', end - start);
console.log('Part 1:', part1);
console.log('Part 2:', part2);