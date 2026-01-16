# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@c6i`, a React component library built with [dumi](https://d.umijs.org/) (documentation) and [father](https://github.com/umijs/father) (build tool).

## Commands

```bash
pnpm install          # Install dependencies
pnpm start            # Start dev server (docs + demos)
pnpm run build        # Build library to dist/
pnpm run docs:build   # Build docs site to docs-dist/

# Testing
pnpm test                              # Run all tests
pnpm test -- path/to/file.test.ts      # Run single test file
pnpm test -- --watch                   # Watch mode

# Linting
pnpm run lint         # Run both ESLint and Stylelint
pnpm run lint:es      # ESLint only
pnpm run lint:css     # Stylelint only
```

## Architecture

**src/** - Library source organized by type:
- `src/components/` - React components (e.g., `Foo/index.tsx`)
- `src/hooks/` - Custom React hooks (e.g., `use-latest/index.ts`)
- `src/utils/` - Utility functions (e.g., `shallowEqual/index.ts`)
- `src/index.ts` - Public exports

Each module directory contains:
- `index.ts` or `index.tsx` - Implementation
- `index.md` - Documentation with live demos (jsx code blocks)
- `index.test.ts` - Tests (optional)
- `examples/` - Demo components (optional)

**docs/** - Documentation pages (markdown files)

## Adding New Modules

1. Create directory under appropriate category (`src/components/`, `src/hooks/`, or `src/utils/`)
2. Add `index.tsx` (or `index.ts` for non-component code)
3. Add `index.md` with documentation and demos
4. Export from `src/index.ts`

## Code Style

- Prettier: single quotes, trailing commas, 80 char width
- ESLint/Stylelint: extends `@umijs/lint`
- Commits: conventional commits (`@commitlint/config-conventional`)
