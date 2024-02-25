const Parser = require('tree-sitter');
const parser = new Parser();
var fs = require('fs');



function longMethods(methods, threshold){
    const dbHeader = ['start_line', 'smell', 'found', 'threshold']
    var longMethodSmells = [dbHeader]
    for(let mtd of methods){
        var node = mtd.node
        const actual_length = node.endPosition.row - node.startPosition.row
        if(actual_length > threshold){
            // console.log(`Line ${node.startPosition.row}: Method is longer than ${threshold} lines (found ${node.endPosition.row - node.startPosition.row} lines)`)
            longMethodSmells.push([node.startPosition.row, "long method", actual_length, threshold]) 
        }

    }
    return longMethodSmells
}

module.exports = {longMethods}