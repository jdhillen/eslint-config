/**
 * Unit tests for TypeScript preset
 */

import { describe, it, expect } from 'vitest';

import typescriptPreset from '../../../src/presets/typescript.js';

describe('TypeScript Preset', () => {
  it('should export object with rules', () => {
    expect(typescriptPreset).toBeInstanceOf(Object);
    expect(typescriptPreset.rules).toBeDefined();
  });

  it('should define TypeScript-specific rules', () => {
    expect(typescriptPreset.rules['@typescript-eslint/no-unused-vars']).toBeDefined();
    expect(typescriptPreset.rules['@typescript-eslint/no-explicit-any']).toBeDefined();
  });
});
