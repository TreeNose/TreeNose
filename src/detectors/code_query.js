const Parser = require('tree-sitter');
const parser = new Parser();
const fs = require('fs');
const Syntaxes = JSON.parse(fs.readFileSync('./configs/smell_categories.json', 'utf8'));

/**
 * Fetch the code snippet that matches the smell
 * @param {string} sourceCode: The source code to search through
 * @param {string} lang: The language of the source code
 * @param {string} smell: The smell to search for
 * @returns {Array} The code snippets that match the smell
 */
function fetchCode (sourceCode, lang, smell) {
    var matches = []

    // Set the tree-sitter parser to the target language
    const targetLang = require(`tree-sitter-${lang}`);
    parser.setLanguage(targetLang);
    const tree = parser.parse(sourceCode);

    // Get the language specific smells from the smell json with the generalized smell
    const syntax_specific_smells = Syntaxes["grammar"][smell][lang]

    // Query the tree for the syntax specific smells
    for (let s of syntax_specific_smells){
        const query = new Parser.Query(targetLang,`(${s}) @${smell}`);

        captures = query.matches(tree.rootNode).map((x)=>x.captures)
        matches.push(captures.flat())
    }

    // Return the matched code snippets
    // one code snippet is a tree starting from the root node
    return matches.flat(Infinity)
}

module.exports = { fetchCode }