
import * as vscode from 'vscode';
const Parser = require("web-tree-sitter");

async function loadLanguage(lang){
  await Parser.init();
  var grammer =  await Parser.Language.load(`/Users/yanqiaochen/cs/comp/YanqiaoChen/map/tree-sitter-${lang}.wasm`);
  var parser = new Parser();
  parser.setLanguage(grammer);
  return parser
};
export async function activate(context: vscode.ExtensionContext) {
    let currentPythonCheck = vscode.commands.registerCommand('map.parsePython',async ()=>
    {
      const currentFile = vscode.window.activeTextEditor?.document;
      if ( typeof currentFile !== "undefined"){
        var fileText = currentFile.getText();
        // return 'hello-world'
        var localParser = loadLanguage("python")
        const tree = (await localParser).parse(fileText);
        console.log(tree.rootNode.toString());

      }
    });
    context.subscriptions.push(currentPythonCheck);

    let currentJSCheck = vscode.commands.registerCommand('map.parseJS',async ()=>
    {
      const currentFile = vscode.window.activeTextEditor?.document;
      if ( typeof currentFile !== "undefined"){
        var fileText = currentFile.getText();
        // return 'hello-world'
        var localParser = loadLanguage("javascript")
        const tree = (await localParser).parse(fileText);
        console.log(tree.rootNode.toString());

      }
    });
    context.subscriptions.push(currentJSCheck);
}