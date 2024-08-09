import { type CodeSnippet, type CopyMode, type Language } from "./types";

class SnippetFormatter {
  snip: CodeSnippet;
  mode: CopyMode;

  constructor(snip: CodeSnippet, mode: CopyMode) {
    this.snip = snip;
    this.mode = mode;
  }

  format(): string {
    return [
      this.label(),
      this.openCodeBlock(),
      this.codeBlock(),
      this.closeCodeBlock(),
    ].join("\n");
  }

  label(): string {
    const { snip } = this;
    switch (this.mode) {
      case "html":
      case "rich":
        return `<p><code>${snip.path}:${snip.start_line}-${snip.end_line}</code></p>`;
      default:
        return `\`${snip.path}:${snip.start_line}-${snip.end_line}\`:\n`;
    }
  }

  openCodeBlock(): string {
    switch (this.mode) {
      case "markdown":
        return "```" + this.languageId();
      case "slack":
        return "```";
      case "html":
      case "rich":
        return `<pre><code class="language-${this.languageId()}">`;
      default:
        return "";
    }
  }

  codeBlock(): string {
    return this.dedent(this.snip.snippet);
  }

  closeCodeBlock(): string {
    switch (this.mode) {
      case "html":
      case "rich":
        return "</code></pre>";
      default:
        return "```";
    }
  }

  languageId(): string {
    return this.languageToMarkdownExtension(this.snip.language);
  }

  // https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md
  languageToMarkdownExtension(language: Language): string {
    return (
      {
        javascriptreact: "jsx",
        typescriptreact: "tsx",
        shellscript: "shell",
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
