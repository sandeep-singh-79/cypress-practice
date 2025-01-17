const { defineConfig } = require("cypress");
import {tagify} from 'cypress-tags';

module.exports = defineConfig({
  e2e: {
    // baseUrl: "https://www.saucedemo.com", // Define base URL
    baseUrl: "https://thinking-tester-contact-list.herokuapp.com/", // Define base URL
    testIsolation: true, // enable test isolation
    reporter: "cypress-mochawesome-reporter", // Reporter for test results
    setupNodeEvents(on, config) {
      // Add plugins here (e.g., for Allure reporting)
      /* require("@shelex/cypress-allure-plugin/writer")(on, config); */
      require("cypress-mochawesome-reporter/plugin")(on);
      on("file:preprocessor", tagify(config));
      return config;
    },
    env: {
      token: "", // Environment variable for token
    },
    specPattern: "cypress/e2e/**/*.cy.js", // Test file pattern
    supportFile: "cypress/support/e2e.js", // Support file for custom commands
  },
});
