module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'standard-preact'
  ],
  overrides: [
    {
      files: ['*.jsx', '*.js']
    }
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
  },
  settings: {
    react: {
        version: 'latest'
    }
  }
}
