# Node.js Backend + TypeScript Example

This example demonstrates ESLint configuration for a Node.js backend + TypeScript project.

## Auto-Detection

The config automatically detects:
- ✅ Framework: **node** (from `express` or other backend dependencies)
- ✅ Environment: **node** (server-side environment)
- ✅ TypeScript: **Yes** (from `tsconfig.json`)

## Setup

```bash
npm install
npm run lint
```

## Features

- Node.js with Express framework
- TypeScript with strict mode
- ESLint with Node.js-specific rules
- Console.log allowed (server-side logging is expected)
- Node.js globals (process, Buffer, etc.)
- Zero configuration required

## Node.js Environment

This configuration automatically enables Node.js globals and relaxes certain rules appropriate for server-side code:
- `console` methods are allowed (useful for server logging)
- Node.js built-in modules are recognized
- Process and Buffer globals are available
