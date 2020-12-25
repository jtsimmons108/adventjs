const utils = require('../advent-utils');
const start = new Date().getTime();
const Piece = require('./piece');
const input = utils.readInputAsString('../../inputs/2020/day20.txt').split('\n\n');

let pieces = {}
input.forEach(line => {
    let p = new Piece(line)
    pieces[p.pieceId] = p;
});

let matchedEdges = {};
let sideLength = Math.sqrt(input.length);
Object.values(pieces).forEach(piece => {
    piece.edges.forEach(edge => {
        let reversed = utils.reverseString(edge);
        if(!matchedEdges[edge]){
            matchedEdges[edge] = new Set();
        }
        if(!matchedEdges[reversed]){
            matchedEdges[reversed] = new Set();
        }
        matchedEdges[edge].add(piece.pieceId);
        matchedEdges[reversed].add(piece.pieceId);
    });
});

let connected = {};
Object.values(pieces).forEach(piece => {
    connected[piece.pieceId] = new Set();
    piece.edges.forEach(e => {
        [...matchedEdges[e]].filter(id => id != piece.pieceId)
                    .forEach(id => connected[piece.pieceId].add(id));
    });
});

let corners = Object.keys(connected)
                    .filter(id => connected[id].size == 2);
let part1 = corners.reduce((a, b) => a * b);

let corner = pieces[corners[0]];
while(matchedEdges[corner.right].size != 2 || matchedEdges[corner.bottom].size != 2){
    corner.rotate();
}
const puzzle = [...Array(sideLength)].map(e => Array(sideLength));
puzzle[0][0] = corner;
for(let r = 0; r < sideLength; r++){
    for(let c = 0; c < sideLength; c++){
        let prev, edge, side;
        if(c == 0 && r > 0){
            prev = puzzle[r - 1][0];
            edge = prev.bottom;
            side = 'top';
        }else if(c > 0){
            prev = puzzle[r][c - 1];
            edge = prev.right;
            side = 'left'
        }
        if(prev){
            let [nextPieceId] = [...matchedEdges[edge]]
                                    .filter(id => id != prev.pieceId);
            let next = pieces[nextPieceId];
            next.align(edge, side);
            puzzle[r][c] = next;
        }
    }
}

Object.values(pieces).forEach(p => p.trim());

let finished = [];
for(let row of puzzle){
    for(let r = 0; r < 8; r++){
        let final = []
        for (let p of row){
            final.push(...p.grid[r]);
        }
        finished.push(final);
    }
}

let offsets = [[0,0], [1,1], [4,1], [5,0], [6,0], [7,1], 
                    [10,1], [11,0], [12,0],[13,1],[16,1], [17,0], [18,0], [18,-1], [19,0]];

let seaMonsters = 0;
while (seaMonsters == 0){
    for(let r = 0; r < finished.length - 1; r++){
        for(let c = 0; c < finished.length - 19; c++){
            if (offsets.every(([dc, dr]) => finished[r + dr][c + dc] == '#')){
                seaMonsters++;
                offsets.forEach(([dc, dr]) => finished[r + dr][c + dc] = 'O');
            }
        }
    }
    utils.rotate2DInPlace(finished);
}


let part2 = finished.map(row => row.filter(c => c == '#').length).reduce((a, b) => a + b);
const end = new Date().getTime();
console.log('Run Time:', end - start);
console.log('Part 1:', part1);
console.log('Part 2:', part2);