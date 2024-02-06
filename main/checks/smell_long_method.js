const Parser = require('tree-sitter');
const parser = new Parser();
var fs = require('fs');

function longMethods(methods, threshold){
    for(let mtd of methods){
        var node = mtd.node
        if(node.endPosition.row - node.startPosition.row > threshold){
            console.log(`Line ${node.startPosition.row}: Method is longer than ${threshold} lines (found ${node.endPosition.row - node.startPosition.row} lines)`)
        }

    }
}

module.exports = {longMethods}