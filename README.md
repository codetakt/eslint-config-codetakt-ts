# eslint-config-codetakt-ts

Opinionated eslint config for TypeScript and (optionally) React projects.

## Installation

```bash
# Add peer dependencies
yarn add -D @eslint/js eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks typescript typescript-eslint
# Add this package
yarn add -D eslint-config-codetakt-ts
```

## Configuration

```js
import codetaktTs from 'eslint-config-codetakt-ts'

export default [
  ...codetaktTs.configs.all,
  // You can customize rules here.
]
```

### Customize config for no-restricted-imports rules

You can customize it by importing the config object placed as separated file.

```js
import { merge } from 'webpack-merge'
import { noRestrictedImportsRules } from 'eslint-config-codetakt-ts'
const noRestrictedImportsRulesWithoutLayoutEffect = merge(
  noRestrictedImportsRules,
  {
    // Your config goes here.
  }
)
```

(`webpack-merge` is convenient for merging nested array/object structure)

## Philosophy

- Catch common mistakes but not to be too strict/verbose.
- Use standards like `js/recommended` and prettier for base config.
- Enable migration to latest syntax by linting.
- For `@typescript-eslint`:
  - Disable strict style config which not included in `js/recommended`, like `no-empty-function`.
  - Please consider to use `@typescript-eslint/no-explicit-any` in your config. It is currently not included.
  - TODO: Consider including `@typescript-eslint/recommended-requiring-type-checking`.
