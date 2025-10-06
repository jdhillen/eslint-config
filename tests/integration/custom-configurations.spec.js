/**
 * Integration tests for custom configuration scenarios
 *
 * Tests the ability to override and customize the generated configurations
 * for specific project requirements.
 */

import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

import { describe, it, expect, afterEach } from 'vitest';

import createConfig from '../../src/index.js';

const TEST_DIR = join(process.cwd(), 'tests', '.temp-custom');

function setup(packageJson = {}, files = {}) {
  try {
    rmSync(TEST_DIR, { recursive: true, force: true });
  } catch {
    // Ignore
  }

  mkdirSync(TEST_DIR, { recursive: true });

  writeFileSync(
    join(TEST_DIR, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  for (const [filename, content] of Object.entries(files)) {
    const filePath = join(TEST_DIR, filename);
    const dir = join(filePath, '..');
    mkdirSync(dir, { recursive: true });
    writeFileSync(filePath, content);
  }
}

function cleanup() {
  try {
    rmSync(TEST_DIR, { recursive: true, force: true });
  } catch {
    // Ignore
  }
}

describe('Custom Configurations', () => {
  afterEach(() => {
    cleanup();
  });

  it('should allow overriding auto-detected framework', async () => {
    setup({
      dependencies: {
        react: '^18.0.0',
        vue: '^3.0.0'
      }
    });

    const config = await createConfig({
      cwd: TEST_DIR,
      framework: 'vue'
    });

    expect(config).toBeInstanceOf(Array);
    const hasVueFiles = config.some((c) => c.files?.some((f) => f.includes('*.vue')));
    expect(hasVueFiles).toBe(true);
  });

  it('should allow disabling TypeScript for JS-only codebase', async () => {
    setup(
      {
        dependencies: {
          react: '^18.0.0'
        }
      },
      {
        'tsconfig.json': '{}'
      }
    );

    const config = await createConfig({
      cwd: TEST_DIR,
      typescript: false
    });

    expect(config).toBeInstanceOf(Array);
    const hasTypeScriptParser = config.some(
      (c) => c.languageOptions?.parser?.meta?.name === '@typescript-eslint/parser'
    );
    expect(hasTypeScriptParser).toBe(false);
  });

  it('should merge custom rules with generated config', async () => {
    setup({
      dependencies: {
        react: '^18.0.0'
      }
    });

    const config = await createConfig({
      cwd: TEST_DIR,
      rules: {
        'no-console': 'error',
        'react/jsx-uses-react': 'off'
      }
    });

    expect(config).toBeInstanceOf(Array);
    const lastConfig = config[config.length - 1];
    expect(lastConfig.rules['no-console']).toBe('error');
    expect(lastConfig.rules['react/jsx-uses-react']).toBe('off');
  });
});
