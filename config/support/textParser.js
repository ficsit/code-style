/**
 * A no-op ESLint parser that allows it to operate on non-JavaScript files.
 */
module.exports.parseForESLint = function parseForESLint(code) {
  return {
    ast: {
      type: 'Program',
      sourceType: 'module',
      body: [],
      tokens: [],
      comments: [],
      range: [0, code.length],
      loc: {
        start: {
          line: 1,
          column: 0,
        },
        end: {
          line: 1,
          column: code.length,
        },
      },
    },
  };
};
