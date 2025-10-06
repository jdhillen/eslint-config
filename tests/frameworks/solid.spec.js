/**
 * Tests for Solid.js framework configuration
 */

import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

import { describe, it, expect, afterEach } from 'vitest';

import createConfig from '../../src/index.js';

const TEST_DIR = join(process.cwd(), 'tests', '.temp-solid');

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

describe('Solid Preset', () => {
  it('should lazy load Solid preset', async () => {
    const { default: createSolidPreset } = await import('../../src/presets/frameworks/solid.js');
    expect(createSolidPreset).toBeInstanceOf(Function);
    const preset = createSolidPreset();
    expect(preset).toBeInstanceOf(Array);
    expect(preset.length).toBeGreaterThan(0);
  });
});

describe('Solid Project Integration', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle Solid.js project', async () => {
    setup(
      {
        dependencies: {
          'solid-js': '^1.10.0'
        },
        devDependencies: {
          typescript: '^5.9.0',
          vite: '^6.0.0'
        }
      },
      {
        'tsconfig.json': JSON.stringify({
          compilerOptions: {
            jsx: 'preserve',
            jsxImportSource: 'solid-js'
          }
        })
      }
    );

    const config = await createConfig({ cwd: TEST_DIR });

    expect(config).toBeInstanceOf(Array);
    expect(config.length).toBeGreaterThan(0);
  });
});
