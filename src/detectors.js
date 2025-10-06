import { existsSync } from 'fs';
import { join } from 'path';

import { getAllDependencies, readPackageJson } from './utils/package-reader.js';

/**
 * Check for React meta-frameworks
 */
function detectReactMetaFramework(deps) {
  return deps.next || deps['@next/core'] || deps.remix || deps['@remix-run/react'] ||
    deps['@remix-run/node'] || deps.gatsby || deps['gatsby-link'];
}

/**
 * Check for Vue meta-frameworks
 */
function detectVueMetaFramework(deps) {
  return deps.nuxt || deps['nuxt3'];
}

/**
 * Check for Svelte meta-frameworks
 */
function detectSvelteMetaFramework(deps) {
  return deps['@sveltejs/kit'];
}

/**
 * Check for base framework dependencies
 */
function detectBaseFramework(deps) {
  if (deps.react || deps['react-dom']) return 'react';
  if (deps.vue || deps['@vue/runtime-core']) return 'vue';
  if (deps['@angular/core']) return 'angular';
  if (deps.svelte) return 'svelte';
  if (deps['solid-js']) return 'solid';
  if (deps.astro) return 'astro';
  return null;
}

/**
 * Check if project is a Node.js backend
 */
function isNodeBackend(pkg, deps, cwd) {
  if (pkg.type !== 'module') return false;

  const hasNodeFramework = deps.express || deps.fastify || deps.koa || deps['@hapi/hapi'];
  const hasServerFiles = existsSync(join(cwd, 'server.js')) ||
    existsSync(join(cwd, 'app.js')) ||
    (existsSync(join(cwd, 'index.js')) && existsSync(join(cwd, 'routes')));

  return hasNodeFramework || hasServerFiles;
}

/**
 * Detect the framework being used in the project
 * @param {string} cwd - Current working directory
 * @returns {string} Detected framework name
 */
export function detectFramework(cwd = process.cwd()) {
  const pkg = readPackageJson(cwd);

  if (!pkg) {
    console.warn('⚠️  Could not find package.json, defaulting to vanilla JavaScript');
    return 'vanilla';
  }

  const deps = getAllDependencies(pkg);

  // Check meta-frameworks first
  if (detectReactMetaFramework(deps)) return 'react';
  if (detectVueMetaFramework(deps)) return 'vue';
  if (detectSvelteMetaFramework(deps)) return 'svelte';

  // Check base frameworks
  const baseFramework = detectBaseFramework(deps);
  if (baseFramework) return baseFramework;

  // Check Node.js backend
  if (isNodeBackend(pkg, deps, cwd)) return 'node';

  // Default to vanilla JavaScript
  return 'vanilla';
}

/**
 * Detect the environment (browser, node, or universal)
 * @param {string} framework - Detected framework
 * @param {string} cwd - Current working directory
 * @returns {string} Environment type
 */
export function detectEnvironment(framework, cwd = process.cwd()) {
  // Framework-specific defaults
  if (framework === 'node') {
    return 'node';
  }

  // Frontend frameworks default to browser
  if (['react', 'vue', 'svelte', 'solid', 'angular'].includes(framework)) {
    return 'browser';
  }

  // Astro uses islands architecture (both browser and node)
  if (framework === 'astro') {
    return 'universal';
  }

  // Check for mixed environment indicators
  const hasServerCode =
    existsSync(join(cwd, 'server')) ||
    existsSync(join(cwd, 'api')) ||
    existsSync(join(cwd, 'backend'));

  if (hasServerCode) {
    return 'universal';
  }

  // Default to browser for frontend projects
  return 'browser';
}

/**
 * Detect if TypeScript is being used
 * @param {string} cwd - Current working directory
 * @returns {boolean} True if TypeScript is detected
 */
export function detectTypeScript(cwd = process.cwd()) {
  return existsSync(join(cwd, 'tsconfig.json'));
}

/**
 * Auto-detect all configuration options
 * @param {string} cwd - Current working directory
 * @returns {Object} Detected configuration
 */
export function autoDetect(cwd = process.cwd()) {
  const framework = detectFramework(cwd);
  const environment = detectEnvironment(framework, cwd);
  const typescript = detectTypeScript(cwd);

  return {
    framework,
    environment,
    typescript
  };
}
