const Parser = require('tree-sitter');
const parser = new Parser();
const fs = require('fs');
const Syntaxes = JSON.parse(fs.readFileSync('./configs/smell_categories.json', 'utf8'));

function longParameters(methods, threshold, lang){
    var longParamsSmells = []
    paramsSyntaxes = Syntaxes["node"]["parameters"][lang]
    for (let mtd of methods){
        var paramsNode = findParametersFromMethod(mtd.node,paramsSyntaxes)
        if (paramsNode && paramsNode.namedChildCount >  threshold){
            // console.log(`Line ${mtd.node.startPosition.row}: Method has more than ${threshold} parameters (found ${paramsNode.namedChildCount} parameters)`)
            longParamsSmells.push([mtd.node.startPosition.row, "long parameters", paramsNode.namedChildCount, threshold])
        }
    }
    return longParamsSmells
}

function findParametersFromMethod(methodNode, ParamsSyntaxes){
    for (let subNode of methodNode.namedChildren){
        if(ParamsSyntaxes.includes(subNode.type)){
            return subNode
        }
    }
    return null
}
module.exports = {longParameters}