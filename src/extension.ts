import * as vscode from 'vscode'

import { reflowMarkdownLike, type LineRange, type ReflowOptions } from './reflow'

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('wrap120.reflow', async () => {
    let editor = vscode.window.activeTextEditor

    if (!editor) {
      return
    }

    let configuration = vscode.workspace.getConfiguration('wrap120', editor.document)
    let enabledLanguages = configuration.get<string[]>('languages', ['markdown', 'mdx'])

    if (!enabledLanguages.includes(editor.document.languageId)) {
      void vscode.window.showInformationMessage(
        `Wrap 120 is disabled for language "${editor.document.languageId}".`,
      )
      return
    }

    let options: ReflowOptions = {
      maxLineLength: configuration.get<number>('maxLineLength', 120),
      preserveListItems: configuration.get<boolean>('preserveListItems', true),
    }

    let selectionOnlyWhenSelected = configuration.get<boolean>(
      'selectionOnlyWhenSelected',
      true,
    )
    let selectionRange = selectionOnlyWhenSelected
      ? getSelectionLineRange(editor.selection)
      : undefined

    let originalText = editor.document.getText()
    let nextText = reflowMarkdownLike(originalText, options, selectionRange)

    if (nextText === originalText) {
      return
    }

    let fullRange = new vscode.Range(
      editor.document.positionAt(0),
      editor.document.positionAt(originalText.length),
    )

    await editor.edit((editBuilder) => {
      editBuilder.replace(fullRange, nextText)
    })
  })

  context.subscriptions.push(disposable)
}

export function deactivate() {
  return undefined
}

function getSelectionLineRange(selection: vscode.Selection): LineRange | undefined {
  if (selection.isEmpty) {
    return undefined
  }

  let startLine = Math.min(selection.start.line, selection.end.line)
  let endLine = Math.max(selection.start.line, selection.end.line)

  if (selection.end.character === 0 && endLine > startLine) {
    endLine -= 1
  }

  return {
    startLine,
    endLine,
  }
}
