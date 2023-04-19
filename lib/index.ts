import { Project, ts, SourceFile, ExportedDeclarations } from 'ts-morph'
import fs from 'fs'
import { markdownTable } from 'markdown-table'
import MarkDownWriter from './markdown/writer';

function parseExportedDeclarations(
  writer: MarkDownWriter,
  exportsModules: ReturnType<SourceFile['getExportedDeclarations']>,
  parentSourceFile: SourceFile,
  parentScope: string | undefined,
  parent: ExportedDeclarations
) {
  const renderWithParentScope = (s: string) => {
    return (parentScope ? parentScope + "." : "") + s
  }

  for (const exportsModule of exportsModules) {
    const [name, declarations] = exportsModule

    declarations.forEach(declaration => {

      if (declaration.isKind(ts.SyntaxKind.SourceFile)) {
      } else if (declaration.isKind(ts.SyntaxKind.ClassDeclaration)) {
        writer.writeH2(`${renderWithParentScope(declaration.getName())} Class`)
        declaration.getJsDocs().forEach(jsd => {
          writer.writeDoubleln(jsd.getDescription())
        })
        // todo
        declaration.getMembers().forEach(member => {
          if(member.isKind(ts.SyntaxKind.MethodDeclaration)) {

          } else if(member.isKind(ts.SyntaxKind.ClassStaticBlockDeclaration)) {

            writer.writeBlodTitle(renderWithParentScope( member.getName()) + " Static")
          } else if(member.isKind(ts.SyntaxKind.Constructor)) {
            writer.writeBlodTitle("Constructor")
          }
          
        })

      } else if (declaration.isKind(ts.SyntaxKind.InterfaceDeclaration)) {
        writer.writeH3(`${renderWithParentScope(declaration.getName())} Interface`)
        writer.writeCode(declaration.getText())
      } else if (declaration.isKind(ts.SyntaxKind.EnumDeclaration)) {
        writer.writeH3(`${renderWithParentScope(declaration.getName())} Enum`)

        const fields = [['Name', 'Description', 'value']]
        declaration.getMembers().forEach(member => {
          member.getName()
          let cols = [member.getName(), '', writer.renderValueCode(member.getValue())]

          fields.push(cols)

          member.getJsDocs().forEach(jd=>{
            cols[1]+= writer.renderTableColumn(jd.getDescription())
          })
        })
        writer.writeBlodTitle("Enum members")
        writer.writeln(markdownTable(fields))

      } else if (declaration.isKind(ts.SyntaxKind.FunctionDeclaration)) {

        // todo
        const overloadDeclarations = declaration.getOverloads();

        const signature = declaration.getSignature();
        const parameters = declaration.getParameters();
        writer.writeH2(`${renderWithParentScope(declaration.getName())}()`)

        declaration.getJsDocs().forEach(jsd => {
          writer.writeDoubleln(jsd.getDescription())
        })

        writer.writeBlodTitle(`Signature`)
        writer.writeCodeStart()
        writer.write(`${declaration.getName()}(`)

        for (let i = 0; i < parameters.length; i++) {
          const parameter = parameters[i];
          if (i > 0) {
            writer.write(', ')
          }

          writer.write(`${parameter.getName()}: ${parameter.getType().getText(parentSourceFile)}`)

        }

        writer.writeln(`): ${signature.getReturnType().getText()}`)
        writer.writeCodeEnd()

        signature.getJsDocTags().forEach(tag => {
          let name = tag.getName()
          if (["param"].includes(name)) return

          writer.writeBlodTitle(name)
          if (name === 'example') {
            writer.writeCodeStart()
          }

          writer.write(tag.getText().map(t => t.text).join("").trim())
          writer.writeln()
          writer.writeln()

          if (name === 'example') {
            writer.writeCodeEnd()
          }
        })

        // parameters table
        const fields: string[][] = [["Name", "Type", "Description"]]

        if (parameters.length) {
          signature.getParameters().forEach(parameter => {
            let paramName = parameter.getName()
            var parameterColnums: string[] = [parameter.getName(), writer.renderTableColumn(declaration.getParameter(paramName).getType().getText(parentSourceFile))]

            fields.push(parameterColnums)
            parameter.getJsDocTags().forEach(jdt => {
              const texts = jdt.getText()
              parameterColnums.push(writer.renderTableColumn(texts[2]?.text || ""))
            })
          })
          writer.writeBlodTitle("Parameters")
          writer.writeln()

          writer.writeln(markdownTable(fields))
          writer.writeln()
        }
        // returns type
        writer.writeBlodTitle("ReturnType")
        writer.writeln(signature.getReturnType().getText())
        writer.writeln()

      } else if (declaration.isKind(ts.SyntaxKind.VariableDeclaration)) {

        writer.writeBlodTitle(declaration.getName())
      } else if (declaration.isKind(ts.SyntaxKind.TypeAliasDeclaration)) {

      } else if (declaration.isKind(ts.SyntaxKind.ModuleDeclaration)) {
        writer.writeH2(`${declaration.getName()} Namespace`)

        declaration.getJsDocs().forEach(jsd => {
          writer.writeln(jsd.getDescription())
        })

        parseExportedDeclarations(
          writer,
          declaration.getExportedDeclarations(),
          parentSourceFile,
          renderWithParentScope(declaration.getName()),
          declaration
          )
      }
    })

  }
}

function createGenerator(options: { path: string }) {
  const project = new Project({});
  const { path } = options

  project.addSourceFilesAtPaths(path)

  const writer = new MarkDownWriter()

  function render(){
    const sourceFiles = project.getSourceFiles();

      for (const sourceFile of sourceFiles) {
        const exportsModules = sourceFile.getExportedDeclarations()

        parseExportedDeclarations(writer,exportsModules, sourceFile, undefined, undefined)
      }

    return writer.toString()
  }
  return {
    generate(desc?: string) {
      fs.writeFileSync(desc || './doc.md', render())
    },
    render
  }
}

export { createGenerator }

export default createGenerator

