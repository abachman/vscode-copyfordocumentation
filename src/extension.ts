// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import { Copier } from "./copy_for/Copier";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('"copyfordocumentation" is active', Date.now());

  // The commands have been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "copyfordocumentation.copy",
      new Copier().copy("markdown")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "copyfordocumentation.copySlack",
      new Copier().copy("slack")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "copyfordocumentation.copyRich",
      new Copier().copy("rich")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "copyfordocumentation.copyHtml",
      new Copier().copy("html")
    )
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
