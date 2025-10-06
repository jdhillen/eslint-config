import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

/**
 * Read and parse package.json from a directory
 * @param {string} cwd - Directory path
 * @returns {Object|null} Parsed package.json or null if not found
 */
export function readPackageJson(cwd) {
  const packagePath = join(cwd, 'package.json');

  if (!existsSync(packagePath)) {
    return null;
  }

  try {
    const content = readFileSync(packagePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.warn(`Warning: Failed to read package.json: ${error.message}`);
    return null;
  }
}

/**
 * Get all dependencies (dependencies + devDependencies) from package.json
 * @param {Object} pkg - Parsed package.json
 * @returns {Object} Combined dependencies
 */
export function getAllDependencies(pkg) {
  if (!pkg) {
    return {};
  }

  return {
    ...pkg.dependencies,
    ...pkg.devDependencies
  };
}
