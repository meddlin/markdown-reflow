# Markdown Reflow

Manual prose reflow for Markdown and MDX in VS Code.

This extension adds a single command, `Markdown Reflow: Reflow Prose`, that wraps plain prose
paragraphs to a configurable line length. It does not split words and intentionally avoids
rewriting protected Markdown and MDX structures.

## Behavior

- Reflows the current selection when a selection exists and
  `wrap120.selectionOnlyWhenSelected` is enabled.
- Reflows the full document when there is no selection.
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

- `wrap120.maxLineLength`
- `wrap120.languages`
- `wrap120.preserveListItems`
- `wrap120.selectionOnlyWhenSelected`

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
