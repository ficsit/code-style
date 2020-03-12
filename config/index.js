module.exports = {
  // By default, ESLint ignores all dotfiles and directories.
  ignorePatterns: ['/node_modules/*', '!.*'],

  extends: [
    // MUST come first.
    './text',

    './prettier',
    './core',
    './import',
    './typescript',
    './react',
  ],
};
