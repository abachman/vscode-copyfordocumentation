import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import { type CodeSnippet } from "../copy_for/types";
import { SnippetFormatter } from "../copy_for/SnippetFormatter";

const snip_1 = `
	def foo():
		return "bar"
`;
const expected_snip_1 = `
def foo():
	return "bar"
`;

suite("Extension Test Suite", () => {
  const snippet: CodeSnippet = {
    snippet: snip_1,
    language: "python",
    path: "src/test/SnippetFormatter.test.ts",
    start_line: 1,
    end_line: 3,
  };

  vscode.window.showInformationMessage("Start all tests.");

  describe("markdown", () => {
    const formatter = new SnippetFormatter(snippet, "markdown");

    test("codeBlock is dedented", () => {
      assert.strictEqual(formatter.codeBlock(), expected_snip_1);
    });

    test("label has language", () => {
      assert.ok(formatter.label().includes("python"));
    });
  });
});
