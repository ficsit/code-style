const prettier = require('prettier');
const extensions = prettier.getSupportInfo().languages.flatMap(l => l.extensions);

// https://prettier.io/docs/en/options.html
const prettierConfig = {
  // We expand beyond the default 80, as TypeScript code can be pretty hard to
  // read when it is heavily line wrapped.
  //
  // Note that the eslint config does restrict comments to 80 columns.
  printWidth: 110,
  // JS community standard.
  tabWidth: 2,
  // JS community standard.
  useTabs: false,
  // JS community standard.
  semi: true,
  // JS community standard.
  singleQuote: true,
  // Respect the input use of quotes in object properties.
  quoteProps: 'preserve',
  // We prefer single quotes in all contexts.
  jsxSingleQuote: true,
  // Consistent commas make it easier to move code around, and result in less
  // noise when diffing changes.
  trailingComma: 'all',
  // JS community standard.
  bracketSpacing: true,
  // JS community standard.
  jsxBracketSameLine: false,
  // JS community standard (for single line arrow functions).
  arrowParens: 'avoid',
  // Don't screw with line wrapping in markdown.
  proseWrap: 'preserve',
  // Be consistent about line endings for all environments.
  endOfLine: 'lf',
};

// https://github.com/prettier/eslint-plugin-prettier
module.exports = {
  overrides: [
    {
      files: extensions.map(e => `**${e}`),

      plugins: ['prettier'],

      rules: {
        'prettier/prettier': [
          'error',
          {
            ...prettierConfig,
            // By default, the prettier plugin assumes all non-TS/JS files are
            // formats where TS/JS can be embedded (e.g. html), and only formats the
            // embedded content. We need to disable that so that we can handle all
            // file formats and all content.
            //
            // https://github.com/prettier/eslint-plugin-prettier/blob/master/eslint-plugin-prettier.js#L189-L219
            parser: null,
          },
        ],
      },
    },

    // Use the plugin's default parser for TS/JS files.
    {
      files: ['**.{js,jsx,ts,tsx}'],
      rules: {
        'prettier/prettier': ['error', prettierConfig],
      },
    },

    // Don't format licenses. They're sacred!
    {
      files: ['*LICENSE*'],
      rules: {
        'prettier/prettier': 'off',
      },
    },
  ],
};
