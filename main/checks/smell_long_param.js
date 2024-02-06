const Parser = require('tree-sitter');
const parser = new Parser();
const fs = require('fs');
const Syntaxes = JSON.parse(fs.readFileSync('./configs/smell_categories.json', 'utf8'));

function longParameters(methods, threshold, lang){
    paramsSyntax = Syntaxes["node"]["parameters"][lang]
    for (let mtd of methods){
        var paramsNode = findParametersFromMethod(mtd.node,paramsSyntax)
        if (paramsNode.namedChildCount >  threshold){
            console.log(`Line ${mtd.node.startPosition.row}: Method has more than ${threshold} parameters (found ${paramsNode.namedChildCount} parameters)`)
        }
    }
}

function findParametersFromMethod(methodNode, ParamsSyntax){
    for (let subNode of methodNode.namedChildren){
        if(subNode.type == ParamsSyntax){
            return subNode
        }
    }
    new Error(`Method in line ${methodNode.startPosition.row} is not valid`)
}
module.exports = {longParameters}