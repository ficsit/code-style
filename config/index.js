module.exports = {
  // Our base configuration supports ALL file types (including Markdown, etc).
  parser: './support/textParser',
  // By default, ESLint ignores all dotfiles and directories.
  ignorePatterns: ['/node_modules/*', '!.*'],

  env: {
    node: true,
  },

  extends: ['./prettier'],

  overrides: [
    // TypeScript + JavaScript files.
    {
      files: '**.{js,jsx,ts,tsx}',
      extends: ['./core', './typescript'],
    },
  ],
};
