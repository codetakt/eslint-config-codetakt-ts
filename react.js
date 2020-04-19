module.exports = {
  extends: ['plugin:react/recommended', 'prettier/react'],
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/prop-types': 'off', // ensured by TypeScript
    'react/display-name': 'off', // too many useless warnings
    'react/jsx-boolean-value': 'error',
    'react/jsx-fragments': 'error',
    'react/jsx-key': ['warn', { checkFragmentShorthand: true }], // TODO: I want to disable for array literal, but is not supported for now. Let's PR to upstream.
    'react/self-closing-comp': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn' // want to make it error, but we should disable it for useEffect.
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
