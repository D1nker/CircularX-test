module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'vue-global-api'
  ],
  rules: {
    'vue/no-unused-vars': 'error',
    'vue/script-setup-uses-vars': 'error'
  }
};
