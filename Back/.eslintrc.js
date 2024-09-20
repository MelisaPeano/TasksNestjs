module.exports = {
  parser: '@typescript-eslint/parser', 
  parserOptions: {
    project: './Back/tsconfig.json',
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'eslint-config-nestjs', 
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": "warn", 
  },
};