/**
 * Tests for Vue framework configuration
 */

import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

import { describe, it, expect, afterEach } from 'vitest';

import createConfig from '../../src/index.js';
import createVuePreset from '../../src/presets/frameworks/vue.js';

const TEST_DIR = join(process.cwd(), 'tests', '.temp-vue');

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
    writeFileSync(join(TEST_DIR, filename), content);
  }
}

function cleanup() {
  try {
    rmSync(TEST_DIR, { recursive: true, force: true });
  } catch {
    // Ignore
  }
}

describe('Vue Preset', () => {
  it('should export factory function', () => {
    expect(createVuePreset).toBeInstanceOf(Function);
  });

  it('should return array of configs', () => {
    const preset = createVuePreset();
    expect(preset).toBeInstanceOf(Array);
    expect(preset.length).toBeGreaterThan(0);
  });
});

describe('Vue Project Integration', () => {
  afterEach(() => {
    cleanup();
  });

  it('should detect and configure Vue project', async () => {
    setup({
      dependencies: {
        vue: '^3.5.0'
      }
    });

    const config = await createConfig({ cwd: TEST_DIR });

    expect(config).toBeInstanceOf(Array);
    const hasVueFiles = config.some((c) => c.files?.some((f) => f.includes('*.vue')));
    expect(hasVueFiles).toBe(true);
  });

  it('should handle Nuxt project', async () => {
    setup(
      {
        dependencies: {
          nuxt: '^3.15.0',
          vue: '^3.5.0'
        },
        devDependencies: {
          typescript: '^5.9.0'
        }
      },
      {
        'tsconfig.json': JSON.stringify({
          extends: './.nuxt/tsconfig.json'
        })
      }
    );

    const config = await createConfig({ cwd: TEST_DIR });

    expect(config).toBeInstanceOf(Array);
    const hasVueFiles = config.some((c) => c.files?.some((f) => f.includes('*.vue')));
    expect(hasVueFiles).toBe(true);
  });
});
