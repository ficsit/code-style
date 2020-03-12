// https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules
module.exports = {
  overrides: [
    {
      files: ['**.{jsx,tsx}'],

      plugins: ['react'],
      extends: ['plugin:react/recommended'],

      'settings': {
        'react': {
          version: 'detect',
        },
      },
    },
  ],
};
