import * as vscode from "vscode";

import { type CodeSnippet } from "./types";

class Selector {
  editor: vscode.TextEditor;
  constructor(editor: vscode.TextEditor) {
    this.editor = editor;
  }

  select(): CodeSnippet {
    const { editor } = this;
    const language = editor.document.languageId;
    const snippet = editor.document.getText(editor.selection);
    // get the path of the file being edited relative to the workspace root
    const path = vscode.workspace.asRelativePath(editor.document.fileName);
    const start_line = editor.selection.start.line + 1;
    const end_line = editor.selection.end.line + 1;
    return { snippet, language, path, start_line, end_line };
  }
}

export { Selector };
