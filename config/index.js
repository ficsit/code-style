module.exports = {
  // Our base configuration supports ALL file types (including Markdown, etc).
  parser: './support/textParser',
  // By default, ESLint ignores all dotfiles and directories.
  ignorePatterns: ['/node_modules/*', '!.*'],

  extends: ['./prettier', './core', './import', './react', './typescript'],
};
