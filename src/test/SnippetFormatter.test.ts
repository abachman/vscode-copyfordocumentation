import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import { type CodeSnippet } from "../copy_for/types";
import { SnippetFormatter } from "../copy_for/SnippetFormatter";

// with tabs
const snip_1 = `
	def foo():
		return "bar"
`;
const expected_snip_1 = `
def foo():
	return "bar"
`;

const expected_snip_complete = `\`src/test/SnippetFormatter.test.ts:1-3\`:

\`\`\`python

def foo():
	return "bar"

\`\`\``;

describe("SnippetFormatter", () => {
  const snippet: CodeSnippet = {
    snippet: snip_1,
    language: "python",
    path: "src/test/SnippetFormatter.test.ts",
    start_line: 1,
    end_line: 3,
  };

  context("markdown", () => {
    const formatter = new SnippetFormatter(snippet, "markdown");

    it("label is formatted", () => {
      assert.match(
        formatter.label(),
        /`src\/test\/SnippetFormatter\.test\.ts:1-3`:/
      );
    });

    it("openCodeBlock has language", () => {
      assert.equal(formatter.openCodeBlock(), "```python");
    });

    it("codeBlock is dedented", () => {
      assert.strictEqual(formatter.codeBlock(), expected_snip_1);
    });

    it("closeCodeBlock is markdown", () => {
      assert.equal(formatter.closeCodeBlock(), "```");
    });

    it("format is complete", () => {
      assert.equal(formatter.format(), expected_snip_complete);
    });
  });

  context("slack", () => {
    const formatter = new SnippetFormatter(snippet, "slack");

    it("openCodeBlock does not have language", () => {
      assert.equal(formatter.openCodeBlock(), "```");
    });
  });

  context("html", () => {
    const formatter = new SnippetFormatter(snippet, "html");

    it("openCodeBlock has HTML", () => {
      assert.equal(
        formatter.openCodeBlock(),
        '<pre><code class="language-python">'
      );
    });
  });
});
