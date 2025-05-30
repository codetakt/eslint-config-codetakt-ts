const noRestrictedImportsRules = require('./noRestrictedImportsRules')

/** @return {import('eslint').Linter.Config[]} */
module.exports = function () {
  const js = require('@eslint/js')
  const tseslint = require('typescript-eslint')

  return [
    js.configs.recommended,
    tseslint.configs.eslintRecommended,
    ...tseslint.configs.recommended,
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: __dirname,
        },
      },
    },
    {
      name: 'eslint-config-codetakt-ts/base',
      rules: {
        eqeqeq: ['error', 'always', { null: 'ignore' }],
        'no-restricted-imports': ['error', noRestrictedImportsRules],
        'object-shorthand': 'warn',
        'no-useless-rename': 'warn',
        'prefer-arrow-callback': 'error',

        /* Override recommended */
        'no-constant-condition': ['error', { checkLoops: false }], // Allow `while (true)`
      },
    },
    {
      name: 'eslint-config-codetakt-ts/recommended',
      rules: {
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-misused-promises': 'error', // warn for `if (promise)` and `forEach(async () => ...)` (note: forEach takes void func)
        '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        '@typescript-eslint/prefer-optional-chain': 'warn',
        '@typescript-eslint/unbound-method': 'error', // Warn for unbound this of `foo(classInstance.method)` (`.bind(instance)` is required)

        /* Override recommended */
        '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true, argsIgnorePattern: '^_' }],
        // Keep enabled and allow namespace declaration in source (not definition) files.
        '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],

        /* Disable rules in recommended */
        // I think it is too strict to enforce Record<string, unknown> instead of {} (especially for default prop type parameter).
        '@typescript-eslint/ban-types': 'off',
        // Some API needs snake case type, and rarely violated
        '@typescript-eslint/camelcase': 'off',
        // Too explicit
        '@typescript-eslint/explicit-function-return-type': 'off',
        // It enforces all exported funcs to have explicit return type. Too explicit.
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        // Empty function is used to match to interface definition while it is actually no-op.
        '@typescript-eslint/no-empty-function': 'off',
        // Rewriting `interface Foobar extends Baz {}` to `type Foobar = Baz` is blah
        '@typescript-eslint/no-empty-interface': 'off',
        // Too strict
        '@typescript-eslint/no-non-null-assertion': 'off',
        // Allow hoisting
        '@typescript-eslint/no-use-before-define': 'off',
      },
    },
  ]
}
