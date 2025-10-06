/**
 * Unit tests for base preset
 */

import { describe, it, expect } from 'vitest';

import basePreset from '../../../src/presets/base.js';

describe('Base Preset', () => {
  it('should export object with rules', () => {
    expect(basePreset).toBeInstanceOf(Object);
    expect(basePreset).toHaveProperty('rules');
    expect(basePreset.rules).toBeInstanceOf(Object);
  });

  it('should define core JavaScript rules', () => {
    expect(basePreset.rules['prefer-const']).toBeDefined();
    expect(basePreset.rules['no-var']).toBeDefined();
    expect(basePreset.rules['no-console']).toBeDefined();
  });
});
