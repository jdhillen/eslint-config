import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
      include: ['src/**/*.js'],
      exclude: [
        'src/presets/frameworks/svelte.js',
        'src/presets/frameworks/solid.js',
        'src/presets/frameworks/astro.js',
        'node_modules/**',
        'tests/**'
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80
      }
    },
    mockReset: true,
    restoreMocks: true,
    clearMocks: true
  }
});
