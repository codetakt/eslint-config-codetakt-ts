/** @return {import('eslint').Linter.Config[]} */
module.exports = function () {
  const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')

  return [
    eslintPluginPrettierRecommended,
    {
      name: 'eslint-config-codetakt-ts/prettier',
      rules: {
        'prettier/prettier': 'warn',
      },
    },
  ]
}
