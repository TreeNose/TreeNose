// Description: This file print the tree of the parsed file
const fs = require('fs/promises');

// CLI ex: node src/tree_printer.js --file=src/test.js --lang=javascript
const args = require('yargs').argv
const parsee_file = args.file
const lang = args.lang

// Load the tree-sitter parser for the language
const Parser = require('tree-sitter');
const TargetLang = require(`tree-sitter-${lang}`);
const parser = new Parser();
parser.setLanguage(TargetLang);

async function printTree() {
    try {
        // Read the source code from the file and get the syntax tree
        const sourceCode = await fs.readFile(parsee_file, { encoding: 'utf8' });
        const tree = parser.parse(sourceCode);

        // Get string representation of the tree
        const a = recursivelyLog(tree.rootNode)
        console.log(a.join())
    } catch (err) {
      console.log(err);
    }}

// Recursively log the tree
function recursivelyLog(tree_node,indent_count = 0){
    var indentation = '\t'
    var codeStructures = [];

    // Iterate over the children of current node
    for (var i = 0; i < tree_node.childCount; i++){

        // get the child node
        var child_node = tree_node.child(i)

        // push the child node to the codeStructures array with indentation
        // indentation represents the depth of the node in the tree
        codeStructures.push(indentation.repeat(indent_count) + child_node.type + '(' + child_node.startPosition.row + ',' + child_node.startPosition.column + ') , (' + child_node.endPosition.row + ',' + child_node.endPosition.column +  ')' +'\n')
        // console.log(indentation.repeat(indent_count) + child_node.type + '(' + child_node.startPosition.row + ',' + child_node.startPosition.column + ') , (' + child_node.endPosition.row + ',' + child_node.endPosition.column +  ')')

        // recursively traverse the child node
        codeStructures.push(...recursivelyLog(child_node,indent_count + 1))
    }
    return codeStructures
  }

printTree()

