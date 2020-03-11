module.exports = {
  // Our base configuration supports ALL file types (including Markdown, etc).
  parser: './support/textParser',
  // By default, ESLint ignores all dotfiles and directories.
  ignorePatterns: ['LICENSE.*', '/node_modules/*', '!.*'],

  extends: ['./prettier'],

  overrides: [
    // TypeScript + JavaScript files.
    {
      files: '**.{js,jsx,ts,tsx}',
      extends: ['./core'],
    },
  ],
};
