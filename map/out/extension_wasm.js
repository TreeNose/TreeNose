"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const web_tree_sitter_1 = require("web-tree-sitter");
async () => { await web_tree_sitter_1.default.init(); };
const Python = async () => { await web_tree_sitter_1.default.Language.load("./tree-sitter-python.wasm"); };
const parser = new web_tree_sitter_1.default();
parser.setLanguage(Python);
function activate(context) {
    let currentFileCheck = vscode.commands.registerCommand('map.parseCurrentWindow', () => {
        const currentFile = vscode.window.activeTextEditor?.document;
        if (typeof currentFile !== "undefined") {
            vscode.window.showInformationMessage(currentFile.fileName);
            vscode.window.showInformationMessage(currentFile.languageId);
            var fileText = currentFile.getText();
            // return 'hello-world'
            const tree = parser.parse(fileText);
            console.log(tree.rootNode);
        }
    });
    context.subscriptions.push(currentFileCheck);
}
exports.activate = activate;
//# sourceMappingURL=extension_wasm.js.map