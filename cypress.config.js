const { defineConfig } = require("cypress");
const mochawesome = require('cypress-mochawesome-reporter/plugin');

module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,
    baseUrl: "https://automationexercise.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      mochawesome(on);
    },
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Cypress Automation Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    overwrite: false,
    html: true,
    json: true,
    timestamp: 'yyyy_mm_dd_HH_MM'
  }
});
