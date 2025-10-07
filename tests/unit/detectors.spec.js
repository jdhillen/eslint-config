/**
 * Unit tests for framework detection logic
 *
 * Tests the auto-detection logic that identifies frameworks, environments,
 * and TypeScript from package.json and project files.
 */

import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

import { describe, it, expect, afterEach } from 'vitest';

import { detectFramework, detectEnvironment, detectTypeScript, autoDetect } from '../../src/detectors.js';

const TEST_DIR = join(process.cwd(), 'tests', '.temp-detectors');

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

describe('Framework Detection', () => {
  afterEach(() => {
    cleanup();
  });

  it('should detect React from react package', () => {
    setup({ dependencies: { react: '^18.0.0', 'react-dom': '^18.0.0' } });
    expect(detectFramework(TEST_DIR)).toBe('react');
  });

  it('should detect React from Next.js meta-framework', () => {
    setup({ dependencies: { next: '^15.0.0' } });
    expect(detectFramework(TEST_DIR)).toBe('react');
  });

  it('should detect Vue from vue package', () => {
    setup({ dependencies: { vue: '^3.0.0' } });
    expect(detectFramework(TEST_DIR)).toBe('vue');
  });

  it('should detect Vue from Nuxt meta-framework', () => {
    setup({ dependencies: { nuxt: '^3.0.0' } });
    expect(detectFramework(TEST_DIR)).toBe('vue');
  });

  it('should detect Svelte from svelte package', () => {
    setup({ dependencies: { svelte: '^5.0.0' } });
    expect(detectFramework(TEST_DIR)).toBe('svelte');
  });

  it('should detect Svelte from SvelteKit meta-framework', () => {
    setup({ dependencies: { '@sveltejs/kit': '^2.0.0' } });
    expect(detectFramework(TEST_DIR)).toBe('svelte');
  });

  it('should detect Solid.js from solid-js package', () => {
    setup({ dependencies: { 'solid-js': '^1.0.0' } });
    expect(detectFramework(TEST_DIR)).toBe('solid');
  });

  it('should detect Astro from astro package', () => {
    setup({ dependencies: { astro: '^5.0.0' } });
    expect(detectFramework(TEST_DIR)).toBe('astro');
  });

  it('should detect Angular from @angular/core package', () => {
    setup({ dependencies: { '@angular/core': '^18.0.0' } });
    expect(detectFramework(TEST_DIR)).toBe('angular');
  });

  it('should detect Node.js backend from Express', () => {
    setup({
      type: 'module',
      dependencies: { express: '^4.0.0' }
    });
    expect(detectFramework(TEST_DIR)).toBe('node');
  });

  it('should detect Node.js backend from Fastify', () => {
    setup({
      type: 'module',
      dependencies: { fastify: '^4.0.0' }
    });
    expect(detectFramework(TEST_DIR)).toBe('node');
  });

  it('should detect Node.js backend from Koa', () => {
    setup({
      type: 'module',
      dependencies: { koa: '^2.0.0' }
    });
    expect(detectFramework(TEST_DIR)).toBe('node');
  });

  it('should detect Node.js backend from server.js file only', () => {
    setup({ type: 'module', dependencies: {} });
    const serverFile = join(TEST_DIR, 'server.js');
    writeFileSync(serverFile, 'console.log("server");');
    expect(detectFramework(TEST_DIR)).toBe('node');
  });

  it('should default to vanilla with no framework detected', () => {
    setup({ dependencies: {} });
    expect(detectFramework(TEST_DIR)).toBe('vanilla');
  });
});

describe('Environment Detection', () => {
  afterEach(() => {
    cleanup();
  });

  it('should use browser environment for React', () => {
    setup({ dependencies: { react: '^18.0.0' } });
    expect(detectEnvironment('react', TEST_DIR)).toBe('browser');
  });

  it('should use node environment for Node.js backend', () => {
    setup({ dependencies: { express: '^4.0.0' } });
    expect(detectEnvironment('node', TEST_DIR)).toBe('node');
  });

  it('should use universal environment for Astro', () => {
    setup({ dependencies: { astro: '^5.0.0' } });
    expect(detectEnvironment('astro', TEST_DIR)).toBe('universal');
  });

  it('should detect universal environment with server directory', () => {
    setup({ dependencies: {} });
    const serverDir = join(TEST_DIR, 'server');
    mkdirSync(serverDir, { recursive: true });
    expect(detectEnvironment('vanilla', TEST_DIR)).toBe('universal');
  });

  it('should detect universal environment with api directory', () => {
    setup({ dependencies: {} });
    const apiDir = join(TEST_DIR, 'api');
    mkdirSync(apiDir, { recursive: true });
    expect(detectEnvironment('vanilla', TEST_DIR)).toBe('universal');
  });

  it('should detect universal environment with backend directory', () => {
    setup({ dependencies: {} });
    const backendDir = join(TEST_DIR, 'backend');
    mkdirSync(backendDir, { recursive: true });
    expect(detectEnvironment('vanilla', TEST_DIR)).toBe('universal');
  });
});

describe('TypeScript Detection', () => {
  afterEach(() => {
    cleanup();
  });

  it('should detect TypeScript from tsconfig.json', () => {
    setup({}, { 'tsconfig.json': '{}' });
    expect(detectTypeScript(TEST_DIR)).toBe(true);
  });

  it('should not detect TypeScript without tsconfig.json', () => {
    setup({});
    expect(detectTypeScript(TEST_DIR)).toBe(false);
  });
});

describe('Auto-Detect Integration', () => {
  afterEach(() => {
    cleanup();
  });

  it('should fully detect Next.js project with TypeScript', () => {
    setup(
      { dependencies: { next: '^15.0.0', react: '^18.0.0' } },
      { 'tsconfig.json': '{}' }
    );
    const detection = autoDetect(TEST_DIR);
    expect(detection.framework).toBe('react');
    expect(detection.environment).toBe('browser');
    expect(detection.typescript).toBe(true);
  });

  it('should fully detect Node.js backend with TypeScript', () => {
    setup(
      {
        type: 'module',
        dependencies: { express: '^4.0.0' }
      },
      { 'tsconfig.json': '{}' }
    );
    const detection = autoDetect(TEST_DIR);
    expect(detection.framework).toBe('node');
    expect(detection.environment).toBe('node');
    expect(detection.typescript).toBe(true);
  });
});
