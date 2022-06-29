import { defineConfig } from 'cypress'

export default defineConfig({
  defaultCommandTimeout: 15000,
  retries: 4,
  screenshotsFolder: 'tests/integration/logs/screenshots',
  videosFolder: 'tests/integration/logs/videos',
  video: false,
  e2e: {
    specPattern: 'tests/integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/integration/config/support.ts',
    baseUrl: 'http://localhost:3000',
  },
})
