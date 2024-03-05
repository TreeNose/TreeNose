function longMethods(methods, threshold){
    var longMethodSmells = []
    for(let mtd of methods){
        var node = mtd.node
        const actual_length = node.endPosition.row - node.startPosition.row
        if(actual_length > threshold){
            longMethodSmells.push([node.startPosition.row, "long method", actual_length, threshold]) 
        }

    }
    return longMethodSmells
}

module.exports = {longMethods}