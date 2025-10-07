# Angular + TypeScript Example

This example demonstrates ESLint configuration for an Angular + TypeScript project.

## Auto-Detection

The config automatically detects:
- ✅ Framework: **Angular** (from `@angular/core` dependency)
- ✅ Environment: **browser** (default for Angular)
- ✅ TypeScript: **Yes** (from `tsconfig.json`)

## Setup

```bash
npm install
npm run lint
```

## Features

- Angular 19 with standalone components
- TypeScript with strict mode
- ESLint with base TypeScript rules
- Zero configuration required

## Angular-Specific Rules

This configuration provides base TypeScript/JavaScript linting. For Angular-specific rules (component decorators, template syntax, etc.), consider using `@angular-eslint`:

```bash
npm install --save-dev @angular-eslint/eslint-plugin @angular-eslint/template-parser
```

See [angular-eslint documentation](https://github.com/angular-eslint/angular-eslint) for Angular-specific configuration.
