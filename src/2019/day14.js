const utils = require('../advent-utils');
const input = utils.readInputAsList('../../inputs/2019/day14.txt');

reqs = {}

input.forEach(line => {
    [inputs, output] = line.split(' => ');
    console.log(inputs.split(', '), output);
    [amt, chem] = output.split(' ');
    req = {}
    inputs.split(', ').forEach(c => {
        req[c.split(' ')[1]] = Number(c.split(' ')[0]);
    });
    req['amt'] = Number(amt);
    reqs[chem] = req;
});

console.log(reqs)