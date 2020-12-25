const utils = require('../advent-utils');
const start = new Date().getTime();
const input = utils.readInputAsString('../../inputs/2020/day4.txt')
                    .split('\n\n');

function getPassports(input){
    let passports = [];
    input.map(entry => {
        fields = entry.split(/\s/);
        passport = {}
        fields.forEach(field => {
            [key, value] = field.split(':');
            passport[key] = value;
        });
        passports.push(passport)
    });
    return passports;
}

function hasRequiredFields(passport){
    let fields = Object.keys(passport);
    return fields.length == 8
                || fields.length == 7 && !fields.includes('cid');
}

function meetsRequirements(passport){
    
    if (!numberIsBetween(passport.byr, 1920, 2002)){
        return false;
    }
    if (!numberIsBetween(passport.iyr, 2010, 2020)){
        return false;
    }
    if (!numberIsBetween(passport.eyr, 2020, 2030)){
        return false;
    }
    if (!passport.hgt.match(/\d+[cm|in]/)){
        return false
    } 
    if(passport.hgt.slice(-2) == 'cm' && !numberIsBetween(passport.hgt.slice(0,-2), 150, 193)){
        return false;
    }
    if(passport.hgt.slice(-2) == 'in' && !numberIsBetween(passport.hgt.slice(0,-2), 59, 76)){
        return false;
    }
    if (!passport.hcl.match(/#[a-f0-9]{6}/)){
        return false;
    }
    if (!passport.ecl.match(/(amb|blu|brn|gry|grn|hzl|oth)/)){
        return false;
    }
    if (passport.pid.length != 9){
        return false;
    }
    return true;

}

function numberIsBetween(number, low, high){
    return +number >= low && +number <= high;
}

let validPassports = getPassports(input)
                .filter(passport => hasRequiredFields(passport));

let part1 = validPassports.length;
let part2 = validPassports
                    .filter(passport => meetsRequirements(passport))
                    .length;
const end = new Date().getTime();
console.log('Run Time:', end - start);
console.log('Part 1:', part1);
console.log('Part 2:', part2);