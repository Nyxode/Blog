import markdownToHtml from "zenn-markdown-html";

export default function convertMarkdown(content: string) {
  return markdownToHtml(content);
}
