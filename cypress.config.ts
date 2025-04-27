import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "q7m5ko",
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
