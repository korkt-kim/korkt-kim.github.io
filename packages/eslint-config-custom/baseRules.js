module.exports = {
    rules: {
      curly: 2,
      eqeqeq: 2,
  
      'nonblock-statement-body-position': 2,
  
      'simple-import-sort/imports': 2,
      'simple-import-sort/exports': 2,
  
      'import/no-unresolved': 0,
      'import/no-default-export': 2,
  
      'no-unused-vars': 0,
      '@typescript-eslint/no-unused-vars': [
        1,
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
  
      'no-redeclare': 0,
      '@typescript-eslint/no-redeclare': [2, { builtinGlobals: false }],
  
      'comma-dangle': 0,
      'prefer-const': 1,
    },
  }
  