const TreeParser = require('tree-sitter')
const JavaScript = require('tree-sitter-javascript');
const Python = require('tree-sitter-python')




function parseJs(sourceCode){
    const parser = new Parser();
    parser.setLanguage(JavaScript);
    const tree = parser.parse(sourceCode);
    const treeStructureMap = recursivelyLog(tree.rootNode)
    return treeStructureMap
}


function recursivelyLog(tree_node,indent_count = 0){
    var indentation = '\t'
    var codeStructures = [];
    for (var i = 0; i < tree_node.childCount; i++){
        var child_node = tree_node.child(i)
        codeStructures.push(indentation.repeat(indent_count) + child_node.type + '(' + child_node.startPosition.row + ',' + child_node.startPosition.column + ') , (' + child_node.endPosition.row + ',' + child_node.endPosition.column +  ')' +'\n')
        // console.log(indentation.repeat(indent_count) + child_node.type + '(' + child_node.startPosition.row + ',' + child_node.startPosition.column + ') , (' + child_node.endPosition.row + ',' + child_node.endPosition.column +  ')')
        codeStructures.push(...recursivelyLog(child_node,indent_count + 1))
    }
    return codeStructures
}

module.exports(
    {
        parseJs
    }
)