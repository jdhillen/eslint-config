/**
 * Tests for Angular framework configuration
 */

import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

import { describe, it, expect, afterEach } from 'vitest';

import createConfig from '../../src/index.js';
import createAngularPreset from '../../src/presets/frameworks/angular.js';

const TEST_DIR = join(process.cwd(), 'tests', '.temp-angular');

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

describe('Angular Preset', () => {
  it('should export factory function', () => {
    expect(createAngularPreset).toBeInstanceOf(Function);
  });

  it('should return array of configs', () => {
    const preset = createAngularPreset();
    expect(preset).toBeInstanceOf(Array);
    expect(preset.length).toBeGreaterThan(0);
  });
});

describe('Angular Project Integration', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle Angular project', async () => {
    setup(
      {
        dependencies: {
          '@angular/core': '^18.2.0',
          '@angular/common': '^18.2.0',
          '@angular/platform-browser': '^18.2.0'
        },
        devDependencies: {
          typescript: '~5.5.0',
          '@angular/cli': '^18.2.0'
        }
      },
      {
        'tsconfig.json': JSON.stringify({
          compilerOptions: {
            target: 'ES2022'
          },
          angularCompilerOptions: {
            strictTemplates: true
          }
        })
      }
    );

    const config = await createConfig({ cwd: TEST_DIR });

    expect(config).toBeInstanceOf(Array);
    expect(config.length).toBeGreaterThan(0);
  });
});
