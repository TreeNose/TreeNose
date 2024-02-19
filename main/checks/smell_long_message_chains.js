const { fetchCode } = require('./code_query')

const Parser = require('tree-sitter');

const fs = require('fs');
const Syntaxes = JSON.parse(fs.readFileSync('./configs/smell_categories.json', 'utf8'));

const TargetNode = ['call']
var Visited = {}
var checkedLines = []

function longMessageChains(calls, threshold, lang){
    const langTargetNode = TargetNode.map(node => Syntaxes['grammar'][node][lang]).flat()
    for (let single_call of calls){
        Visited = {}
        callTooLong = checkDepthTooLong(single_call.node, threshold, langTargetNode)
        callLine = single_call.node.startPosition.row
        if (callTooLong && ! checkedLines.includes(callLine)){
            checkedLines.push(callLine)
            console.log(`Line ${callLine}: Long message chain detected`)
        }
    }
}

function checkDepthTooLong(node, threshold, targetNode, depth = 1){
    if (Visited[node]){
        return false
    }
    Visited[node] = true
    if (depth > threshold){
        return true
    }
    for (let child of node.children){
        if (targetNode.includes(child.type)){
            tooLong = checkDepthTooLong(child, threshold, targetNode, depth + 1)
        }else{
            tooLong = checkDepthTooLong(child, threshold,targetNode, depth)
        }
        if (tooLong){
            return true
        }
    }
    return false
}

module.exports = { longMessageChains }