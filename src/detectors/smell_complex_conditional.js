const fs = require('fs');
const Syntaxes = JSON.parse(fs.readFileSync('./configs/smell_categories.json', 'utf8'));
const SwitchCase = "switch_case"
const ifClause = "if_clause"
var Visited = {}

/** 
 * Detector for complex conditional
 * @param {Array} ifs - Array of if nodes
 * @param {Array} switches - Array of switch nodes
 * @param {Number} threshold - Threshold for the max case of the complex conditional
 * @param {String} lang - Language of the source code
 * @returns {Array} - Array of formatted complex conditional reports
 * */
function complexConditional(ifs, switches, threshold, lang) {
    // get the target nodes for the language from category config 
    const langSwitchCase = Syntaxes['grammar'][SwitchCase][lang]
    const langIfClause = Syntaxes['grammar'][ifClause][lang]
    const targetNodes = [...langSwitchCase, ...langIfClause]

    // console.log(targetNodes)
    var complexConditionals = []
    for (let ifCapture of ifs) {
        var ifNode = ifCapture.node

        // Ignore the node if it has been visited
        // This is to avoid counting the same node multiple times
        if (ifNode in Visited) {
            continue
        }

        // fix: should count else case other than by default plus one, cuz not all if has else

        // else case are not counted, therefore we add 1 to the count
        const ifCount = findTargetNode(ifNode, targetNodes) + 1
        if (ifCount > threshold) {
            // console.log(`Line ${ifNode.startPosition.row}: Complex conditional detected, found ${ifCount} conditional nodes, threshold is ${threshold}`)
            complexConditionals.push([ifNode.startPosition.row, "complex conditional", 'long if', ifCount, threshold])
        }
    }
    for (let switchCapture of switches) {
        var switchNode = switchCapture.node

        const caseCount = findTargetNode(switchNode, targetNodes)
        if (caseCount > threshold) {
            // console.log(`Line ${switchNode.startPosition.row}: Complex conditional detected, found ${caseCount} conditional nodes, threshold is ${threshold}`)
            complexConditionals.push([switchNode.startPosition.row, "complex conditional", 'long switch', caseCount, threshold])
        }
    }
    return complexConditionals

}
/** 
 * Recursively search for the target nodes under the given node
 * @param {Object} node - The conditional node to search from
 * @param {Array} targetNodes - Array of target nodes to search for
 * @returns {Number} - Number of target nodes found
 * */
function findTargetNode(node, targetNodes) {
    Visited[node] = true
    var childCount = 0
    if (targetNodes.includes(node.type)) {
        childCount += 1
    }

    // Recursively search the children of the node
    for (let child of node.children) {
        childCount += findTargetNode(child, targetNodes)
    }

    // Return the count of target nodes found under the current node
    return childCount
}

module.exports = { complexConditional }