import { stringifyValue } from '../utils';
import { escapeNewLine, escapeTableSpliter } from './escape'

export default class MarkDownWriter {
  private __strings: string[] = [];
  private __length: number

  public write(s: string): number {
    this.__strings.push(s)
    this.__length += s.length
    return this.__length
  }
  public writeln(s = ""): number {
    return this.write(s + '\n')
  }
  public writeBlod(s: string): number {
    return this.write(`**${s}**`)
  }
  public writeBlodTitle(s: string): number {
    return this.write(`**${s}**\n\n`)
  }
  public writeCode(s: string): number {
    return this.write("```ts\n"+ s.trim() + "\n```\n")
  }
  public writeCodeStart(): number {
    return this.write("```ts\n")
  }
  public writeCodeEnd(): number {
    return this.write("```\n")
  }
  public writeH1(s: string): number {
    return this.write(`# ${s}\n\n`)
  }
  public writeH2(s: string): number {
    return this.write(`## ${s}\n\n`)
  }
  public writeH3(s: string): number {
    return this.write(`### ${s}\n\n`)
  }
  public writeH4(s: string): number {
    return this.write(`#### ${s}\n\n`)
  }
  public writeDoubleln(s = ""): number {
    return this.write(s + '\n\n')
  }
  public renderTableColumn(s: string): string {
    return escapeNewLine(escapeTableSpliter(s.trim()))
  }
  public renderValueCode(s: string | number): string{
    return "\`" + stringifyValue(s) + "\`"
  }
  public toString(): string {
    return this.__strings.join("")
  }
}
