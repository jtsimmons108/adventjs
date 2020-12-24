const utils = require('../advent-utils');
let input = utils.readInputAsList('../../inputs/2020/day24.txt');

function getMoves(line){
    moves = []
    index = 0;
    while(index < line.length){
        if(line[index] == 'w' || line[index] == 'e'){
            moves.push(line[index]);
            index++;
        }else{
            moves.push(line.slice(index, index+2));
            index += 2;
        }
    }
    return moves;
}
const deltas = {'e': [1,-1,0], 'w': [-1,1,0], 'ne': [1,0,-1],
                'se': [0,-1,1], 'sw': [-1,0,1], 'nw': [0,1,-1] }
grid = {};
input.forEach(line => {
    pos = [0, 0, 0];
    getMoves(line).forEach(move =>{
        [dx, dy, dz] = deltas[move];
        pos[0] += dx;
        pos[1] += dy;
        pos[2] += dz;
    });
    let p = pos.join(',')
    grid[p] = grid[p] ? (grid[p] + 1) % 2 : 1;
});
let part1 = Object.values(grid).filter(c => c == 1).length;
for(let i = 0; i < 100; i++){
    const newGrid = {};
    const neighborCounts = {};
    const countedNeighbors = {};
    Object.keys(grid).forEach(p => {
        let status = grid[p] ? grid[p] : 0;
        if (!neighborCounts[p]){
            neighborCounts[p] = [0,0];
        }
        Object.values(deltas).forEach(([dx, dy, dz]) => {
            let [x, y, z] = p.split(',').map(Number);
            let n = [x + dx, y + dy, z + dz]
            let nStatus = grid[n.join(',')] ? grid[n.join(',')] : 0
            neighborCounts[p][nStatus]++;
            if (!countedNeighbors[n.join(',')]){
                countedNeighbors[n.join(',')] = [0,0]
            }
            countedNeighbors[n.join(',')][status]++;
            
        });
    });

    Object.entries(grid)
            .forEach(([point, status]) => {
                let blackNeighbors = neighborCounts[point][1];
                let newStatus;
                if(status == 0){
                    newStatus =  blackNeighbors == 2 ? 1 : 0;
                }else{
                    newStatus = blackNeighbors == 0 || blackNeighbors > 2 ? 
                                        0 : 1;
                }
                if(newStatus == 1){
                    newGrid[point] = newStatus;
                }
                
            });
    let tracked = new Set(Object.keys(grid));
    Object.keys(countedNeighbors)
            .filter(point => !tracked.has(point))
            .forEach(point => {
                if (countedNeighbors[point][1] == 2){
                    newGrid[point] = 1;
                }
            });
    
    grid = newGrid;
}
let part2 = Object.values(grid).filter(c => c == 1).length;

console.log('Part 1: ', part1);
console.log('Part 2: ', part2);