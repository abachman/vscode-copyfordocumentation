import { type CodeSnippet, type CopyMode, type Language } from "./types";

class SnippetFormatter {
  snip: CodeSnippet;
  mode: CopyMode;

  constructor(snip: CodeSnippet, mode: CopyMode) {
    this.snip = snip;
    this.mode = mode;
  }

  format(): string {
    return [this.label(), this.openCodeBlock(), this.codeBlock(), "```"].join(
      "\n"
    );
  }

  label(): string {
    const { snip } = this;
    return `\`${snip.path}:${snip.start_line}-${snip.end_line}\`:\n`;
  }

  openCodeBlock(): string {
    return "```" + this.languageToMarkdownExtension(this.snip.language);
  }

  codeBlock(): string {
    return this.dedent(this.snip.snippet);
  }

  languageToMarkdownExtension(language: Language): string {
    return (
      {
        javascriptreact: "jsx",
        typescriptreact: "tsx",
        shellscript: "sh",
      }[language] || language
    );
  }

  dedent(code: string): string {
    const lines = code.split("\n");
    // get the minimal number of leading blank spaces common to each non-blank line in the snippet
    let mindent = Number.MAX_SAFE_INTEGER;
    lines.forEach((line) => {
      if (line.trim() === "") {
        return;
      }
      const indent = line.search(/\S/);
      if (indent < mindent) {
        mindent = indent;
      }
    });

    // remove the common leading blank spaces from each line
    return lines
      .map((line) => (line.trim() === "" ? line : line.slice(mindent)))
      .join("\n");
  }
}

export { SnippetFormatter };
