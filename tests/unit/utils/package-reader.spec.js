import { existsSync, readFileSync } from 'fs';

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { readPackageJson, getAllDependencies } from '../../../src/utils/package-reader.js';

vi.mock('fs');

describe('Package Reader Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('readPackageJson', () => {
    it('should return parsed package.json when file exists', () => {
      const mockPackage = { name: 'test-package', version: '1.0.0' };
      existsSync.mockReturnValue(true);
      readFileSync.mockReturnValue(JSON.stringify(mockPackage));

      const result = readPackageJson('/test/path');

      expect(result).toEqual(mockPackage);
      expect(existsSync).toHaveBeenCalledWith('/test/path/package.json');
      expect(readFileSync).toHaveBeenCalledWith('/test/path/package.json', 'utf8');
    });

    it('should return null when package.json does not exist', () => {
      existsSync.mockReturnValue(false);

      const result = readPackageJson('/test/path');

      expect(result).toBeNull();
      expect(readFileSync).not.toHaveBeenCalled();
    });

    it('should return null and warn when JSON parsing fails', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      existsSync.mockReturnValue(true);
      readFileSync.mockReturnValue('invalid json {');

      const result = readPackageJson('/test/path');

      expect(result).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Warning: Failed to read package.json:')
      );

      consoleWarnSpy.mockRestore();
    });

    it('should return null and warn when readFileSync throws error', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      existsSync.mockReturnValue(true);
      readFileSync.mockImplementation(() => {
        throw new Error('Permission denied');
      });

      const result = readPackageJson('/test/path');

      expect(result).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Warning: Failed to read package.json: Permission denied'
      );

      consoleWarnSpy.mockRestore();
    });
  });

  describe('getAllDependencies', () => {
    it('should return combined dependencies and devDependencies', () => {
      const pkg = {
        dependencies: { react: '^18.0.0', vue: '^3.0.0' },
        devDependencies: { vitest: '^3.0.0', eslint: '^9.0.0' }
      };

      const result = getAllDependencies(pkg);

      expect(result).toEqual({
        react: '^18.0.0',
        vue: '^3.0.0',
        vitest: '^3.0.0',
        eslint: '^9.0.0'
      });
    });

    it('should return empty object when pkg is null', () => {
      const result = getAllDependencies(null);

      expect(result).toEqual({});
    });

    it('should return empty object when pkg is undefined', () => {
      const result = getAllDependencies(undefined);

      expect(result).toEqual({});
    });

    it('should handle missing dependencies field', () => {
      const pkg = {
        devDependencies: { vitest: '^3.0.0' }
      };

      const result = getAllDependencies(pkg);

      expect(result).toEqual({
        vitest: '^3.0.0'
      });
    });

    it('should handle missing devDependencies field', () => {
      const pkg = {
        dependencies: { react: '^18.0.0' }
      };

      const result = getAllDependencies(pkg);

      expect(result).toEqual({
        react: '^18.0.0'
      });
    });

    it('should return empty object when both dependency fields are missing', () => {
      const pkg = { name: 'test-package' };

      const result = getAllDependencies(pkg);

      expect(result).toEqual({});
    });
  });
});
