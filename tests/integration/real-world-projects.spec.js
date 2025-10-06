/**
 * Integration tests for real-world project scenarios
 *
 * Tests complete configurations for realistic project setups to ensure
 * the package works correctly in production-like environments.
 */

import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

import { describe, it, expect, afterEach } from 'vitest';

import createConfig from '../../src/index.js';

const TEST_DIR = join(process.cwd(), 'tests', '.temp-integration');

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

describe('Real-World Projects', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle Next.js 15 + TypeScript project', async () => {
    setup(
      {
        name: 'my-nextjs-app',
        dependencies: {
          next: '^15.0.0',
          react: '^18.3.0',
          'react-dom': '^18.3.0'
        },
        devDependencies: {
          typescript: '^5.9.0',
          '@types/react': '^18.0.0',
          '@types/node': '^22.0.0'
        }
      },
      {
        'tsconfig.json': JSON.stringify({
          compilerOptions: {
            target: 'ES2025',
            lib: ['dom', 'dom.iterable', 'esnext'],
            jsx: 'preserve'
          }
        })
      }
    );

    const config = await createConfig({ cwd: TEST_DIR });

    expect(config).toBeInstanceOf(Array);
    expect(config.length).toBeGreaterThan(2);

    const hasReactRules = config.some((c) => c.rules?.['react/jsx-uses-vars']);
    expect(hasReactRules).toBe(true);

    const hasTypeScript = config.some((c) => c.files?.some((f) => f.includes('*.ts')));
    expect(hasTypeScript).toBe(true);
  });

  it('should handle Nuxt 3 + TypeScript project', async () => {
    setup(
      {
        name: 'my-nuxt-app',
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
    expect(config.length).toBeGreaterThan(2);

    const hasVueFiles = config.some((c) => c.files?.some((f) => f.includes('*.vue')));
    expect(hasVueFiles).toBe(true);
  });

  it.skip('should handle SvelteKit + TypeScript project (requires svelte package)', async () => {
    setup(
      {
        name: 'my-sveltekit-app',
        dependencies: {
          '@sveltejs/kit': '^2.9.0',
          svelte: '^5.20.0'
        },
        devDependencies: {
          typescript: '^5.9.0'
        }
      },
      {
        'tsconfig.json': JSON.stringify({
          extends: './.svelte-kit/tsconfig.json'
        })
      }
    );

    const config = await createConfig({ cwd: TEST_DIR });

    expect(config).toBeInstanceOf(Array);
    expect(config.length).toBeGreaterThan(2);
  });

  it('should handle Express + TypeScript backend', async () => {
    setup(
      {
        name: 'my-api',
        type: 'module',
        dependencies: {
          express: '^4.21.0',
          cors: '^2.8.5'
        },
        devDependencies: {
          typescript: '^5.9.0',
          '@types/express': '^4.17.0',
          '@types/node': '^22.0.0'
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

  it('should handle Angular 18 project', async () => {
    setup(
      {
        name: 'my-angular-app',
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
    expect(config.length).toBeGreaterThan(1);
  });

  it('should handle Astro 5 multi-framework project', async () => {
    setup(
      {
        name: 'my-astro-site',
        dependencies: {
          astro: '^5.4.0',
          '@astrojs/react': '^3.6.0',
          '@astrojs/vue': '^4.5.0',
          react: '^18.3.0',
          vue: '^3.5.0'
        },
        devDependencies: {
          typescript: '^5.9.0'
        }
      },
      {
        'tsconfig.json': JSON.stringify({
          extends: 'astro/tsconfigs/base'
        })
      }
    );

    const config = await createConfig({ cwd: TEST_DIR });

    expect(config).toBeInstanceOf(Array);

    const configsWithGlobals = config.filter((c) => c.languageOptions?.globals);
    const allGlobals = configsWithGlobals.reduce((acc, c) => ({ ...acc, ...c.languageOptions.globals }), {});

    expect(allGlobals.window).toBeDefined();
    expect(allGlobals.process).toBeDefined();
  });

  it('should handle Solid.js + TypeScript project', async () => {
    setup(
      {
        name: 'my-solid-app',
        dependencies: {
          'solid-js': '^1.10.0'
        },
        devDependencies: {
          typescript: '^5.9.0',
          vite: '^6.0.0',
          'vite-plugin-solid': '^3.1.0'
        }
      },
      {
        'tsconfig.json': JSON.stringify({
          compilerOptions: {
            target: 'ES2025',
            jsx: 'preserve',
            jsxImportSource: 'solid-js'
          }
        })
      }
    );

    const config = await createConfig({ cwd: TEST_DIR });

    expect(config).toBeInstanceOf(Array);
    expect(config.length).toBeGreaterThan(1);
  });
});
