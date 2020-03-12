// For some reason, we can't override the parser effectively if it's declared
// at the top level of the config.
module.exports = {
  overrides: [
    {
      files: '**',
      parser: './support/textParser',
    },
  ],
};
