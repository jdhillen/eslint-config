# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Repository Overview

**@jdhillen/eslint-config** is a universal ESLint configuration package for modern JavaScript/TypeScript projects. It supports React, Vue.js 3, Svelte, Vanilla JS/TS, and Node.js with automatic framework detection and zero configuration required. Built on ESLint v9's modern flat config format with industry best practices.

### Project Statistics
- Primary language: JavaScript (ES Modules)
- ECMAScript version: 2025 (ES2025)
- Node.js requirement: >=22.12.0 (Node.js 22 LTS "Jod")
- Lines of code: ~1,500+ (modular preset architecture)
- Active since: March 7, 2025
- Current version: 3.1.0 (Phase 2 in progress)
- Main maintainer: J.D. Hillen
- Repository: https://github.com/jdhillen/eslint-config
- Published package: @jdhillen/eslint-config

### Key Characteristics
- **Universal Framework Support** - React, Vue.js, Svelte, Vanilla JS/TS, Node.js (Phase 2 in progress)
- **Auto-Detection** - Automatically detects framework, environment, and TypeScript from project
- **Zero Configuration** - Works out of the box with sensible defaults
- **Modular Architecture** - Preset-based system for maintainability
- **ESLint 9+ flat config** only (breaking from legacy .eslintrc format)
- **All plugins bundled** as direct dependencies (eliminates peer dependency conflicts)
- **TypeScript optional** - Works with or without TypeScript
- **Deliberately excludes Prettier** (removed after v2.0.0 - see [Hidden Context](#hidden-context))
- **Official presets** (typescript-eslint, vue, react, svelte) instead of manual rule copying
- **Comprehensive rules** - 115+ organized rules optimized for each framework
- **Automated CLI setup** tool
- **Semantic versioning** with automated release pipeline
- **Requires Node.js >=22.12.0** (Node.js 22 LTS "Jod")
- **ECMAScript 2025** (ES2025) with latest language features

### Recent Major Changes

**Phase 2: Svelte Support (v3.1.0) - In Progress:**

**Svelte Framework Added:**
- `eslint-plugin-svelte@^3.12.4` - Component and template rules
- `svelte-eslint-parser@^1.3.3` - Parser for .svelte files
- Comprehensive 27-rule preset organized by category
- Svelte 5 runes mode support ($state, $derived, etc.)
- Auto-detection from `svelte` and `@sveltejs/kit` dependencies

**Svelte Rules Breakdown (27 rules):**
- **Core Best Practices (9 rules)** - No `@html`, reactive store access, optimized styles
- **Accessibility (8 rules)** - ARIA attributes, keyboard navigation, semantic HTML
- **Svelte 5 Runes (4 rules)** - Block lang enforcement, no direct DOM manipulation
- **Code Style (6 rules)** - Shorthand attributes/directives, consistent quotes and indentation

**Integration Updates:**
- Added Svelte to framework switch in `src/index.js`
- Added `.svelte` extension to all file pattern matchers
- Updated detection logic for SvelteKit meta-framework
- Extended TypeScript preset to cover `.svelte` files
- Package metadata updated with Svelte keywords and description

**Documentation:**
- Added Svelte section to README with comprehensive examples
- Updated framework detection table with Svelte/SvelteKit
- Added Svelte rules section with good/bad examples
- Updated rule count from 88 to 115 rules
- Updated comparison tables to mention Svelte support

**Setup Tool Improvements:**
- Updated generated config template with modern 3-option approach
- Added auto-detection preview showing detected framework and TypeScript
- Improved comments and documentation in generated `eslint.config.js`
- Added all framework options (react, vue, svelte) to inline examples
- Better guidance for zero-config vs explicit configuration vs custom overrides

**Phase 1: Universal Framework Support (v3.0.0) - Complete:**

**Architecture Transformation:**
- Complete refactor from Vue-only to universal multi-framework support
- New modular preset-based architecture with file structure:
  ```
  src/
  ├── index.js                 # Main factory function with auto-detection
  ├── detectors.js             # Framework/environment/TypeScript detection
  ├── utils/package-reader.js  # Package.json utilities
  ├── presets/
  │   ├── base.js             # Framework-agnostic JavaScript rules
  │   ├── typescript.js       # TypeScript-specific rules
  │   ├── imports.js          # Import/export rules
  │   ├── environments/       # Browser, Node, Universal
  │   └── frameworks/         # React, Vue, Svelte, Vanilla
  ```

**React Support Added:**
- `eslint-plugin-react@^7.37.0` - JSX and component rules
- `eslint-plugin-react-hooks@^5.1.0` - Hooks validation
- Conservative 15-rule preset (essential only, not comprehensive)
- React 17+ new JSX transform support (no React import needed)
- Auto-detection from `react`, `next`, `remix`, `gatsby` dependencies

**Auto-Detection System:**
- Detects 8+ frameworks: React, Vue, Angular, Svelte, Solid, Astro, Node.js, Vanilla
- Detects meta-frameworks: Next.js → React, Nuxt → Vue, SvelteKit → Svelte, etc.
- Detects environment: browser, node, or universal (Electron, fullstack apps)
- Detects TypeScript: checks for `tsconfig.json` existence
- Transparent logging: shows what was detected on each run

**TypeScript Made Optional:**
- Added `peerDependenciesMeta` to make TypeScript optional peer dependency
- Config works perfectly with JavaScript-only projects
- TS rules only loaded when TypeScript detected or explicitly enabled

**New Factory Function API:**
```javascript
createConfig({
  framework: 'auto',    // 'auto' | 'react' | 'vue' | 'svelte' | 'vanilla' | 'node'
  environment: 'auto',  // 'auto' | 'browser' | 'node' | 'universal'
  typescript: 'auto',   // 'auto' | true | false
  ignorePaths: [],      // Additional paths to ignore
  rules: {}             // Rule overrides
})
```

**Backward Compatibility:**
- Auto-detection defaults maintain existing behavior for Vue users
- `createConfig()` with no options still works (uses auto-detection)
- No breaking changes for existing consumers

**Package Metadata:**
- Description updated: "Universal ESLint configuration for React, Vue.js, Svelte, and TypeScript projects with auto-detection"
- Keywords added: react, svelte, javascript, auto-detect, universal

**Previous Refactoring - Commit 671d2ea:**
- Migrated from manual rule copying to official presets
- Added `@eslint/compat` for plugin compatibility
- Expanded from 16 to 88 rules across 6 organized categories
- Removed incorrect `--config` flags from setup tool (ESLint 9 auto-discovers config)
- Complete README rewrite for beginners
- Updated all dependencies to latest versions (ESLint 9.37, typescript-eslint 8.46)
- Added `globals@16.4.0` and `typescript-eslint` unified package
- Reorganized package.json for better logical grouping
- Cleaned up temporary documentation files

**Setup Tool Improvements:**
- Generated lint commands now use ESLint 9 auto-discovery (no explicit --config flag)
- Added commented example override pattern in generated config
- Consistent with README documentation

**Documentation:**
- README completely rewritten for users with no ESLint knowledge
- Added visual code examples (Good vs Bad) for all rule categories
- Comprehensive FAQ and troubleshooting sections
- CLAUDE.md kept for AI assistant context

## Quick Start

### Prerequisites
- Node.js >= 20.0.0
- npm (or pnpm/yarn)
- Git

### Development Setup

```bash
# Clone repository
git clone https://github.com/jdhillen/eslint-config.git
cd eslint-config

# Install dependencies
npm install

# Verify setup
npm run lint
```

The repository uses its own ESLint configuration for linting (dogfooding pattern).

## Essential Commands

### Development
```bash
# Lint all files
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Run tests (currently no-op)
npm test

# Install git hooks (husky)
npm run prepare
```

### Git & Release
```bash
# Interactive commit (enforces conventional commits)
npm run commit

# Manual release (normally automated via CI)
npm run release
```

### Testing the Package Locally
```bash
# Link package to test in other projects
npm link

# In consuming project
npm link @jdhillen/eslint-config
```

## Architecture and Key Concepts

### System Architecture

This is a configuration package, not an application. The architecture is simple:

```
Consumer Project → Import Config → ESLint Engine → Applies Rules
```

The package exports a **factory function** that generates ESLint flat config arrays.

### 1. Factory Function Pattern

The main export at [src/index.js](src/index.js) is a function, not a static configuration:

```javascript
export default function createConfig(options = {}) {
  const { ignorePaths = [] } = options;
  // Returns array of ESLint config objects
  return [ /* config array */ ];
}
```

**Why a factory?**
- Allows runtime customization (custom ignore paths)
- Maintains flexibility while providing defaults
- Enables composition with consumer-specific rules

**Usage pattern:**
```javascript
// Consumer's eslint.config.js
import createConfig from '@jdhillen/eslint-config';

const config = createConfig({
  ignorePaths: ['**/coverage/**']
});

export default [...config];
```

### 2. ESLint Flat Config Structure

Returns an array of configuration objects (ESLint v9+ format):

```javascript
[
  js.configs.recommended,              // Base JavaScript rules
  { /* Main config */ },               // Core rules for all files
  { /* TypeScript override */ },       // TS-specific parser
  { /* Vue override */ },              // Vue SFC parser chain
  { /* .d.ts override */ },            // Relaxed rules for type definitions
  { /* .js override */ },              // Allow CommonJS patterns
  { /* Node scripts override */ },     // Allow console in bin/scripts
  { /* Ignore patterns */ }            // Excluded directories
]
```

**Cascading override pattern:**
- Later objects override earlier ones for matching files
- File patterns determine which config applies
- Parsers switch based on file type

### 3. Parser Strategy

Different file types require different parsers:

| File Type | Parser | Notes |
|-----------|--------|-------|
| `**/*.js` | Native | Default JavaScript parser |
| `**/*.ts`, `**/*.tsx` | `@typescript-eslint/parser` | TypeScript support |
| `**/*.vue` | `vue-eslint-parser` → `@typescript-eslint/parser` | Parser chain for Vue SFCs |

**Vue parser chain:**
```javascript
parser: vueParser,
parserOptions: {
  parser: tsParser,  // For <script> blocks
  sourceType: 'module'
}
```

This allows TypeScript to work inside Vue `<script>` tags.

### 4. Rule Philosophy

**Error-level rules** (must be fixed):
- Code quality issues: `no-var`, `prefer-const`, `eqeqeq`
- TypeScript safety: Most TS-specific rules
- Vue best practices: Component naming, self-closing tags
- Import ordering: Alphabetical with group separation

**Warn-level rules** (should be addressed):
- `no-console`: warn (allows console.warn/error)
- `no-debugger`: warn (prevents accidental commits)
- `@typescript-eslint/no-explicit-any`: **warn** (reduced from error - pragmatic)

**Off rules** (deliberately disabled):
- `@typescript-eslint/explicit-function-return-type`: Too strict
- `@typescript-eslint/explicit-module-boundary-types`: Too strict
- `vue/multi-word-component-names`: Too opinionated

### 5. CLI Setup Tool

Location: [bin/setup-eslint-config.js](bin/setup-eslint-config.js)

**What it does:**
1. Creates `eslint.config.js` in consuming project (if missing)
2. Adds lint scripts to package.json (if missing)
3. Preserves existing configuration
4. Provides user-friendly status messages

**Safe automation pattern:**
- Checks for existing files before writing
- Non-destructive package.json updates
- Fails fast with clear error messages

## Project Structure

```
/Users/jdhillen/Sandbox/personal/modules/eslint-config/
├── .github/
│   └── workflows/
│       └── publish.yml           # CI/CD: lint → test → semantic-release
├── .husky/
│   └── pre-commit                # Runs `npm run lint` before commit
├── bin/
│   └── setup-eslint-config.js   # CLI tool (exported as `setup-eslint-config`)
├── src/
│   └── index.js                  # Main export: createConfig factory function
├── eslint.config.js              # Dogfooding: lints itself using own config
├── release.config.js             # Extends @jdhillen/release-config
├── package.json                  # Package manifest
├── README.md                     # Consumer documentation
├── CHANGELOG.md                  # Auto-generated by semantic-release
├── LICENSE                       # MIT
└── .gitignore                    # Standard Node.js ignores
```

**Published files** (defined in package.json):
- `src/**`
- `bin/**`
- `README.md`
- `LICENSE`

**Not published:**
- Development tooling (.github, .husky, eslint.config.js)
- Generated files (CHANGELOG.md, node_modules)

## Important Patterns

### Adding or Modifying Rules

**Location:** [src/index.js](src/index.js)

**Process:**
1. Identify which configuration object applies to your target files
2. Add/modify rules in that object's `rules` property
3. Test changes: `npm run lint`
4. Commit using conventional commits: `npm run commit`
5. CI will validate and auto-release

**Example: Add new rule**
```javascript
// In src/index.js, main config object
rules: {
  // ... existing rules
  'no-magic-numbers': ['warn', { ignore: [0, 1] }],
}
```

**Example: Modify TypeScript override**
```javascript
// In the TypeScript-specific override object
{
  files: ['**/*.ts', '**/*.tsx'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error', // Change from warn to error
  }
}
```

### Adding File Type Overrides

To add rules for a specific file pattern:

```javascript
// After the existing overrides in src/index.js
{
  files: ['**/*.spec.js', '**/*.test.js'],
  rules: {
    'no-console': 'off',  // Allow console in tests
  }
}
```

Insert before the ignore patterns object (last in array).

### Extending Ignore Paths

**For consumers:**
```javascript
const config = createConfig({
  ignorePaths: ['**/coverage/**', '**/temp/**']
});
```

**For this package:**
Edit [src/index.js:7](src/index.js#L7) to modify `defaultIgnorePaths`.

### Testing Changes

**No automated tests exist.** Validation is manual:

1. **Self-lint:** `npm run lint` (applies config to this repo)
2. **Local linking:**
   ```bash
   npm link
   cd /path/to/test-project
   npm link @jdhillen/eslint-config
   npm run lint
   ```
3. **Pre-commit hook:** Husky runs lint before allowing commits

### Creating a New Version

**Automated process:**
1. Make changes on `dev` branch
2. Commit using `npm run commit` (conventional commits)
3. Create PR from `dev` to `main`
4. Merge PR
5. GitHub Actions automatically:
   - Runs lint
   - Analyzes commits
   - Determines version bump
   - Generates changelog
   - Publishes to npm
   - Creates GitHub release

**Commit types and versioning:**
- `feat:` → minor version bump (e.g., 2.0.4 → 2.1.0)
- `fix:` → patch version bump (e.g., 2.0.4 → 2.0.5)
- `BREAKING CHANGE:` → major version bump (e.g., 2.0.4 → 3.0.0)

## Dependencies and External Services

### Core Dependencies (Bundled)

These are included as direct dependencies, not peer dependencies:

| Dependency | Version | Purpose |
|------------|---------|---------|
| `@eslint/compat` | ^1.4.0 | Compatibility layer for flat config |
| `@eslint/js` | ^9.37.0 | ESLint recommended JavaScript rules |
| `@jdhillen/release-config` | ^2.0.0 | Shared semantic-release configuration |
| `@typescript-eslint/eslint-plugin` | ^8.46.0 | TypeScript linting rules |
| `@typescript-eslint/parser` | ^8.46.0 | Parses TypeScript for ESLint |
| `eslint` | ^9.37.0 | The linting engine |
| `eslint-plugin-import` | ^2.32.0 | Import/export linting and ordering |
| `eslint-plugin-vue` | ^10.5.0 | Vue.js 3 specific rules |
| `globals` | ^16.4.0 | Global variable definitions (browser, node) |
| `typescript-eslint` | ^8.46.0 | Unified TypeScript ESLint tooling |
| `vue-eslint-parser` | ^10.2.0 | Parses Vue SFC files |

**Design decision:** All plugins are bundled to eliminate peer dependency conflicts for consumers.

**Note:** Dependencies are kept up-to-date with latest compatible versions for Node.js 20+.

### Peer Dependencies

Only one peer dependency:
- `typescript` >= 5.0.0

Consumers must install TypeScript themselves.

### Dev Dependencies

- `commitizen` ^4.3.1 - Interactive commit message helper
- `cz-conventional-changelog` ^3.3.0 - Conventional commits adapter for commitizen
- `husky` ^9.1.7 - Git hooks automation
- `typescript` ^5.9.3 - For development/testing

### External Services

**GitHub Actions:** CI/CD pipeline
- Triggers on push to `main`
- Uses secrets: `GITHUB_TOKEN`, `NPM_TOKEN`

**NPM Registry:** Package publication
- Published as public package: @jdhillen/eslint-config

**Semantic Release:** Automated versioning
- Uses @jdhillen/release-config (custom shared config)

## Development Workflows

### Git Workflow

**Branch strategy:**
```
feature/rework → dev → main (triggers release)
```

**Current branches:**
- `main` - Production releases
- `dev` - Staging/development
- `rework` - Active feature branch (current)

**Typical workflow:**
1. Work in feature branch or `dev`
2. Commit using `npm run commit` (Commitizen)
3. Pre-commit hook runs lint automatically
4. Create PR to `dev`
5. Merge `dev` to `main` to trigger release

### Commit Conventions

**Conventional Commits format:** `<type>(<scope>): <subject>`

**Types:**
- `feat`: New feature (minor version bump)
- `fix`: Bug fix (patch version bump)
- `chore`: Maintenance (no version bump)
- `style`: Code style changes
- `docs`: Documentation only
- `test`: Test additions

**Examples:**
```bash
feat(rules): add no-magic-numbers rule
fix(typescript): relax no-explicit-any to warn
chore(deps): update eslint to v9.22.0
```

**Commitizen helper:**
```bash
npm run commit  # Interactive prompt
```

### Release Process

**Fully automated via semantic-release:**

1. Push to `main` branch
2. GitHub Actions workflow starts
3. Pipeline steps:
   - Checkout code
   - Setup Node.js 20
   - Install dependencies
   - Run lint (quality gate)
   - Run tests (currently no-op)
   - Run semantic-release
4. Semantic-release:
   - Analyzes commits since last release
   - Determines version bump
   - Updates package.json
   - Generates/updates CHANGELOG.md
   - Creates git tag
   - Publishes to NPM (with provenance)
   - Creates GitHub release
   - Commits version bump with [skip ci]

**Manual release trigger** (rarely needed):
```bash
npm run release
```

### CI/CD Pipeline

**File:** [.github/workflows/publish.yml](.github/workflows/publish.yml)

**Trigger:** Push to `main`

**Jobs:**
1. **Lint:** `npm run lint` - fails if errors exist
2. **Test:** `npm test` - currently passes (no tests)
3. **Release:** `semantic-release` - automated versioning and publishing

**Required secrets:**
- `GITHUB_TOKEN` - Auto-provided by GitHub
- `NPM_TOKEN` - Must be configured in repository settings

## Code Style

### Language Conventions

**ES Modules only:**
```javascript
// Use this
import foo from 'bar';
export default function createConfig() { }

// Not this
const foo = require('bar');
module.exports = { };
```

**Quote style:** Single quotes
```javascript
const str = 'hello';  // ✓
const str = "hello";  // ✗
```

**No semicolons:**
```javascript
const foo = 'bar'  // ✓
const foo = 'bar';  // ✗
```

**No trailing whitespace:**
- Empty lines should have zero spaces
- Line endings should have no trailing spaces

### Naming Conventions

**Files:**
- Config files: `kebab-case.config.js` (eslint.config.js, release.config.js)
- Source files: `kebab-case.js` (index.js)
- Binary scripts: `kebab-case.js` (setup-eslint-config.js)
- Documentation: `UPPERCASE.md` (README.md, CHANGELOG.md)

**Functions:**
- camelCase for function names
- Descriptive, verb-first names (createConfig, setupProject)

**Constants:**
- camelCase for regular constants
- SCREAMING_SNAKE_CASE for true constants (rare in this codebase)

**Variables:**
- camelCase for all variables
- Prefer `const` over `let` (enforced by linter)
- Never use `var` (enforced by linter)

### Import/Export Patterns

**Import order** (enforced by eslint-plugin-import):
1. Node.js built-ins
2. External dependencies
3. Internal modules
4. Parent directory imports
5. Sibling file imports
6. Index file imports

**Newlines between groups:**
```javascript
import fs from 'fs';  // Built-in

import js from '@eslint/js';  // External
import tseslint from '@typescript-eslint/eslint-plugin';

import { helper } from './utils.js';  // Internal
```

**Alphabetization:** Within each group, imports are alphabetized (case-insensitive).

### Documentation Standards

**JSDoc for public APIs:**
```javascript
/**
 * Create an ESLint flat config
 * @param {Object} options - Configuration options
 * @param {string[]} [options.ignorePaths] - Additional paths to ignore
 * @returns {Array} ESLint flat config array
 */
export default function createConfig(options = {}) {
  // ...
}
```

**Inline comments:**
- Use sparingly, only when code intent is unclear
- Explain "why", not "what"
- Place above the line being explained

**README as primary documentation:**
- User-facing documentation lives in README.md
- This file (CLAUDE.md) is for AI context only

## Hidden Context

### Critical Design Decisions

#### 1. Prettier Was Deliberately Removed

**When:** March 7, 2025 (same day as v1.0.0 launch)
**Commit:** ae66369
**Rationale:** "Wanting this to be only ESLint"

The package initially shipped with Prettier integration but removed it 30 minutes after v1.0.0, necessitating v2.0.0 as a breaking change.

**What was removed:**
- `eslint-plugin-prettier` dependency
- `eslint-config-prettier` dependency
- `prettier` peer dependency
- `prettier.config.js` file
- All Prettier-related ESLint rules

**Impact for this codebase:**
- Formatting is handled by ESLint rules only
- No separate formatter step
- Simpler tooling, fewer dependencies
- No Prettier/ESLint rule conflicts

**Impact for consumers:**
- Users must handle formatting separately if desired
- Cannot rely on this package for code formatting
- Clearer separation between linting (code quality) and formatting (style)

**Do NOT suggest re-adding Prettier** - this was a deliberate architectural decision.

#### 2. Official Presets Over Manual Rules

**File:** [src/index.js](src/index.js)
**Decision:** Use official preset configurations instead of manually copying rules

**Current approach:**
```javascript
js.configs.recommended,
...tseslint.configs.recommended,
...vuePlugin.configs['flat/recommended'],
```

**Why presets?**
- Automatic updates when presets are improved
- Maintained by official teams (better than manual copying)
- Reduces maintenance burden
- Ensures compatibility with plugin versions

**Note on type-checked rules:**
Type-checked TypeScript rules are disabled by default because they require `tsconfig.json` configuration. This maintains the "zero configuration" philosophy. Users can enable them if needed.

#### 3. Plugin Compatibility with ESLint 9

**Decision:** Use `@eslint/compat` for plugins not fully supporting flat config

**Current approach:**
```javascript
import { fixupPluginRules } from '@eslint/compat';
import importPlugin from 'eslint-plugin-import';

plugins: {
  import: fixupPluginRules(importPlugin)
}
```

**Why needed?**
- `eslint-plugin-import` doesn't fully support ESLint 9 flat config yet
- `fixupPluginRules` provides compatibility layer
- Allows using the plugin without waiting for official flat config support

**Package added:** `@eslint/compat@^1.4.0`

#### 4. ESLint 9+ Only (No Backwards Compatibility)

**Decision:** Target only ESLint v9 and its flat config format

**Trade-offs:**
- **Pros:** Modern, future-proof, simpler config structure
- **Cons:** Cannot be used with ESLint <9.0.0

**Consumer impact:**
- Projects must upgrade to ESLint 9+
- VSCode users need: `"eslint.experimental.useFlatConfig": true`
- No migration path for legacy .eslintrc projects

**Do NOT add legacy format support** - this would double maintenance burden.

#### 5. Comprehensive Rule Organization (88 Rules Across 6 Categories)

**Decision:** Organize all rules into clear, documented sections

**Current structure in [src/index.js](src/index.js):**
1. **Modern JavaScript Rules** (20 rules) - const/let, template literals, destructuring, spread operators
2. **TypeScript Rules** (10 rules) - explicit types, no any, interface over type
3. **Naming Conventions** (comprehensive selectors) - camelCase, PascalCase, UPPER_CASE patterns
4. **Vue.js 3 Rules** (22 rules) - composition API, reactivity, component patterns
5. **Import/Module Rules** (10 rules) - organization, ordering, alphabetization
6. **Code Quality & Complexity** (6 rules) - max lines, nesting depth, cyclomatic complexity

**Why comprehensive?**
- Provides true "set it and forget it" experience
- Covers modern development patterns
- Reduces need for custom overrides
- Educational for developers (documents best practices)

**Maintenance consideration:**
Rules are carefully chosen and commented. Changes should be deliberate and well-reasoned.

#### 6. All Plugins Bundled as Direct Dependencies

**Decision:** Include all plugins as dependencies (not peer dependencies)

**Why?**
- Eliminates "peer dependency hell" for consumers
- Single `npm install` gets everything
- No version compatibility issues between plugins
- Simpler consumer setup

**Trade-off:**
- Consumers cannot control plugin versions
- Larger package size
- Potential for duplicate dependencies if consumer uses same plugins

**This is the right decision for a shareable config** - simplicity trumps flexibility.

### Non-Obvious Behaviors

#### 1. Underscore Prefix Ignores Unused Variables

Rule at [src/index.js:76-82](src/index.js#L76):
```javascript
'@typescript-eslint/no-unused-vars': [
  'error',
  {
    argsIgnorePattern: '^_',
    varsIgnorePattern: '^_'
  }
]
```

This allows intentional unused variables/arguments when prefixed with underscore:
```javascript
function handler(_unusedEvent, data) {
  return data;  // _unusedEvent is required by API but unused
}
```

Common in event handlers, callbacks, and API implementations.

#### 2. Any is Warn, Not Error

Rule at [src/index.js:66](src/index.js#L66):
```javascript
'@typescript-eslint/no-explicit-any': 'warn', // Reduced from recommended "error"
```

**Why reduced?**
- Pragmatic approach to TypeScript migration
- Allows `any` in early development or with poorly-typed libraries
- Warns developers but doesn't block builds
- Acknowledges that `any` is sometimes necessary

**This is NOT a mistake** - it's a deliberate design choice.

#### 3. Console Allowed in Bin/Scripts Directories

Override at [src/index.js:142-152](src/index.js#L142):
```javascript
{
  files: ['**/bin/**/*.js', '**/scripts/**/*.js'],
  languageOptions: {
    globals: {
      console: 'readonly',
      process: 'readonly',
      module: 'readonly',
      require: 'readonly',
      __dirname: 'readonly',
      __filename: 'readonly'
    }
  }
}
```

CLI tools and scripts legitimately need console output and Node.js globals.

#### 4. Declaration Files (.d.ts) Allow Any

Override at [src/index.js:123-130](src/index.js#L123):
```javascript
{
  files: ['**/*.d.ts'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off'
  }
}
```

Type definition files often need `any` for complex or unknown types. This is standard practice.

### Known Issues and Limitations

#### 1. No Automated Tests

**Status:** Test script is a no-op
**Line:** [package.json:39](package.json#L39) - `"test": "echo \"No tests specified\""`

**Implications:**
- Rule changes are not validated automatically
- Risk of breaking changes slipping through
- Quality relies entirely on self-linting and manual testing

**Workaround:**
- Always run `npm run lint` before committing
- Test changes in consuming projects via `npm link`
- Pre-commit hook catches basic issues

**Do NOT assume tests will catch bugs** - they don't exist.

#### 2. Commitizen Not Installed

**Issue:** package.json references Commitizen but doesn't include it in dependencies

**File:** [package.json:66-69](package.json#L66)
```json
"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog"
  }
}
```

**Status:** `npm run commit` will fail if Commitizen isn't globally installed

**Workaround:**
- Install globally: `npm install -g commitizen cz-conventional-changelog`
- Or manually format commits as `type(scope): message`

**This should be fixed** - add to devDependencies:
```json
{
  "commitizen": "^4.3.0",
  "cz-conventional-changelog": "^3.3.0"
}
```

#### 3. Husky Deprecation Warning

**Issue:** `.husky/_/husky.sh` pattern is deprecated and will be removed in Husky v10

**Current version:** husky@^9.1.7

**Impact:** Pre-commit hooks will break when Husky v10 is released

**Fix:** Husky v9 is still supported, but watch for v10 release and migration guide

#### 4. TypeScript is Required Even for JS Projects

**Issue:** Peer dependency on TypeScript >=5.0.0

**Impact:** Cannot use this config in pure JavaScript projects without installing TypeScript

**Rationale:** Config includes TypeScript rules and parser, which require TypeScript to be installed

**Not a bug** - this is a TypeScript-focused config. Document clearly in README.

### Historical Context

#### Project Age and Velocity

**Project inception:** March 7, 2025
**Current age:** 3 days
**Total commits:** 23
**Releases:** 5 versions (1.0.0 → 2.0.4)

This is an extremely new project with rapid iteration. Expect:
- Breaking changes
- Incomplete documentation
- Missing features
- Evolving architecture

**Current branch:** `rework` suggests another major refactoring is in progress.

#### Deployment Issues on Launch Day

Three consecutive patch releases (v2.0.1, v2.0.2, v2.0.3) fixed deployment issues:

**Issue 1:** [package.json:11](package.json#L11) bin path
Changed from `"./bin/setup-eslint-config.js"` to `"bin/setup-eslint-config.js"`
Leading `./` caused npm publish failures.

**Issue 2:** CI/CD npm authentication
Fixed with token configuration in GitHub Actions.

**Issue 3:** Pre-commit hook warnings
Style issues caught by Husky before commits.

**Lesson:** This project had a rocky launch. Be cautious with major changes without thorough testing.

## Integration Points

### For Consumers

**Installation:**
```bash
npm install --save-dev @jdhillen/eslint-config
```

**Configuration:**
```javascript
// eslint.config.js
import createConfig from '@jdhillen/eslint-config';

export default createConfig();
```

**With custom ignores:**
```javascript
export default createConfig({
  ignorePaths: ['**/coverage/**']
});
```

**With additional rules:**
```javascript
const config = createConfig();

export default [
  ...config,
  {
    files: ['**/*.test.js'],
    rules: { 'no-console': 'off' }
  }
];
```

### For Development

**Local development:**
```bash
git clone https://github.com/jdhillen/eslint-config.git
cd eslint-config
npm install
npm run lint
```

**Testing changes:**
```bash
# In this repo
npm link

# In test project
npm link @jdhillen/eslint-config
```

**Publishing:**
- Push to `main` branch (automatic via semantic-release)
- Or run `npm run release` manually

## Troubleshooting

### Common Issues

#### 1. "Cannot find module '@jdhillen/eslint-config'"

**Symptoms:** Import fails in consuming project
**Cause:** Package not installed or not linked
**Solution:**
```bash
npm install --save-dev @jdhillen/eslint-config
```

#### 2. "Parsing error: Cannot find module 'typescript'"

**Symptoms:** ESLint fails to parse TypeScript files
**Cause:** TypeScript peer dependency not installed
**Solution:**
```bash
npm install --save-dev typescript
```

#### 3. "ESLint couldn't find the config '@jdhillen/eslint-config'"

**Symptoms:** Legacy ESLint configuration error
**Cause:** Using ESLint <9.0.0 or wrong import syntax
**Solution:**
- Upgrade to ESLint 9+
- Use flat config format: `import createConfig from '@jdhillen/eslint-config'`

#### 4. Pre-commit Hook Fails with Lint Errors

**Symptoms:** Cannot commit code
**Cause:** Husky runs `npm run lint` and finds errors
**Solution:**
```bash
npm run lint:fix  # Auto-fix issues
# Or fix manually, then retry commit
```

#### 5. "npm run commit" fails with command not found

**Symptoms:** Commitizen not found
**Cause:** Commitizen not installed
**Solution:**
```bash
npm install -g commitizen cz-conventional-changelog
# Or just format commits manually: type(scope): message
```

### VSCode Integration Issues

**Issue:** ESLint not working in VSCode

**Solution:** Add to `.vscode/settings.json`:
```json
{
  "eslint.validate": [
    "javascript",
    "typescript",
    "vue"
  ],
  "eslint.experimental.useFlatConfig": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

## Gotchas and Tips

### Gotchas

1. **No formatting rules** - Prettier was removed, so this config doesn't format code. Use a separate formatter if needed.

2. **TypeScript required** - Even for JavaScript projects, TypeScript must be installed due to peer dependency.

3. **Flat config only** - Will not work with ESLint <9.0.0. No backwards compatibility.

4. **No tests** - Changes are not validated by automated tests. Always test manually.

5. **Leading ./ in bin paths breaks npm** - package.json bin paths must not start with `./`.

6. **Electron projects need additional config** - This config handles renderer process (Vue.js) but not main process. Electron main process needs separate config section with Node.js globals only. Do NOT use `@electron-toolkit/eslint-config` packages - they provide no Electron-specific value and incorrectly mix browser + Node.js globals everywhere.

### Pro Tips

1. **Test locally before publishing** - Use `npm link` to test in real projects before merging to main.

2. **Watch semantic-release output** - The automated release process provides detailed logs in GitHub Actions.

3. **Use underscore prefix** - Prefix unused variables/args with `_` to bypass unused-vars rule.

4. **Console.warn/error always allowed** - Only console.log triggers warnings, so use warn/error for debugging.

5. **Check .husky hooks before complex commits** - Pre-commit lint can be slow. Run `npm run lint:fix` first.

6. **Flat config is an array** - Remember to spread the result: `export default [...createConfig()]`.

## Resources

### Internal Documentation
- [README.md](README.md) - Consumer-facing documentation
- [CHANGELOG.md](CHANGELOG.md) - Auto-generated version history
- [package.json](package.json) - Package metadata and scripts

### External Resources
- [ESLint Flat Config Documentation](https://eslint.org/docs/latest/use/configure/configuration-files-new)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [eslint-plugin-vue](https://eslint.vuejs.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Release](https://semantic-release.gitbook.io/)

### Dependencies
- [@eslint/js](https://www.npmjs.com/package/@eslint/js)
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)
- [vue-eslint-parser](https://www.npmjs.com/package/vue-eslint-parser)

### Code Ownership

**Primary Maintainer:** J.D. Hillen
- GitHub: https://github.com/jdhillen
- Email: jdhillen@dimin.com, jhillen01@gmail.com

**Component Ownership** (based on commit history):
- Core config (src/index.js): J.D. Hillen (100%)
- Setup tool (bin/setup-eslint-config.js): J.D. Hillen (100%)
- Release automation: semantic-release-bot (automated)

This is a single-maintainer project.

## Maintenance Tasks

### Regular Maintenance

**Dependency updates:**
```bash
npm outdated  # Check for updates
npm update    # Update within semver ranges
```

**Critical dependencies to watch:**
- `@typescript-eslint/eslint-plugin` - Sync recommended rules manually
- `eslint` - Major version changes may require config updates
- `eslint-plugin-vue` - Vue 4 support will require major changes

### Health Checks

**Before each release:**
1. Run `npm run lint` - should pass with no errors
2. Test in a consuming project via `npm link`
3. Verify CLI setup tool: `npx setup-eslint-config` in test project
4. Check GitHub Actions runs for failures

**Quarterly:**
1. Review @typescript-eslint recommended rules for changes
2. Update dependency versions
3. Review and close stale issues
4. Update README with new examples or clarifications

### Breaking Change Considerations

**When making breaking changes:**
1. Use `BREAKING CHANGE:` in commit body
2. Update README with migration guide
3. Bump major version (automatic via semantic-release)
4. Test thoroughly before merging to main

**Examples of breaking changes:**
- Changing rule from warn to error
- Removing supported file patterns
- Changing default ignore paths
- Updating peer dependency versions
- Changing export API

## Contributing

### Contribution Workflow

1. Fork the repository
2. Create feature branch from `dev`
3. Make changes
4. Run `npm run lint:fix`
5. Commit using `npm run commit` (or conventional format manually)
6. Push to your fork
7. Create PR targeting `dev` branch

### Code Review Checklist

- [ ] Changes follow conventional commit format
- [ ] `npm run lint` passes with no errors
- [ ] README updated if user-facing changes
- [ ] Manual testing completed in consuming project
- [ ] No debugging code (console.log) in source
- [ ] PR description explains rationale for changes

### Definition of Done

A task is complete when:
- Code is committed with conventional commit message
- Lint passes (enforced by pre-commit hook)
- Changes tested in consuming project
- PR approved and merged to `dev`
- `dev` merged to `main` (triggers release)
- Package published to npm automatically
- CHANGELOG.md updated automatically
