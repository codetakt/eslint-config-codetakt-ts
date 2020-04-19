const noRestrictedImportsRules = require('./noRestrictedImportsRules')

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['prettier', '@typescript-eslint/eslint-plugin'],
  rules: {
    'prettier/prettier': 'warn',

    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'no-restricted-imports': ['error', noRestrictedImportsRules],
    'object-shorthand': 'warn',
    'no-useless-rename': 'warn',
    'prefer-arrow-callback': 'error',
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': ['warn', { forceSuggestionFixer: true }],
    '@typescript-eslint/prefer-optional-chain': 'warn',

    /* Override recommended */
    'no-constant-condition': ['error', { "checkLoops": false }],
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true, argsIgnorePattern: '^_' }],

    /* Disable rules in recommended */
    // Some API needs snake case type, and rarely violated
    '@typescript-eslint/camelcase': 'off',
    // Too explicit
    '@typescript-eslint/explicit-function-return-type': 'off',
    // Prettier
    '@typescript-eslint/member-delimiter-style': 'off',
    // Empty function is used to match to interface definition while it is actually no-op.
    '@typescript-eslint/no-empty-function': 'off',
    // Too strict
    '@typescript-eslint/no-non-null-assertion': 'off',
    // Allow hoisting
    '@typescript-eslint/no-use-before-define': 'off',
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'no-undef': 'error' // No TypeScript here
      }
    },
    {
      files: ['webpack*.config.js', '.eslintrc*.js'],
      globals: { module: true },
      env: { node: true },
    },
  ],
}
