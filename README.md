# eslint-config-codetakt-ts

Opinionated eslint config for TypeScript and (optionally) React projects.

## Installation

```js
module.exports = {
  // REQUIRED: Put extends option. react is optional.
  extends: ['codetakt-ts', 'codetakt-ts/react'],
  rules: {
    // You can customize global rules here.
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      // You can customize config only for JS files, optional.
      env: {
        es2020: true,
        node: true,
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        // REQUIRED: You need specify parser, add this to your config:
        // https://github.com/typescript-eslint/typescript-eslint/issues/251
        tsconfigRootDir: __dirname,
      },
      // You can customize config only for TS files, optional.
      rules: {
        // ...
      },
    },
  ],
}
```

### Customize config for no-restricted-imports rules

You can customize it by importing the config object placed as separated file.

```js
const { merge } = require('webpack-merge')
const noRestrictedImportsRulesWithoutLayoutEffect = merge(
  require('eslint-config-codetakt-ts/noRestrictedImportsRules'),
  {
    // Your config goes here.
  }
)
```

(`webpack-merge` is convenient for merging nested array/object structure)

## Philosophy

- Catch common mistakes but not to be too strict/verbose.
- Use standards like `eslint:recommended` and prettier for base config.
- Enable migration to latest syntax by linting.
- For `@typescript-eslint`:
  - `@typescript-eslint/recommended` includes more style rules than `eslint:recommended`.
  - Disable strict style config which not included in `eslint:recommended`, like `no-empty-function`.
  - Please consider to use `@typescript-eslint/no-explicit-any` in your config. It is currently not included.
  - TODO: Consider including `@typescript-eslint/recommended-requiring-type-checking`.
