# Changelog

## 0.2.1

- Breaking: renamed the command from `wrap120.reflow` to `markdownReflow.reflow`.
- Breaking: renamed configuration keys from `wrap120.*` to `markdownReflow.*`.
- Changed the default prose wrap width from `120` to `100`.

## 0.1.0

- Initial command-driven Markdown/MDX prose reflow extension.
- Added `wrap120.reflow` with selection-aware paragraph wrapping.
- Preserved code fences, headings, blockquotes, tables, lists, frontmatter, MDX export blocks, and
  JSX/HTML blocks.
