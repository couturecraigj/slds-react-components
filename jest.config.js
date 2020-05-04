module.exports = {
  projects: [
    {
      displayName: 'dom',
      testEnvironment: 'jsdom',
      testMatch: ['**/__tests__/**/*.spec.(j|t)s?(x)']
    },
    {
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: [
        '**/__tests__/**/*.spec.node.(j|t)s?(x)',
      ]
    },
  ],
};