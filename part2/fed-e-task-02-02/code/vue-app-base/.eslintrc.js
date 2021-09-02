module.exports = {
  env: {
      browser: true, // 标识代码运行在浏览器中， 使用浏览器的api不会提示错误
      es2020: true // ES版本是2020, 可以使用?., Promise.allSettled等
  },
  extends: [
      'standard',
  ],
  parserOptions: {
      ecmaVersion: 11
  },
}