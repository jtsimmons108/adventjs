const utils = require('./advent-utils')
class Deck{

    constructor(size){
        this.deck = [...Array(size).keys()];
        this.size = size;
        console.log(this.deck)
    }

    cut(n){
        this.deck = this.deck.slice(n).concat(this.deck.slice(0,n))
    }

    dealIntoNewStack(){
        this.deck.reverse()
    }

    dealWithIncrement(n){
        let newDeck = Array(this.size)
        let index = 0
        for(let card of this.deck){
            newDeck[index] = card;
            index = (index + n) % this.size;
        }
        this.deck = newDeck;
    }

    findCardPosition(card){
        for (let index in this.deck){
            if(this.deck[index] == card)
                return index;
        }
    }
    
}


const input = utils.readInputAsList('inputs/2019day22.txt')
let deck = new Deck(10007);

for(let line of input){
    if (line.startsWith('cut')){
        const n = parseInt(line.substring(line.indexOf(' ') + 1))
        deck.cut(n);
    }else if(line.startsWith('deal with')){
        const n = parseInt(line.substring(line.lastIndexOf(' ') + 1))
        deck.dealWithIncrement(n);
    }else{
        deck.dealIntoNewStack();
    }
}
console.log(deck.findCardPosition(2019))


