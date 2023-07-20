const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://restful-booker.herokuapp.com',
    viewportHeight: 1080,
    viewportWidth: 1920,
    retries: {
      runMode: 1,
      openMode: 0,
      },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
