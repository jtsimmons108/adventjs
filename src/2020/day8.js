const utils = require('../advent-utils');
const VM = require('./vm');
const input = utils.readInputAsList('../../inputs/2020/day8.txt')

const machine = new VM(input);
console.log(machine.run().finalValue);

[...Array(input.length).keys()].forEach((index) => {
    const current = input[index];
    if (!current.includes('acc')){
        const instructions = [...input];
        instructions[index] = current.includes('jmp') ?
                                current.replace('jmp', 'nop') :
                                current.replace('nop', 'jmp');
        const vm = new VM(instructions);
        
        if(vm.run().isTerminated){
            console.log(vm.finalValue);
        }
    }
});