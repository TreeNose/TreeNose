const { fetchCode } = require('./code_query')

const Parser = require('tree-sitter');
const parser = new Parser();

const fs = require('fs');

function longClass(classes, nol_threshold, noc_threshold, lang){
    for (let cls of classes){
        clsNode = cls.node
        var noc = checkNumberOfChildren(clsNode, lang)
        var nol = checkNumberOfLine(clsNode)
        
        if (nol > nol_threshold){
            console.log(`Line ${clsNode.startPosition.row}: Class is longer than ${nol_threshold} lines (found ${nol} lines)`)
        }

        if (noc > noc_threshold){
            console.log(`Line ${clsNode.startPosition.row}: Class has more than ${noc_threshold} children (found ${noc} children)`)
        }

    }
// nol: Number of line
// noc: number of children (attributes + methods)
}

function checkNumberOfLine(clsNode){
    return clsNode.endPosition.row - clsNode.startPosition.row
}

function checkNumberOfChildren(clsNode, lang){
    // Doc: currently only support method_definition as children
    const captures = fetchCode(clsNode.text, lang, "method_definition")
    // Get the number of fields
    const nof = new Set(captures.map((x)=>x.node.text)).size
    return nof
}

module.exports = { longClass }