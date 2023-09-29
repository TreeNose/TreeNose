const fs = require('fs/promises');
const Parser = require('tree-sitter');
const JavaScript = require('tree-sitter-javascript');
const parser = new Parser();
parser.setLanguage(JavaScript);


async function example() {
    try { 
        const sourceCode = await fs.readFile('parsee_single_class.js', { encoding: 'utf8' });
        const tree = parser.parse(sourceCode);
        // recursivelyLog(tree.rootNode)
        const query = new Parser.Query(JavaScript,'(call_expression) @call')
        const matches= query.matches(tree.rootNode)
        for (let match of matches) {
          const captures = match.captures
          for (let capture of captures) {
                console.log(capture)
          }
        }
    } catch (err) {
      console.log(err);
    }}
function recursivelyLog(tree_node,indent_count = 0){
    var indentation = '\t'
    for (var i = 0; i < tree_node.childCount; i++){
        var child_node = tree_node.child(i)
        console.log(indentation.repeat(indent_count) + tree_node.type + '(' + tree_node.startPosition.row + ',' + tree_node.startPosition.column + ') , (' + tree_node.endPosition.row + ',' + tree_node.endPosition.column +  ')')
        recursivelyLog(child_node,indent_count + 1)
    }
}

example()

