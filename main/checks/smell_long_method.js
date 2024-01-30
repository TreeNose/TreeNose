const Parser = require('tree-sitter');
const parser = new Parser();
var fs = require('fs');

function longMethods(code_matches, threshold){
    for(let code_block of code_matches){
        var node = code_block.node
        if(node.endPosition.row - node.startPosition.row > threshold){
            console.log(`Line ${node.startPosition.row}: Method is longer ${threshold} lines`)
        }

    }
}

module.exports = {longMethods}