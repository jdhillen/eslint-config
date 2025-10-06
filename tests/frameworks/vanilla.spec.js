/**
 * Tests for Vanilla JavaScript configuration
 */

import { describe, it, expect } from 'vitest';

import createVanillaPreset from '../../src/presets/frameworks/vanilla.js';

describe('Vanilla Preset', () => {
  it('should export factory function', () => {
    expect(createVanillaPreset).toBeInstanceOf(Function);
  });

  it('should return array of configs', () => {
    const preset = createVanillaPreset();
    expect(preset).toBeInstanceOf(Array);
    expect(preset.length).toBeGreaterThan(0);
  });
});
