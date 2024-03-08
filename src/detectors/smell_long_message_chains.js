const fs = require('fs');
const Syntaxes = JSON.parse(fs.readFileSync('./configs/smell_categories.json', 'utf8'));

// Caution: order matters here. The program always check the first element and roate the array
const walkCallChain = ["walk_call_chains"]
const checkCallChain = ["check_call_chains"]

var Visited = {}
var checkedLines = []

function longMessageChains(chains, threshold, lang){
    var longMessageChains = []
    const langWalkCallChainChain = walkCallChain.map(node => Syntaxes['grammar'][node][lang]).flat()
    const langCheckCallChainChain = checkCallChain.map(node => Syntaxes['grammar'][node][lang]).flat()
    for (let chain of chains){
        Visited = {}
        callTooLong = checkDepthTooLong(chain.node, threshold, langWalkCallChainChain, langCheckCallChainChain)
        callLine = chain.node.startPosition.row
        if (callTooLong && ! checkedLines.includes(callLine)){
            checkedLines.push(callLine)
            // console.log(`Line ${callLine}: Long message chain detected`)
            longMessageChains.push([callLine, "long message chain", threshold])
        }
    }
    return longMessageChains
}

function checkDepthTooLong(node, threshold, walkCallChain, checkCallChain, depth = 1){
    if (Visited[node]){
        return false
    }
    // console.log(depth)
    // console.log(node.text)
    Visited[node] = true
    if (depth > threshold){
        return true
    }

    for (let child of node.children){
        if (walkCallChain.includes(child.type)){
            if (checkCallChain.includes(child.type)){
                return checkDepthTooLong(child, threshold, walkCallChain, checkCallChain, depth+1)
            }
            return checkDepthTooLong(child, threshold, walkCallChain, checkCallChain, depth)
        }
    }
    return false
}

module.exports = { longMessageChains }