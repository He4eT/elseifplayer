module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'preact',
  ],
  'overrides': [
    {
      files: ['*.js', '*.jsx'],
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'rules': {
    'jest/no-deprecated-functions': 0,

    'arrow-parens': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],

    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
  }
}
