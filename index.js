const noRestrictedImportsRules = require('./noRestrictedImportsRules')

module.exports = {
  extends: [
    'eslint:recommended',
    'prettier',
  ],
  plugins: ['prettier', '@typescript-eslint/eslint-plugin'],
  rules: {
    'prettier/prettier': 'warn',

    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'no-restricted-imports': ['error', noRestrictedImportsRules],
    'object-shorthand': 'warn',
    'no-useless-rename': 'warn',
    'prefer-arrow-callback': 'error',

    /* Override recommended */
    'no-constant-condition': ['error', { "checkLoops": false }], // Allow `while (true)`
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        'no-undef': 'error', // No TypeScript here
        'no-unused-vars': ['warn', { ignoreRestSiblings: true, argsIgnorePattern: '^_' }],
      }
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      // You need specify parser, add this to your config:
      // parserOptions: {
      //   sourceType: 'module',
      //   project: './tsconfig.json',
      //   // https://github.com/typescript-eslint/typescript-eslint/issues/251
      //   tsconfigRootDir: __dirname,
      // },
      rules: {
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-misused-promises': 'error', // warn for `if (promise)` and `forEach(async () => ...)` (note: forEach takes void func)
        '@typescript-eslint/prefer-nullish-coalescing': ['warn', { forceSuggestionFixer: true }],
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
      }
    },
    {
      files: ['webpack*.config.js', '.eslintrc*.js'],
      globals: { module: true },
      env: { node: true },
    },
  ],
}
