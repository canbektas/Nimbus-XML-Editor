module.exports = {
  root: true,
  env: {
    // browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: ['plugin:vue/recommended'],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    'vue/max-attributes-per-line': 0,
    'vue/script-indent': ['error', 2, {'baseIndent': 1, 'switchCase': 1}],
    'vue/html-indent': ['error', 2],
    'quotes': ['error', 'single'],
    'space-before-function-paren': ['error', 'always'],
    // 'semi': ['error', 'never'],
    'vue/require-prop-types': 0,
    'vue/require-default-prop': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/singleline-html-element-content-newline': 0
  }
}
