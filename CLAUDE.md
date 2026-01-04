# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@c6i`, a React component library built with [dumi](https://d.umijs.org/) (documentation) and [father](https://github.com/umijs/father) (build tool).

## Commands

```bash
# Install dependencies
pnpm install

# Start development server (docs + component demo)
pnpm start

# Build component library to dist/
pnpm run build

# Build library in watch mode
pnpm run build:watch

# Build documentation site to docs-dist/
pnpm run docs:build

# Preview production docs build
pnpm run docs:preview

# Check project for potential problems
pnpm run doctor

# Run linting
pnpm run lint          # Run both ESLint and Stylelint
pnpm run lint:es       # ESLint only
pnpm run lint:css      # Stylelint only
```

## Architecture

- **src/**: React components library source
  - Each component has its own directory (e.g., `src/Foo/`)
  - Component directories contain `index.tsx` (component) and `index.md` (documentation with live demos)
  - `src/index.ts` exports all public components

- **docs/**: Documentation pages (markdown files)
  - `docs/index.md` - Homepage
  - Additional guides/pages as `.md` files

- **Build outputs**:
  - `dist/` - Built component library (ESM format)
  - `docs-dist/` - Built documentation site

## Code Style

- Prettier: single quotes, trailing commas, 80 char width
- ESLint: extends `@umijs/lint`
- Stylelint: extends `@umijs/lint`
- Commits: follows conventional commits (`@commitlint/config-conventional`)

## Adding Components

1. Create `src/ComponentName/index.tsx` with the component
2. Create `src/ComponentName/index.md` with documentation and demos (use jsx code blocks for live demos)
3. Export from `src/index.ts`
