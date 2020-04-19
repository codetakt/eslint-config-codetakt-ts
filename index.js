const noRestrictedImportsRules = require('./noRestrictedImportsRules')

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['prettier', '@typescript-eslint/eslint-plugin'],
  rules: {
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'prettier/prettier': 'warn',

    'no-var': 'error',
    'prefer-const': 'warn',
    'no-undef': 'off', // ensured by TypeScript
    'no-restricted-imports': ['error', noRestrictedImportsRules],

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true, argsIgnorePattern: '^_' }],

    'no-useless-constructor': 'off', // throws in TypeScript https://github.com/typescript-eslint/typescript-eslint/issues/15
    '@typescript-eslint/no-useless-constructor': 'error',

    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    '@typescript-eslint/prefer-optional-chain': 'warn',

    // Disable rules in recommended
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    // TODO: Enable
    '@typescript-eslint/camelcase': 'off'
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'no-undef': 'error' // No TypeScript
      }
    },
    {
      files: ['webpack*.config.js', '.eslintrc*.js'],
      globals: { module: true },
      env: { node: true },
      rules: {
        strict: 'off'
      }
    }
  ]
}
