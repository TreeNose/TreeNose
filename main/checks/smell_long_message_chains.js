const { fetchCode } = require('./code_query')

const Parser = require('tree-sitter');

const fs = require('fs');
const Syntaxes = JSON.parse(fs.readFileSync('./configs/smell_categories.json', 'utf8'));

// Caution: order matters here. The program always check the first element and roate the array
const TargetNodes = ['call_attribute','call']

var Visited = {}
var checkedLines = []

function longMessageChains(calls, threshold, lang){
    var langTargetNodesChain = TargetNodes.map(node => Syntaxes['grammar'][node][lang]).flat()
    // Remove empty syntaxes
    langTargetNodesChain = langTargetNodesChain.filter(node => node != "")
    for (let single_call of calls){
        Visited = {}
        callTooLong = checkDepthTooLong(single_call.node, threshold, langTargetNodesChain)
        callLine = single_call.node.startPosition.row
        if (callTooLong && ! checkedLines.includes(callLine)){
            checkedLines.push(callLine)
            console.log(`Line ${callLine}: Long message chain detected`)
        }
    }
}

function checkDepthTooLong(node, threshold, targetNodes, depth = 1){
    if (Visited[node]){
        return false
    }
    Visited[node] = true
    if (depth > threshold){
        return true
    }
    const firstElement = targetNodes.shift();
    targetNodes.push(firstElement)
    for (let child of node.children){
        if (child.type == firstElement){
            return checkDepthTooLong(child, threshold, targetNodes, depth + 1)
        }
    }
    return false
}

module.exports = { longMessageChains }