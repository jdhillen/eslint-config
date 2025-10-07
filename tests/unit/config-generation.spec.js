/**
 * Unit tests for ESLint configuration generation
 *
 * Tests the createConfig() function's ability to generate valid configurations
 * based on auto-detection, explicit options, and edge cases.
 */

import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

import { describe, it, expect, afterEach, vi } from 'vitest';

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

  it('should handle Astro framework with lazy loading', async () => {
    setup({ dependencies: { astro: '^5.0.0' } });
    const config = await createConfig({
      cwd: TEST_DIR,
      framework: 'astro'
    });

    // Should include Astro preset configuration
    expect(config).toBeInstanceOf(Array);
    expect(config.length).toBeGreaterThan(0);
    // Should have .astro file patterns
    const hasAstroFiles = config.some(
      (c) => c.files?.some((f) => f.includes('*.astro'))
    );
    expect(hasAstroFiles).toBe(true);
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

  it('should handle unknown framework gracefully', async () => {
    setup({ dependencies: {} });

    // Spy on console.warn
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const config = await createConfig({
      framework: 'nonexistent-framework',
      cwd: TEST_DIR
    });

    // Should warn about unknown framework
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Unknown framework "nonexistent-framework"')
    );

    // Should still return valid config with vanilla fallback
    expect(config).toBeInstanceOf(Array);
    expect(config.length).toBeGreaterThan(0);

    consoleWarnSpy.mockRestore();
  });

  it('should apply universal environment when explicitly set', async () => {
    setup({ dependencies: { react: '^18.0.0' } });

    const config = await createConfig({
      environment: 'universal',
      cwd: TEST_DIR
    });

    // Should include config with both browser and node globals
    const envConfig = config.find(c => c.languageOptions?.globals);
    expect(envConfig).toBeDefined();

    // Universal environment should have both browser and node globals
    const {globals} = envConfig.languageOptions;
    expect(globals).toHaveProperty('window'); // Browser global
    expect(globals).toHaveProperty('process'); // Node global
  });
});
