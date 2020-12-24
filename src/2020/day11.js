const utils = require('../advent-utils');

function isValidPos(row, col){
    return row >= 0 && row < rows && col >= 0 && col < cols;
}

function getOccupiedNeighborCount(row, col, grid){
    return getNeighbors(row, col, grid).filter(n => n == '#').length; 
}

function getFirstOccupiedNeighborCount(row, col, grid){
    return getFirstVisibleNeighbors(row, col, grid).filter(n => n == '#').length;
}

function getFirstVisibleNeighbors(row, col, grid){
    return deltas.map(([dr, dc]) => getFirstNeighborInDirection(row, col, dr, dc, grid))
}

function getFirstNeighborInDirection(row, col, dr, dc, grid){
    row += dr;
    col += dc;
    while(isValidPos(row, col)){
        if(grid[row][col] != '.'){
            return grid[row][col]
        }
        row += dr;
        col += dc;
    }
    return '.'
}
function getNeighbors(row, col, grid){
    return deltas.filter(([dr, dc]) => isValidPos(row + dr, col + dc))
        .map(([dr, dc]) => grid[row + dr][col + dc])
}

function getNextStatePart1(row, col, grid){
    const current = grid[row][col]
    if (current === '.') 
        return '.';
    else if(current === 'L')
        return getOccupiedNeighborCount(row, col, grid) == 0 ? '#' : 'L';
    else
        return getOccupiedNeighborCount(row, col, grid) >= 4 ? 'L' : '#';
}

function getNextStatePart2(row, col, grid){
    const current = grid[row][col]
    if (current === '.') 
        return '.';
    else if(current === 'L')
        return getFirstOccupiedNeighborCount(row, col, grid) == 0 ? '#' : 'L';
    else
        return getFirstOccupiedNeighborCount(row, col, grid) >= 5 ? 'L' : '#';
}

function changeState(grid, part){
    const nextGrid = [...Array(rows)].map(e => Array(cols));
    for(let row = 0; row < rows; row++){
        for(let col = 0; col < cols; col++){
            if (part == 1){
                nextGrid[row][col] = getNextStatePart1(row, col, grid);
            }else{
                nextGrid[row][col] = getNextStatePart2(row, col, grid);
            }
        }
    }
    return nextGrid;
}

function printGrid(grid){
    grid.forEach(row => {
        console.log(row.join(''))
    });
}
function getGridString(grid){
    return grid.map(row => row.join('')).join('')
}


const startingGrid = utils.readInputAsList('../../inputs/2020/day11.txt').map(line => [...line]);
const deltas = [[-1,-1], [-1, 0], [-1, 1], [1, -1], [1, 0], [1, 1], [0, -1], [0, 1]];
const rows = startingGrid.length;
const cols = startingGrid[0].length
let part1, part2;
for (let part of [1,2]){
    let grid = startingGrid.map(row => row.slice());
    const seen = new Set();
    while (!seen.has(getGridString(grid))){
        seen.add(getGridString(grid));
        grid = changeState(grid, part);
    }
    let active = [...getGridString(grid)].filter(c => c === '#').length;
    if (part == 1){
        part1 = active;
    }else{
        part2 = active;
    }
}

console.log('Part 1:', part1);
console.log('Part 2:', part2);

