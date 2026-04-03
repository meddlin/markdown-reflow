# Publishing Guide

## Local Packaging

From this repository:

```bash
npm install
npm run build
npm test
npx @vscode/vsce package
```

Install the resulting `.vsix` with:

```bash
code --install-extension ./markdown-reflow-<ver>.vsix
```

## Marketplace Prerequisites

Before the first publish:

1. Create or choose an Azure DevOps organization.
2. Create a Personal Access Token with Marketplace `Manage` scope.
3. Create a Marketplace publisher.
4. Set final `publisher`, `repository`, `homepage`, and `bugs` fields in `package.json`.
5. Run `npx @vscode/vsce login <publisher-id>`.

## Manual Publish

Run:

```bash
npx @vscode/vsce package
npx @vscode/vsce publish
```

Or upload the generated `.vsix` manually in the Marketplace publisher portal.
