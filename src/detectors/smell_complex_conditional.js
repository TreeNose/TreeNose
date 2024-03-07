const fs = require('fs');
const Syntaxes = JSON.parse(fs.readFileSync('./configs/smell_categories.json', 'utf8'));
const ifStatement = "if_statement"
const SwitchCase = "switch_case"
const ifClause = "if_clause"
var Visited = {}

function complexConditional(ifs, switches, threshold, lang){
    const langSwitchCase = Syntaxes['grammar'][SwitchCase][lang]
    const langIfClause = Syntaxes['grammar'][ifClause][lang]
    targetNodes = [...langSwitchCase, ...langIfClause]
    // console.log(targetNodes)
    var complexConditionals = []
    for (let ifCapture of ifs){
        var ifNode = ifCapture.node

        if (ifNode in Visited){
            continue
        } 

        // default and else case are not counted, therefore we add 1 to the count
        const ifCount = findTargetNode(ifNode, targetNodes) + 1
        if ( ifCount > threshold){
            // console.log(`Line ${ifNode.startPosition.row}: Complex conditional detected, found ${ifCount} conditional nodes, threshold is ${threshold}`)
            complexConditionals.push([ifNode.startPosition.row, "complex conditional", ifCount, threshold])
        }
    }
    for (let switchCapture of switches){
        var switchNode = switchCapture.node

        const caseCount = findTargetNode(switchNode, targetNodes)
        if (caseCount > threshold){
            // console.log(`Line ${switchNode.startPosition.row}: Complex conditional detected, found ${caseCount} conditional nodes, threshold is ${threshold}`)
            complexConditionals.push([switchNode.startPosition.row, "complex conditional", caseCount, threshold])
        }
    }
    return complexConditionals

}

function findTargetNode(node, targetNodes){
    Visited[node] = true
    var childCount = 0
    if (targetNodes.includes(node.type)){
        childCount += 1
    }
    for (let child of node.children){
        childCount += findTargetNode(child, targetNodes)
    }
    return childCount
}

module.exports = { complexConditional }