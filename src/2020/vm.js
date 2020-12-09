module.exports = class VM {

    constructor(instructions){
        this.instructions = instructions;
        this.index = 0;
        this.seen = new Set();
        this.value = 0;
    }

    run(){
        while (this.index < this.instructions.length && !this.seen.has(this.index)){
            this.seen.add(this.index);
            this.processInstruction();
        }
        return this;
    }

    processInstruction(){
        let current = this.instructions[this.index];
        let [op, val] = current.split(' ');
        if(op === 'jmp'){
           this.index += Number(val);
        }else if(op === 'nop'){
            this.index++;
        }else if(op === 'acc'){
            this.value += Number(val);
            this.index++;
        }

    }
    get finalValue(){
        return this.value;
    }
    get isTerminated(){
        return this.seen.size > 0 && this.index == this.instructions.length;
    }


}

