const utils = require('../advent-utils');
module.exports = class Piece{
    
    
    constructor(line){
        let sep = line.split('\n');
        this.pieceId = Number(sep[0].slice(5, -1));
        this.grid = sep.slice(1).map(row => [...row]);
        this.side = this.grid.length;
    }
    
    get edges(){
        return [this.top, this.right, this.bottom, this.left]
    }
    
    get right(){
        return this.grid.map(row => row[this.side - 1]).join('');
    }
    
    get top(){
        return this.grid[0].join('');
    }
    
    get bottom(){
        return this.grid[this.side-1].join('');
    }
    get left(){
        return this.grid.map(row => row[0]).join('');
    }
    
    align(edge, side){
        let count = 0;
        while(this[side] != edge){
            this.rotate();
            count++;
            if(count == 4){
                this.flip();
            }
        }
    }
    
    rotate(){
        utils.rotate2DInPlace(this.grid);
    }
    
    flip(){
        this.grid = this.grid.map(row => row.reverse());
    }
    
    toString(){
        return this.grid.map(row => row.join('')).join('\n');
    }
    trim(){
        this.grid = this.grid.map(row => row.slice(1,-1)).slice(1,-1);
    }
}