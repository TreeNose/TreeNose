const Parser = require('tree-sitter');
const parser = new Parser();
const fs = require('fs');
const Syntaxes = JSON.parse(fs.readFileSync('./configs/univseral_configs.json', 'utf8'));

function fetchCode (sourceCode, lang, smell) {
    var matches = []
    const targetLang = require(`tree-sitter-${lang}`);
    parser.setLanguage(targetLang);
    const tree = parser.parse(sourceCode);
    // Get the language specific smells from the smell json with the generalized smell
    const syntax_specific_smells = Syntaxes[smell][lang]

    for (let s of syntax_specific_smells){
        const query = new Parser.Query(targetLang,`(${s}) @${smell}`);

        // math: {pattern, captures: }
        captures = query.matches(tree.rootNode).map((x)=>x.captures)
        matches.push(captures.flat())
    }

    return matches.flat(Infinity)
}

module.exports = { fetchCode }