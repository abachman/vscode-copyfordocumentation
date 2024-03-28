import * as vscode from "vscode";

type Language = string;
type CodeSnippet = {
  snippet: string;
  language: Language;
  path: string;
  start_line: number;
  end_line: number;
};

export function languageToMarkdownExtension(language: Language): string {
  return (
    {
      javascriptreact: "jsx",
      typescriptreact: "tsx",
      shellscript: "sh",
    }[language] || language
  );
}

export function dedent(snippet: string): string {
  const lines = snippet.split("\n");
  // get the minimal number of leading blank spaces common to each non-blank line in the snippet
  let mindent = Number.MAX_SAFE_INTEGER;
  lines.forEach((line) => {
    if (line.trim() === "") return;
    const indent = line.search(/\S/);
    if (indent < mindent) mindent = indent;
  });

  // remove the common leading blank spaces from each line
  return lines
    .map((line) => (line.trim() === "" ? line : line.slice(mindent)))
    .join("\n");
}

export function formatForDocumentation(snip: CodeSnippet): string {
  return [
    `\`${snip.path}:${snip.start_line}-${snip.end_line}\`:\n`,
    "```" + languageToMarkdownExtension(snip.language),
    dedent(snip.snippet),
    "```",
  ].join("\n");
}

export function getSelectedText(editor: vscode.TextEditor): CodeSnippet {
  const language = editor.document.languageId;
  const snippet = editor.document.getText(editor.selection);
  // get the path of the file being edited relative to the workspace root
  const path = vscode.workspace.asRelativePath(editor.document.fileName);
  const start_line = editor.selection.start.line + 1;
  const end_line = editor.selection.end.line + 1;
  return { snippet, language, path, start_line, end_line };
}
