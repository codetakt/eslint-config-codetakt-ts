/** @return {import('eslint').Linter.Config[]} */
module.exports = function () {
  const reactPlugin = require('eslint-plugin-react')
  const reactHooks = require('eslint-plugin-react-hooks')

  return [
    reactPlugin.configs.flat.recommended,
    reactHooks.configs['recommended-latest'],
    {
      name: 'eslint-config-codetakt-ts/react',
      rules: {
        'react/jsx-boolean-value': 'warn',
        'react/jsx-curly-brace-presence': 'warn', // warn and auto fix for foo={'bar'}
        'react/jsx-fragments': 'warn',
        'react/jsx-no-useless-fragment': 'warn',
        'react/jsx-key': ['warn', { checkFragmentShorthand: true }], // TODO: I want to disable for array literal, but is not supported for now. Let's PR to upstream.
        'react/self-closing-comp': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn', // want to make it error, but we should disable it for useEffect.

        /* Disable rules in recommended */
        'react/prop-types': 'off', // ensured by TypeScript
        'react/display-name': 'off', // too many useless warnings
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
  ]
}
