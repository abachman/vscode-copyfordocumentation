import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import * as format from "../format_clipboard";

const { dedent } = format;

const snip_1 = `
	def foo():
		return "bar"
`;
const expected_snip_1 = `
def foo():
	return "bar"
`;

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("dedent", () => {
    assert.strictEqual(dedent(snip_1), expected_snip_1);
  });

  test("Sample test", () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });
});
