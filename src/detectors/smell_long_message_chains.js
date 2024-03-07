const fs = require('fs');
const Syntaxes = JSON.parse(fs.readFileSync('./configs/smell_categories.json', 'utf8'));

// Caution: order matters here. The program always check the first element and roate the array
const TargetNodes = ['call_attribute','call']

var Visited = {}
var checkedLines = []

function longMessageChains(calls, threshold, lang){
    var longMessageChains = []
    var langTargetNodesChain = TargetNodes.map(node => Syntaxes['grammar'][node][lang]).flat()
    // Remove empty syntaxes
    langTargetNodesChain = langTargetNodesChain.filter(node => node != "")
    for (let single_call of calls){
        Visited = {}
        callTooLong = checkDepthTooLong(single_call.node, threshold, langTargetNodesChain)
        callLine = single_call.node.startPosition.row
        if (callTooLong && ! checkedLines.includes(callLine)){
            checkedLines.push(callLine)
            // console.log(`Line ${callLine}: Long message chain detected`)
            longMessageChains.push([callLine, "long message chain", threshold])
        }
    }
    return longMessageChains
}

function checkDepthTooLong(node, threshold, targetNodes, depth = 0){
    if (Visited[node]){
        return false
    }
    Visited[node] = true
    if (Math.ceil(depth / targetNodes.length) > threshold){
        return true
    }

    /* targetNodes is an array of syntaxes that we are looking for
    *  We are checking syntaxes in a round-robin fashion
    * For examples targetNodes = ['call_attribute','call']
    * Then the check chain will be call_attribute -> call -> call_attribute -> call -> ...
    */
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