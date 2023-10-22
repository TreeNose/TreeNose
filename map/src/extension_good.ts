
// import * as vscode from 'vscode';

// export function activate(context: vscode.ExtensionContext) {
//     let currentFileCheck = vscode.commands.registerCommand('map.parseCurrentWindow',()=>
//     {
//       const currentFile = vscode.window.activeTextEditor?.document;
//       if ( typeof currentFile !== "undefined"){
        
//         vscode.window.showInformationMessage(currentFile.fileName);
//         vscode.window.showInformationMessage(currentFile.languageId);
//         var fileText = currentFile.getText();
//         const JavaScript =  require('tree-sitter-javascript'); 
//         const TreeSitter =  require('tree-sitter');
//         const parser = new TreeSitter();
//         parser.setLanguage(JavaScript);
//         // return 'hello-world'
//         const tree = parser.parse(fileText);
//         console.log(tree.rootNode)
//       }
//     });
//     context.subscriptions.push(currentFileCheck);
    
// }