/**
 * Detector for long method
 * @param {Array} methods - Array of method nodes
 * @param {Number} threshold - Threshold for the max number of lines of the method
 * @returns {Array} - Array of formatted long method reports
 * */
function longMethods(methods, threshold){
    var longMethodSmells = []
    for(let mtd of methods){
        // get the length of the method
        var node = mtd.node
        const actual_length = node.endPosition.row - node.startPosition.row

        // compare with threshold and report if it's too long
        if(actual_length > threshold){
            longMethodSmells.push([node.startPosition.row, "long method", actual_length, threshold]) 
        }

    }
    return longMethodSmells
}

module.exports = {longMethods}