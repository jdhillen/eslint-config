/**
 * Vanilla JavaScript/TypeScript configuration
 * No framework-specific rules - just modern JavaScript best practices
 * Perfect for: libraries, utilities, Node.js apps without frameworks
 */
export default function createVanillaPreset() {
  return [
    {
      files: ['**/*.js', '**/*.ts', '**/*.tsx'],
      rules: {
        // No framework-specific rules
        // All rules come from base.js and typescript.js presets
      }
    }
  ];
}
