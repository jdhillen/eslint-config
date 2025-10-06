/**
 * Unit tests for imports preset
 */

import { describe, it, expect } from 'vitest';

import importsPreset from '../../../src/presets/imports.js';

describe('Imports Preset', () => {
  it('should export object with rules', () => {
    expect(importsPreset).toBeInstanceOf(Object);
    expect(importsPreset.rules).toBeDefined();
  });

  it('should define import/export rules', () => {
    expect(importsPreset.rules['import/order']).toBeDefined();
    expect(importsPreset.rules['import/no-unresolved']).toBeDefined();
  });

  it('should have import plugin configured', () => {
    expect(importsPreset.plugins).toBeDefined();
    expect(importsPreset.plugins.import).toBeDefined();
  });
});
