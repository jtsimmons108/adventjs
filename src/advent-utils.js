const fs = require('fs');


function readInputAsString(filePath){
    try{
        return fs.readFileSync(filePath, 'utf-8');
    }catch{
        console.log('Error reading file');
    }
}

function readInputAsList(filePath){
    return readInputAsString(filePath).split('\n')
}

module.exports = {
    readInputAsString, readInputAsList
};