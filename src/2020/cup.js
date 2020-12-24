module.exports = class Cup{
    constructor(value){
        this.value = value;
        this.next = null;
    }

    toString(){
        return `(${this.value})->(${this.next.value})`;
    }
}