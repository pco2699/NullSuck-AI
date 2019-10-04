module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2017,
    ecmaFeatures: {
      legacyDecorators: true
    },
    sourceType: 'module',
    project: "./tsconfig.json"
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended',
    'prettier/@typescript-eslint'
  ],
  plugins: [
    '@typescript-eslint',
    'vue',
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'camelcase': "off",
    "@typescript-eslint/camelcase": 0,
    'space-before-function-paren': 0
  }
};
