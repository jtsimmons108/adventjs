const utils = require('../advent-utils');
const start = new Date().getTime();
const VM = require('./vm');
const input = utils.readInputAsList('../../inputs/2020/day8.txt')

const machine = new VM(input);
let part1 = machine.run().finalValue;
let part2;
[...Array(input.length).keys()].forEach((index) => {
    const current = input[index];
    if (!current.includes('acc')){
        const instructions = [...input];
        instructions[index] = current.includes('jmp') ?
                                current.replace('jmp', 'nop') :
                                current.replace('nop', 'jmp');
        const vm = new VM(instructions);
        
        if(vm.run().isTerminated){
            part2 = vm.finalValue;
        }
    }
});

const end = new Date().getTime();
console.log('Run Time:', end - start);
console.log('Part 1:', part1);
console.log('Part 2:', part2);