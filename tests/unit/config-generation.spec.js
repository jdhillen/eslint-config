/**
 * Unit tests for ESLint configuration generation
 *
 * Tests the createConfig() function's ability to generate valid configurations
 * based on auto-detection, explicit options, and edge cases.
 */

import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

import { describe, it, expect, afterEach } from 'vitest';

import createConfig from '../../src/index.js';

const TEST_DIR = join(process.cwd(), 'tests', '.temp-config');

function setup(packageJson = {}, files = {}) {
  try {
    rmSync(TEST_DIR, { recursive: true, force: true });
  } catch {
    // Ignore if doesn't exist
  }

  mkdirSync(TEST_DIR, { recursive: true });

  writeFileSync(
    join(TEST_DIR, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  for (const [filename, content] of Object.entries(files)) {
    writeFileSync(join(TEST_DIR, filename), content);
  }
}

function cleanup() {
  try {
    rmSync(TEST_DIR, { recursive: true, force: true });
  } catch {
    // Ignore cleanup errors
  }
}

describe('Auto-Detection Mode', () => {
  afterEach(() => {
    cleanup();
  });

  it('should generate config for vanilla JavaScript project', async () => {
    setup({ dependencies: {} });
    const config = await createConfig({ cwd: TEST_DIR });

    expect(config).toBeInstanceOf(Array);
    expect(config.length).toBeGreaterThan(0);
  });

  it('should generate config for TypeScript project', async () => {
    setup(
      { dependencies: { typescript: '^5.0.0' } },
      { 'tsconfig.json': '{}' }
    );
    const config = await createConfig({ cwd: TEST_DIR });

    expect(config).toBeInstanceOf(Array);
    const hasTypeScriptFiles = config.some(
      (c) => c.files?.some((f) => f.includes('*.ts') || f.includes('*.tsx'))
    );
    expect(hasTypeScriptFiles).toBe(true);
  });

  it('should generate config for Node.js backend', async () => {
    setup({
      type: 'module',
      dependencies: { express: '^4.0.0' }
    });
    const config = await createConfig({ cwd: TEST_DIR });

    expect(config).toBeInstanceOf(Array);
    const hasNodeGlobals = config.some(
      (c) => c.languageOptions?.globals?.process !== undefined
    );
    expect(hasNodeGlobals).toBe(true);
  });
});

describe('Explicit Options', () => {
  afterEach(() => {
    cleanup();
  });

  it('should respect explicit framework option', async () => {
    setup({ dependencies: {} });
    const config = await createConfig({
      cwd: TEST_DIR,
      framework: 'react'
    });

    expect(config).toBeInstanceOf(Array);
    expect(config.length).toBeGreaterThan(0);
  });

  it('should respect explicit environment option', async () => {
    setup({ dependencies: {} });
    const config = await createConfig({
      cwd: TEST_DIR,
      environment: 'node'
    });

    expect(config).toBeInstanceOf(Array);
    const hasNodeGlobals = config.some(
      (c) => c.languageOptions?.globals?.process !== undefined
    );
    expect(hasNodeGlobals).toBe(true);
  });

  it('should respect explicit typescript option', async () => {
    setup({ dependencies: {} });
    const config = await createConfig({
      cwd: TEST_DIR,
      typescript: true
    });

    expect(config).toBeInstanceOf(Array);
    const hasTypeScriptFiles = config.some(
      (c) => c.files?.some((f) => f.includes('*.ts') || f.includes('*.tsx'))
    );
    expect(hasTypeScriptFiles).toBe(true);
  });

  it('should not include TypeScript config when disabled', async () => {
    setup(
      { dependencies: {} },
      { 'tsconfig.json': '{}' }
    );
    const config = await createConfig({
      cwd: TEST_DIR,
      typescript: false
    });

    expect(config).toBeInstanceOf(Array);
    const hasRecommendedConfig = config.some(
      (c) => c.name?.includes('typescript-eslint')
    );
    expect(hasRecommendedConfig).toBe(false);
  });

  it('should allow combining explicit options', async () => {
    setup({ dependencies: {} });
    const config = await createConfig({
      cwd: TEST_DIR,
      framework: 'vue',
      environment: 'browser',
      typescript: true
    });

    expect(config).toBeInstanceOf(Array);
    expect(config.length).toBeGreaterThan(0);
  });
});

describe('Rule Overrides', () => {
  afterEach(() => {
    cleanup();
  });

  it('should accept custom rule overrides', async () => {
    setup({ dependencies: {} });
    const config = await createConfig({
      cwd: TEST_DIR,
      rules: {
        'no-console': 'error'
      }
    });

    expect(config).toBeInstanceOf(Array);
    const lastConfig = config[config.length - 1];
    expect(lastConfig.rules['no-console']).toBe('error');
  });

  it('should merge custom rules with base rules', async () => {
    setup({ dependencies: {} });
    const config = await createConfig({
      cwd: TEST_DIR,
      rules: {
        'no-console': 'error',
        'prefer-const': 'warn'
      }
    });

    expect(config).toBeInstanceOf(Array);
    const lastConfig = config[config.length - 1];
    expect(lastConfig.rules['no-console']).toBe('error');
    expect(lastConfig.rules['prefer-const']).toBe('warn');
  });
});

describe('Edge Cases', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle empty options object', async () => {
    setup({ dependencies: {} });
    const config = await createConfig({});

    expect(config).toBeInstanceOf(Array);
    expect(config.length).toBeGreaterThan(0);
  });

  it('should handle no options', async () => {
    setup({ dependencies: {} });
    const config = await createConfig();

    expect(config).toBeInstanceOf(Array);
    expect(config.length).toBeGreaterThan(0);
  });

  it('should handle project without package.json', async () => {
    try {
      rmSync(TEST_DIR, { recursive: true, force: true });
    } catch {
      // Ignore
    }
    mkdirSync(TEST_DIR, { recursive: true });

    const config = await createConfig({ cwd: TEST_DIR });

    expect(config).toBeInstanceOf(Array);
    expect(config.length).toBeGreaterThan(0);
  });
});
