// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import { formatForDocumentation, getSelectedText } from "./format_clipboard";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('"copyfordocumentation" is active', Date.now());

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "copyfordocumentation.copy",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (typeof editor === "undefined") return;

      // Format the selected text for documentation
      const snippet = getSelectedText(editor);
      const formatted = formatForDocumentation(snippet);

      console.log("formatted:", JSON.stringify(formatted));

      // Put formatted text on clipboard
      vscode.env.clipboard.writeText(formatted);

      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage(
        `${snippet.language} snippet copied to clipboard.`
      );
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
