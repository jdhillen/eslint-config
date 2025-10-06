/**
 * Tests for React framework configuration
 */

import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

import { describe, it, expect, afterEach } from 'vitest';

import createConfig from '../../src/index.js';
import createReactPreset from '../../src/presets/frameworks/react.js';

const TEST_DIR = join(process.cwd(), 'tests', '.temp-react');

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

describe('React Preset', () => {
  it('should export factory function', () => {
    expect(createReactPreset).toBeInstanceOf(Function);
  });

  it('should return array of configs', () => {
    const preset = createReactPreset();
    expect(preset).toBeInstanceOf(Array);
    expect(preset.length).toBeGreaterThan(0);
  });

  it('should include React rules', () => {
    const preset = createReactPreset();
    const hasReactRules = preset.some((c) => c.rules?.['react/jsx-uses-vars']);
    expect(hasReactRules).toBe(true);
  });
});

describe('React Project Integration', () => {
  afterEach(() => {
    cleanup();
  });

  it('should detect and configure React project', async () => {
    setup({
      dependencies: {
        react: '^18.3.0',
        'react-dom': '^18.3.0'
      }
    });

    const config = await createConfig({ cwd: TEST_DIR });

    expect(config).toBeInstanceOf(Array);
    const hasReactRules = config.some((c) => c.rules?.['react/jsx-uses-vars']);
    expect(hasReactRules).toBe(true);
  });

  it('should handle Next.js project', async () => {
    setup(
      {
        dependencies: {
          next: '^15.0.0',
          react: '^18.3.0'
        },
        devDependencies: {
          typescript: '^5.9.0'
        }
      },
      {
        'tsconfig.json': JSON.stringify({
          compilerOptions: {
            jsx: 'preserve'
          }
        })
      }
    );

    const config = await createConfig({ cwd: TEST_DIR });

    expect(config).toBeInstanceOf(Array);
    const hasReactRules = config.some((c) => c.rules?.['react/jsx-uses-vars']);
    expect(hasReactRules).toBe(true);
  });
});
