const utils = require('../advent-utils');
const start = new Date().getTime();
const input = utils.readInputAsList('../../inputs/2020/day21.txt');

const ingredients = {};
const allergens = {};
const pattern = /(.+)\s\(contains\s(.+)\)/;
input.forEach(line => {
    let [ingredientList, allergenList] = line.match(pattern)
                                .slice(1,3).map(e => e.split(/,? /g));
    ingredientList.forEach(ing => {
        if (!ingredients[ing]){
            ingredients[ing] = {'count': 0, 'allergens':{}};
        }
        ingredients[ing].count++;
        allergenList.forEach(a => {
            if(!ingredients[ing]['allergens'][a]){
                ingredients[ing]['allergens'][a] = 0;
            }
            ingredients[ing]['allergens'][a]++;
        });
    });

    allergenList.forEach(a => allergens[a] = allergens[a] ? allergens[a] + 1 : 1);

});

let total = 0;
let possible = {};
for (let ing of Object.keys(ingredients)){
    let current = ingredients[ing];
    for(let a of Object.keys(current['allergens'])){
        if (current['allergens'][a] < allergens[a]){
            delete current['allergens'][a];
        }
    }
    if (Object.keys(current['allergens']).length == 0){
        total += current.count;
    }else{
        possible[ing] = Object.keys(current['allergens']);
    }
}

let allergenCount = Object.keys(allergens).length;
let found = new Set();
finalAllergens = {};
while(found.size != allergenCount){
    for(let [ing, alls] of Object.entries(possible)){
        if(alls.length == 1){
            found.add(alls[0]);
            finalAllergens[ing] = alls[0];
        }else{
            possible[ing] = alls.filter(a => !found.has(a));
        }
    }
}

let sorted = Object.entries(finalAllergens)
                .sort(([,a1], [,a2]) => a1.localeCompare(a2))
                .map(([i, a]) => i)
                .join(',');
           
console.log(total);
console.log(sorted);
