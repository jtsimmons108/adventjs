const fs = require('fs');

function readInputAsString(filePath){
    try{
        return fs.readFileSync(filePath, 'utf-8');
    }catch{
        console.log('Error reading file');
    }
}

function readInputAsList(filePath){
    return readInputAsString(filePath).split('\n')
}


function rotate2DInPlace(grid){
    const x = Math.floor(grid.length / 2);
    const y = grid.length - 1;
    for (let i = 0; i < x; i++) {
        for (let j = i; j < y - i; j++) {
            let k = grid[i][j];
            grid[i][j] = grid[y - j][i];
            grid[y - j][i] = grid[y - i][y - j];
            grid[y - i][y - j] = grid[j][y - i]
            grid[j][y - i] = k
        }
    }
}

function reverseString(string){
    return string.split('').reverse().join('');
}

module.exports = {
    readInputAsString, readInputAsList, 
    rotate2DInPlace, reverseString
};