module.exports = class Piece{


    constructor(line){
        let sep = line.split('\n');
        this.pieceId = Number(sep[0].slice(5, -1));
        this.grid = sep.splice(1);
        this.edges = this.getEdges(this.grid);
    }


    getEdges(grid){

        let top = grid[0];
        let bottom = grid[grid.length-1];
        let left = grid.map(line => line[0]).join('');
        let right = grid.map(line => line[line.length - 1]).join('');
        return [top, right, bottom, left,
                this.reverse(top), this.reverse(right), 
                this.reverse(bottom), this.reverse(left)];
    }

    reverse(edge){
        return edge.split('').reverse().join('');
    }

}