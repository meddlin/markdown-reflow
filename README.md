# Markdown Reflow <img width="256" height="256" alt="Markdown reflow extension logo design" src="https://github.com/user-attachments/assets/73a67431-92f4-4d5d-afda-ecd915f90240" />


Manual prose reflow for Markdown and MDX in VS Code.

This extension adds a single command, `Markdown Reflow: Reflow Prose`, that wraps plain prose
paragraphs to a configurable line length. It does not split words and intentionally avoids
rewriting protected Markdown and MDX structures.

## Behavior

- Reflows the current selection when a selection exists and
  `markdownReflow.selectionOnlyWhenSelected` is enabled.
- Reflows the full document when there is no selection.
- Wraps prose to `100` columns by default, or to the user-defined
  `markdownReflow.maxLineLength` value when set.
- Leaves these regions unchanged:
  - fenced code blocks
  - indented code blocks
  - ATX headings
  - blockquotes
  - tables
  - list items and list continuation blocks
  - frontmatter blocks
  - MDX import/export lines and export object blocks
  - JSX/HTML blocks

## Settings

- `markdownReflow.maxLineLength`
- `markdownReflow.languages`
- `markdownReflow.preserveListItems`
- `markdownReflow.selectionOnlyWhenSelected`

## Development

```bash
npm install
npm run build
npm test
```

To package the extension:

```bash
npm run package
```

Before publishing to the VS Code Marketplace, set final values for `publisher`, `repository`,
`homepage`, and `bugs` in `package.json`.
