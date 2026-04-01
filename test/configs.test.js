/**
 * Smoke tests for eslint-config-codetakt-ts
 * Validates that all config exports produce valid ESLint Flat Config arrays.
 */
const assert = require('node:assert')
const { describe, it } = require('node:test')

const config = require('../index')

describe('eslint-config-codetakt-ts', () => {
  describe('exports', () => {
    it('should export configs object', () => {
      assert.ok(config.configs, 'configs should exist')
      assert.strictEqual(typeof config.configs, 'object')
    })

    it('should export noRestrictedImportsRules', () => {
      assert.ok(config.noRestrictedImportsRules, 'noRestrictedImportsRules should exist')
      assert.ok(Array.isArray(config.noRestrictedImportsRules.patterns), 'patterns should be array')
      assert.ok(Array.isArray(config.noRestrictedImportsRules.paths), 'paths should be array')
    })
  })

  describe('configs.recommended', () => {
    it('should return an array of flat config objects', () => {
      const configs = config.configs.recommended
      assert.ok(Array.isArray(configs), 'recommended should be an array')
      assert.ok(configs.length > 0, 'recommended should not be empty')
    })

    it('should contain valid flat config objects (no string plugins)', () => {
      const configs = config.configs.recommended
      for (const c of configs) {
        if (c.plugins) {
          assert.strictEqual(
            Array.isArray(c.plugins),
            false,
            `Config "${c.name || '(unnamed)'}" has plugins as array (eslintrc format). Must be object for flat config.`
          )
        }
      }
    })

    it('should not contain removed typescript-eslint rules', () => {
      const configs = config.configs.recommended
      const allRules = {}
      for (const c of configs) {
        if (c.rules) Object.assign(allRules, c.rules)
      }
      // These rules were removed in typescript-eslint v8
      assert.strictEqual('@typescript-eslint/ban-types' in allRules, false, 'ban-types should not be present (removed in v8)')
      assert.strictEqual('@typescript-eslint/camelcase' in allRules, false, 'camelcase should not be present (removed in v8)')
      assert.strictEqual('@typescript-eslint/no-empty-interface' in allRules, false, 'no-empty-interface should not be present (removed in v8)')
    })

    it('should use successor rules instead of removed ones', () => {
      const configs = config.configs.recommended
      const allRules = {}
      for (const c of configs) {
        if (c.rules) Object.assign(allRules, c.rules)
      }
      assert.ok('@typescript-eslint/no-restricted-types' in allRules, 'no-restricted-types should be present (successor of ban-types)')
      assert.ok('@typescript-eslint/no-empty-object-type' in allRules, 'no-empty-object-type should be present (successor of no-empty-interface)')
    })

    it('should not set tsconfigRootDir to __dirname', () => {
      const configs = config.configs.recommended
      for (const c of configs) {
        const rootDir = c.languageOptions?.parserOptions?.tsconfigRootDir
        if (rootDir) {
          // Should not point to this package's directory
          assert.notStrictEqual(
            rootDir,
            __dirname.replace('/test', ''),
            'tsconfigRootDir should not point to this package directory'
          )
        }
      }
    })
  })

  describe('configs.react', () => {
    it('should return an array of flat config objects', () => {
      const configs = config.configs.react
      assert.ok(Array.isArray(configs), 'react should be an array')
      assert.ok(configs.length > 0, 'react should not be empty')
    })

    it('should contain valid flat config objects (no string plugins)', () => {
      const configs = config.configs.react
      for (const c of configs) {
        if (c.plugins) {
          assert.strictEqual(
            Array.isArray(c.plugins),
            false,
            `Config "${c.name || '(unnamed)'}" has plugins as array (eslintrc format). Must be object for flat config.`
          )
        }
      }
    })

    it('should disable react-in-jsx-scope', () => {
      const configs = config.configs.react
      const allRules = {}
      for (const c of configs) {
        if (c.rules) Object.assign(allRules, c.rules)
      }
      assert.strictEqual(allRules['react/react-in-jsx-scope'], 'off', 'react-in-jsx-scope should be off for React 17+ JSX transform')
    })
  })

  describe('configs.prettier', () => {
    it('should return an array of flat config objects', () => {
      const configs = config.configs.prettier
      assert.ok(Array.isArray(configs), 'prettier should be an array')
      assert.ok(configs.length > 0, 'prettier should not be empty')
    })
  })

  describe('configs.all', () => {
    it('should return an array combining recommended + react + prettier', () => {
      const configs = config.configs.all
      assert.ok(Array.isArray(configs), 'all should be an array')
      assert.ok(configs.length > 0, 'all should not be empty')
      // all should be longer than any individual config
      assert.ok(configs.length >= config.configs.recommended.length, 'all should include recommended configs')
    })

    it('should contain valid flat config objects (no string plugins)', () => {
      const configs = config.configs.all
      for (const c of configs) {
        if (c.plugins) {
          assert.strictEqual(
            Array.isArray(c.plugins),
            false,
            `Config "${c.name || '(unnamed)'}" has plugins as array (eslintrc format). Must be object for flat config.`
          )
        }
      }
    })
  })
})
