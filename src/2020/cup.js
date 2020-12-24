module.exports = class Cup{
    constructor(value){
        this.value = value;
        this.prev = null;
        this.next = null;
    }

    toString(){
        return `(${this.prev.value})<-(${this.value})->(${this.next.value})`;
    }
}