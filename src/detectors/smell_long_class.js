const { fetchCode } = require('./code_query')

/**
 * Detector for long class
 * @param {Array} classes - Array of class nodes
 * @param {Number} nol_threshold - Threshold for the max number of lines of the class
 * @param {Number} noc_threshold - Threshold for the max number of sub methods of the class
 * @param {String} lang - Language of the source code
 * @returns {Array} - Array of formatted long class reports
 * */
function longClass(classes, nol_threshold, noc_threshold, lang) {
    var longClassSmells = []

    for (let cls of classes) {
        clsNode = cls.node

        // nol: Number of line
        // noc: number of children (methods)
        // get child method count and number of lines count
        var noc = checkNumberOfChildren(clsNode, lang)
        var nol = checkNumberOfLine(clsNode)
        const startLine = clsNode.startPosition.row

        // check if the class is long or has many child methods
        if (nol > nol_threshold || noc > noc_threshold) {
            // console.log(`Line ${clsNode.startPosition.row}: Class is longer than ${nol_threshold} lines (found ${nol} lines)`)
            // console.log(`Line ${startLine}: Class has more than ${noc_threshold} children (found ${noc} children)`)
            longClassSmells.push([startLine, "long class", nol, nol_threshold, noc, noc_threshold])
        }
    }
    return longClassSmells

}

/**
 * Check the number of lines of the class node
 * @param {Object} clsNode - The class node to check
 * @returns {Number} - Number of lines of the class
 * */
function checkNumberOfLine(clsNode) {
    return clsNode.endPosition.row - clsNode.startPosition.row
}

/**
 * Check the number of children of the class node
 * @param {Object} clsNode: The class node to check
 * @param {String} lang: Language of the source code
 * @returns {Number} - Number of child methods of the class
 */
function checkNumberOfChildren(clsNode, lang) {
    // Doc: currently only support method_definition as children
    const captures = fetchCode(clsNode.text, lang, "method_definition")
    // Get the number of unique child methods
    const noc = new Set(captures.map((x) => x.node.text)).size
    return noc
}

module.exports = { longClass }