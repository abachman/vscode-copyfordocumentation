// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import { type CopyMode } from "./types";
import { Selector } from "./Selector";
import { SnippetFormatter } from "./SnippetFormatter";

class Copier {
  copy(mode: CopyMode): () => void {
    return () => {
      const editor = vscode.window.activeTextEditor;
      if (typeof editor === "undefined") {
        return () => {};
      }

      // Format the selected text for documentation
      const snippet = new Selector(editor).select();
      const formatter = new SnippetFormatter(snippet, mode);
      const formatted = formatter.format();

      console.log("formatted:", JSON.stringify(formatted));

      // Put formatted text on clipboard
      vscode.env.clipboard.writeText(formatted);

      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage(
        `${snippet.language} snippet copied to clipboard.`
      );
    };
  }
}

export { Copier };
