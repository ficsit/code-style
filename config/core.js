// https://eslint.org/docs/rules/
module.exports = {
  overrides: [
    {
      files: ['**.{js,jsx,ts,tsx}'],

      env: {
        node: true,
      },

      extends: ['eslint:recommended'],
    },
  ],
};
