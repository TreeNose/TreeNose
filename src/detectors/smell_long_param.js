const fs = require('fs');
const Syntaxes = JSON.parse(fs.readFileSync('./configs/smell_categories.json', 'utf8'));

/**
 * Detector for long parameters
 * @param {Array} methods - Array of method nodes
 * @param {Number} threshold - Threshold for the max number of parameters of the method
 * @param {String} lang - Language of the source code
 * @returns {Array} - Array of formatted long parameters reports
 * */
function longParameters(methods, threshold, lang) {
    var longParamsSmells = []

    // get language specific nodes for the parameters
    const paramsSyntaxes = Syntaxes["node"]["parameters"][lang]

    for (let mtd of methods) {
        // get the parameters list node of the method
        var paramsNode = findParametersFromMethod(mtd.node, paramsSyntaxes)

        // compare with threshold and report if it's too long
        if (paramsNode && paramsNode.namedChildCount > threshold) {
            // console.log(`Line ${mtd.node.startPosition.row}: Method has more than ${threshold} parameters (found ${paramsNode.namedChildCount} parameters)`)
            longParamsSmells.push([mtd.node.startPosition.row, "long parameters", paramsNode.namedChildCount, threshold])
        }
    }
    return longParamsSmells
}

/**
 * Find the parameters list node from the method node
 * @param {Object} methodNode - The method node to search from
 * @param {Array} ParamsSyntaxes - Array of syntaxes for the parameters
 * @returns {Object} - The parameter list node
 * */
function findParametersFromMethod(methodNode, ParamsSyntaxes) {
    for (let subNode of methodNode.namedChildren) {
        if (ParamsSyntaxes.includes(subNode.type)) {
            return subNode
        }
    }
    return null
}
module.exports = { longParameters }