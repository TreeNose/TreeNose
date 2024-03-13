const fs = require('fs');
const Syntaxes = JSON.parse(fs.readFileSync('./configs/smell_categories.json', 'utf8'));

// walkCallChain: when we visit this node, visit the children
// checkCallChain: when we visit this node, count the chain depth
const walkCallChain = ["walk_call_chains"]
const checkCallChain = ["check_call_chains"]

var Visited = {}
var checkedLines = []

/**
 * Detector for long message chains
 * @param {Array} chains - Array of call chain nodes
 * @param {Number} threshold - Threshold for the max depth of the long message chain
 * @param {String} lang - Language of the source code
 * @returns {Array} - Array of formatted long message chain reports
 * */
function longMessageChains(chains, threshold, lang){
    var longMessageChains = []

    // get language specific nodes for the call chain
    const langWalkCallChainChain = walkCallChain.map(node => Syntaxes['grammar'][node][lang]).flat()
    const langCheckCallChainChain = checkCallChain.map(node => Syntaxes['grammar'][node][lang]).flat()

    for (let chain of chains){
        Visited = {}
        // check if the call chain is too long
        callTooLong = checkDepthTooLong(chain.node, threshold, langWalkCallChainChain, langCheckCallChainChain)
        callLine = chain.node.startPosition.row

        // if chain too long, report the line the chain starts
        if (callTooLong && ! checkedLines.includes(callLine)){
            checkedLines.push(callLine)
            // console.log(`Line ${callLine}: Long message chain detected`)
            longMessageChains.push([callLine, "long message chain", threshold])
        }
    }
    return longMessageChains
}

/**
 * Check the depth of the call chain
 * @param {Object} node - The call chain node to check
 * @param {Number} threshold - Threshold for the max depth of the long message chain
 * @param {Array} walkCallChain - Array of nodes to walk
 * @param {Array} checkCallChain - Array of nodes to check
 * @param {Number} depth - Current depth of the call chain
 * @returns {Boolean} - True if the call chain is too long, False otherwise
 * */
function checkDepthTooLong(node, threshold, walkCallChain, checkCallChain, depth = 1){

    // if the node has been visited, then it's not too long or it has been reported
    if (Visited[node]){
        return false
    }
    // console.log(depth)
    // console.log(node.text)
    Visited[node] = true

    // if the depth is too long, return true
    if (depth > threshold){
        return true
    }

    for (let child of node.children){
        
        // if the child is in the walkCallChain, then visit the child
        if (walkCallChain.includes(child.type)){
            // if the child is in the checkCallChain, depth + 1
            if (checkCallChain.includes(child.type)){
                depth += 1
            }
            // if the child is not in the checkCallChain, depth remains the same depth
            return checkDepthTooLong(child, threshold, walkCallChain, checkCallChain, depth)
        }
    }
    return false
}

module.exports = { longMessageChains }