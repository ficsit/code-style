// https://github.com/benmosher/eslint-plugin-import#rules
module.exports = {
  overrides: [
    {
      files: ['**.{js,jsx,ts,tsx}'],

      plugins: ['import'],
      extends: ['plugin:import/errors', 'plugin:import/warnings', 'plugin:import/typescript'],

      // https://github.com/alexgorbatchev/eslint-import-resolver-typescript
      'settings': {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          'typescript': {
            'alwaysTryTypes': true,
          },
        },
      },

      rules: {
        'import/order': [
          'error',
          {
            groups: [['external', 'builtin'], 'internal', 'parent', 'sibling', 'index'],
            pathGroups: [{ 'pattern': '~/**', 'group': 'internal' }],
            'newlines-between': 'always',
            'alphabetize': { order: 'asc' },
          },
        ],

        'import/export': 'off',
      },
    },
  ],
};
