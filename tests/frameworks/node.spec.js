/**
 * Tests for Node.js backend configuration
 */

import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

import { describe, it, expect, afterEach } from 'vitest';

import createConfig from '../../src/index.js';
import createNodePreset from '../../src/presets/frameworks/node.js';

const TEST_DIR = join(process.cwd(), 'tests', '.temp-node');

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

describe('Node.js Preset', () => {
  it('should export factory function', () => {
    expect(createNodePreset).toBeInstanceOf(Function);
  });

  it('should return array of configs', () => {
    const preset = createNodePreset();
    expect(preset).toBeInstanceOf(Array);
    expect(preset.length).toBeGreaterThan(0);
  });

  it('should allow console in Node backend', () => {
    const preset = createNodePreset();
    const hasConsoleOff = preset.some((c) => c.rules?.['no-console'] === 'off');
    expect(hasConsoleOff).toBe(true);
  });
});

describe('Node.js Project Integration', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle Express backend', async () => {
    setup(
      {
        type: 'module',
        dependencies: {
          express: '^4.21.0',
          cors: '^2.8.5'
        },
        devDependencies: {
          typescript: '^5.9.0',
          '@types/express': '^4.17.0'
        }
      },
      {
        'tsconfig.json': JSON.stringify({
          compilerOptions: {
            target: 'ES2025',
            module: 'ESNext'
          }
        })
      }
    );

    const config = await createConfig({ cwd: TEST_DIR });

    expect(config).toBeInstanceOf(Array);

    const hasNodeEnvironment = config.some(
      (c) => c.languageOptions?.globals?.process !== undefined
    );
    expect(hasNodeEnvironment).toBe(true);
  });
});
