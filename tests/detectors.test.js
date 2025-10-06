/**
 * Integration tests for framework detection
 *
 * These tests verify that the auto-detection logic correctly identifies
 * frameworks, environments, and TypeScript from package.json and project files.
 */

import { strict as assert } from 'assert';
import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

import { detectFramework, detectEnvironment, detectTypeScript, autoDetect } from '../src/detectors.js';

const TEST_DIR = join(process.cwd(), 'tests', '.temp');

function setup(packageJson = {}, files = {}) {
  // Clean up any existing test directory
  try {
    rmSync(TEST_DIR, { recursive: true, force: true });
  } catch {
    // Ignore if doesn't exist
  }

  // Create test directory
  mkdirSync(TEST_DIR, { recursive: true });

  // Write package.json
  writeFileSync(
    join(TEST_DIR, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  // Write additional files
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

// Framework Detection Tests
console.log('Running framework detection tests...\n');

// Test 1: React via react package
setup({ dependencies: { react: '^18.0.0', 'react-dom': '^18.0.0' } });
assert.equal(detectFramework(TEST_DIR), 'react', 'Should detect React from react package');
console.log('✓ Detects React from react package');
cleanup();

// Test 2: React via Next.js
setup({ dependencies: { next: '^15.0.0' } });
assert.equal(detectFramework(TEST_DIR), 'react', 'Should detect React from Next.js');
console.log('✓ Detects React from Next.js meta-framework');
cleanup();

// Test 3: Vue via vue package
setup({ dependencies: { vue: '^3.0.0' } });
assert.equal(detectFramework(TEST_DIR), 'vue', 'Should detect Vue from vue package');
console.log('✓ Detects Vue from vue package');
cleanup();

// Test 4: Vue via Nuxt
setup({ dependencies: { nuxt: '^3.0.0' } });
assert.equal(detectFramework(TEST_DIR), 'vue', 'Should detect Vue from Nuxt');
console.log('✓ Detects Vue from Nuxt meta-framework');
cleanup();

// Test 5: Svelte via svelte package
setup({ dependencies: { svelte: '^5.0.0' } });
assert.equal(detectFramework(TEST_DIR), 'svelte', 'Should detect Svelte from svelte package');
console.log('✓ Detects Svelte from svelte package');
cleanup();

// Test 6: Svelte via SvelteKit
setup({ dependencies: { '@sveltejs/kit': '^2.0.0' } });
assert.equal(detectFramework(TEST_DIR), 'svelte', 'Should detect Svelte from SvelteKit');
console.log('✓ Detects Svelte from SvelteKit meta-framework');
cleanup();

// Test 7: Solid.js
setup({ dependencies: { 'solid-js': '^1.0.0' } });
assert.equal(detectFramework(TEST_DIR), 'solid', 'Should detect Solid from solid-js package');
console.log('✓ Detects Solid.js from solid-js package');
cleanup();

// Test 8: Astro
setup({ dependencies: { astro: '^5.0.0' } });
assert.equal(detectFramework(TEST_DIR), 'astro', 'Should detect Astro from astro package');
console.log('✓ Detects Astro from astro package');
cleanup();

// Test 9: Angular
setup({ dependencies: { '@angular/core': '^18.0.0' } });
assert.equal(detectFramework(TEST_DIR), 'angular', 'Should detect Angular from @angular/core');
console.log('✓ Detects Angular from @angular/core package');
cleanup();

// Test 10: Node.js backend (Express)
setup({
  type: 'module',
  dependencies: { express: '^4.0.0' }
});
assert.equal(detectFramework(TEST_DIR), 'node', 'Should detect Node.js from express');
console.log('✓ Detects Node.js backend from Express');
cleanup();

// Test 11: Vanilla (no framework)
setup({ dependencies: {} });
assert.equal(detectFramework(TEST_DIR), 'vanilla', 'Should default to vanilla with no framework');
console.log('✓ Defaults to vanilla with no framework detected');
cleanup();

// Environment Detection Tests
console.log('\nRunning environment detection tests...\n');

// Test 12: Browser environment for React
setup({ dependencies: { react: '^18.0.0' } });
assert.equal(detectEnvironment('react', TEST_DIR), 'browser', 'React should use browser environment');
console.log('✓ React uses browser environment');
cleanup();

// Test 13: Node environment for backend
setup({ dependencies: { express: '^4.0.0' } });
assert.equal(detectEnvironment('node', TEST_DIR), 'node', 'Node framework should use node environment');
console.log('✓ Node.js backend uses node environment');
cleanup();

// Test 14: Universal environment for Astro
setup({ dependencies: { astro: '^5.0.0' } });
assert.equal(detectEnvironment('astro', TEST_DIR), 'universal', 'Astro should use universal environment');
console.log('✓ Astro uses universal environment');
cleanup();

// TypeScript Detection Tests
console.log('\nRunning TypeScript detection tests...\n');

// Test 15: TypeScript detected from tsconfig.json
setup({}, { 'tsconfig.json': '{}' });
assert.equal(detectTypeScript(TEST_DIR), true, 'Should detect TypeScript from tsconfig.json');
console.log('✓ Detects TypeScript from tsconfig.json');
cleanup();

// Test 16: No TypeScript without tsconfig.json
setup({});
assert.equal(detectTypeScript(TEST_DIR), false, 'Should not detect TypeScript without tsconfig.json');
console.log('✓ Does not detect TypeScript without tsconfig.json');
cleanup();

// Auto-Detect Integration Tests
console.log('\nRunning full auto-detect integration tests...\n');

// Test 17: Full Next.js project
setup(
  { dependencies: { next: '^15.0.0', react: '^18.0.0' } },
  { 'tsconfig.json': '{}' }
);
const nextDetection = autoDetect(TEST_DIR);
assert.equal(nextDetection.framework, 'react', 'Should detect React for Next.js');
assert.equal(nextDetection.environment, 'browser', 'Should detect browser environment');
assert.equal(nextDetection.typescript, true, 'Should detect TypeScript');
console.log('✓ Full Next.js project detection works');
cleanup();

// Test 18: Full Node.js backend
setup(
  {
    type: 'module',
    dependencies: { express: '^4.0.0' }
  },
  { 'tsconfig.json': '{}' }
);
const nodeDetection = autoDetect(TEST_DIR);
assert.equal(nodeDetection.framework, 'node', 'Should detect Node.js backend');
assert.equal(nodeDetection.environment, 'node', 'Should detect node environment');
assert.equal(nodeDetection.typescript, true, 'Should detect TypeScript');
console.log('✓ Full Node.js backend detection works');
cleanup();

// Final cleanup
cleanup();

console.log('\n✅ All tests passed!\n');
