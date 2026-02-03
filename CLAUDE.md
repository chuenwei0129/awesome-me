# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is `gakki`, a React 18 component library built with TypeScript. It uses dumi for documentation and father for building.

## Development Commands

### Setup
```bash
pnpm install
```

### Development
```bash
# Start dev server with hot reload
pnpm dev
# or
pnpm start

# Build library for production
pnpm build

# Build in watch mode
pnpm build:watch
```

### Documentation
```bash
# Build docs
pnpm docs:build

# Preview built docs
pnpm docs:preview
```

### Code Quality
```bash
# Run all linting
pnpm lint

# ESLint only
pnpm lint:es

# Stylelint only
pnpm lint:css

# Check project for issues
pnpm doctor
```

## Component Development Workflow

Components are organized in `src/` with each component in its own directory:

```
src/
├── Foo/
│   ├── index.tsx    # Component implementation
│   └── index.md     # Component documentation (dumi)
└── index.ts         # Library entry point
```

### Creating a New Component

1. Create a new directory under `src/ComponentName/`
2. Create `index.tsx` with the React component
3. Create `index.md` with documentation and demos
4. Export the component from `src/index.ts`

### Component Template

```tsx
import React, { type FC } from 'react';

export interface ComponentProps {
  /** Description of prop */
  propName: string;
}

const Component: FC<ComponentProps> = (props) => {
  return <div>{props.propName}</div>;
};

export default Component;
```

## Architecture Notes

### Build System
- **father**: Builds the library, outputs ESM to `dist/`
- **dumi**: Dev server and documentation site generator
- **TypeScript**: Strict mode enabled, generates declaration files

### Path Aliases
- `gakki/*` maps to `src/*` (configured in tsconfig.json)

### Code Quality Tools
- **ESLint**: @umijs/lint configuration
- **Stylelint**: For CSS/Less files
- **Prettier**: With import organizing and package.json sorting
- **Husky**: Git hooks for pre-commit linting
- **Commitlint**: Conventional commit format enforcement

### Publishing
- `prepublishOnly` runs doctor and build before publishing
- Only `dist/` is published to npm (configured in `files`)
