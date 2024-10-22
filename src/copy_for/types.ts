export type CopyMode = "markdown" | "slack" | "html";
export type Language = string;
export type CodeSnippet = {
  snippet: string;
  language: Language;
  path: string;
  start_line: number;
  end_line: number;
};
