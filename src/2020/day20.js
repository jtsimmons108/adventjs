const utils = require('../advent-utils');
const Piece = require('./piece');
const input = utils.readInputAsString('../../inputs/2020/day20.txt').split('\n\n');


let pieces = input.map(line => new Piece(line));

let matchedEdges = {};

for(let piece of pieces){
    for (let edge of piece.edges){
        if(!matchedEdges[edge]){
            matchedEdges[edge] = new Set();
        }
        matchedEdges[edge].add(piece.pieceId);
    }
}

console.log(matchedEdges);
let connected = {};

pieces.forEach(piece => {
    connected[piece.pieceId] = new Set();
    for(let edge of piece.edges){
        for(let id of matchedEdges[edge]){
            connected[piece.pieceId].add(id);
        }
    }
});
console.log(connected)
let prod = 1;
let count = 0;
for (let pieceId of Object.keys(connected)){
    if(connected[pieceId].size == 3){
        prod *= Number(pieceId);
        count++;
    }
}
console.log(count, prod);