export function escapeTableSpliter(s: string): string {
  return s.replaceAll(/\|/g, "\\|")
}
export function escapeNewLine(s: string): string {
  return s.replaceAll(/\n|\r/g, "<br>")
}