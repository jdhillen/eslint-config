/**
 * Integration tests for monorepo scenarios
 *
 * Tests configurations for monorepo projects with multiple frameworks
 * and workspace configurations.
 */

import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

import { describe, it, expect, afterEach } from 'vitest';

import createConfig from '../../src/index.js';

const TEST_DIR = join(process.cwd(), 'tests', '.temp-monorepo');

function setup(packageJson = {}) {
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
}

function cleanup() {
  try {
    rmSync(TEST_DIR, { recursive: true, force: true });
  } catch {
    // Ignore
  }
}

describe('Monorepo Scenarios', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle workspace with multiple frameworks', async () => {
    setup({
      name: 'my-monorepo',
      workspaces: ['packages/*', 'apps/*'],
      devDependencies: {
        react: '^18.0.0',
        vue: '^3.0.0',
        typescript: '^5.9.0'
      }
    });

    const config = await createConfig({ cwd: TEST_DIR });

    expect(config).toBeInstanceOf(Array);
    expect(config.length).toBeGreaterThan(0);
  });

  it('should handle different configs per workspace', async () => {
    setup({
      name: 'my-monorepo',
      workspaces: ['packages/*']
    });

    const frontendConfig = await createConfig({
      cwd: TEST_DIR,
      framework: 'react',
      environment: 'browser'
    });

    const backendConfig = await createConfig({
      cwd: TEST_DIR,
      framework: 'node',
      environment: 'node'
    });

    expect(frontendConfig).toBeInstanceOf(Array);
    expect(backendConfig).toBeInstanceOf(Array);
    expect(frontendConfig).not.toEqual(backendConfig);
  });
});
