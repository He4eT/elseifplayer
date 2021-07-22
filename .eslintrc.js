module.exports = {
  extends: [
    'preact',
    'standard'
  ],
  overrides: [
    {
      files: ['*.jsx', '*.js']
    }
  ],
  rules: {
    'react/display-name': 'off'
  },
  settings: {
    react: {
      version: 'latest'
    }
  }
}
