import astro from 'eslint-plugin-astro';

/**
 * Astro framework configuration
 * Rules for Astro components and island architecture
 *
 * Rules organized by category:
 * - Component best practices
 * - Island architecture
 * - Template syntax
 * - Accessibility
 */
export default function createAstroPreset() {
  return [
    ...astro.configs.recommended,
    ...astro.configs['jsx-a11y-recommended'],
    {
      files: ['**/*.astro'],
      rules: {
        // Component Best Practices (5 rules)
        'astro/no-conflict-set-directives': 'error',    // Avoid conflicting set directives
        'astro/no-unused-define-vars-in-style': 'error', // Remove unused CSS variables
        'astro/no-deprecated-astro-canonicalurl': 'error', // Use new canonical URL API
        'astro/no-deprecated-astro-fetchcontent': 'error', // Use new content collections
        'astro/no-deprecated-astro-resolve': 'error',   // Use new module resolution

        // Template Syntax (4 rules)
        'astro/valid-compile': 'error',                 // Ensure valid Astro syntax
        'astro/no-set-html-directive': 'warn',          // Warn about XSS risk
        'astro/semi': ['error', 'always'],              // Consistent semicolons in frontmatter
        'astro/prefer-class-list-directive': 'error',   // Use class:list over className

        // Accessibility (included from jsx-a11y-recommended preset)
        // - alt-text, click-events-have-key-events, etc.
      }
    }
  ];
}
