/**
 * Unit tests for environment presets
 */

import { describe, it, expect } from 'vitest';

import browserEnv from '../../../src/presets/environments/browser.js';
import nodeEnv from '../../../src/presets/environments/node.js';
import universalEnv from '../../../src/presets/environments/universal.js';

describe('Browser Environment', () => {
  it('should export browser environment configuration', () => {
    expect(browserEnv.languageOptions).toBeDefined();
    expect(browserEnv.languageOptions.globals).toBeDefined();
    expect(browserEnv.languageOptions.ecmaVersion).toBe(2025);
  });

  it('should have browser globals', () => {
    expect(browserEnv.languageOptions.globals.window).toBeDefined();
    expect(browserEnv.languageOptions.globals.document).toBeDefined();
  });
});

describe('Node Environment', () => {
  it('should export node environment configuration', () => {
    expect(nodeEnv.languageOptions).toBeDefined();
    expect(nodeEnv.languageOptions.globals).toBeDefined();
    expect(nodeEnv.rules).toBeDefined();
  });

  it('should have Node.js globals', () => {
    expect(nodeEnv.languageOptions.globals.process).toBeDefined();
    expect(nodeEnv.languageOptions.globals.__dirname).toBeDefined();
  });

  it('should allow console in Node environment', () => {
    expect(nodeEnv.rules['no-console']).toBe('off');
  });
});

describe('Universal Environment', () => {
  it('should export universal environment configuration', () => {
    expect(universalEnv.languageOptions).toBeDefined();
    expect(universalEnv.languageOptions.globals).toBeDefined();
  });

  it('should have both browser and Node globals', () => {
    expect(universalEnv.languageOptions.globals.window).toBeDefined();
    expect(universalEnv.languageOptions.globals.process).toBeDefined();
  });
});
