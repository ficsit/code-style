// https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],

  overrides: [
    // Just TypeScript files.
    {
      files: '**.{ts,tsx}',
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
    },
  ],
};
