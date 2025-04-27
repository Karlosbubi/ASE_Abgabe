const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    env: {
      apiUrl: 'http://localhost:3000',
      websiteUrl: 'http://localhost:5173',
    },
    setupNodeEvents(on, config) {
      // Deine event handler hier
    },
  },
});