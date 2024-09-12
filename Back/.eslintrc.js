module.exports = {
  parser: '@typescript-eslint/parser', 
  parserOptions: {
    project: './Back/tsconfig.json',
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'eslint-config-nestjs', 
  ],
  rules: {
   
  },
};