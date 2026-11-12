// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 40000,
  workers: 4, // run tests in 4 parallel workers . default workers is half the number of CPU cores
  retries: process.env.CI ? 2 : 0, // retry failed tests up to 2 times on CI, locally no retries
  expect: { timeout: 40 * 1000 },
  fullyParallel: true, // run tests in parallel across all projects
    // Retry on CI only.


  reporter: 'html',

  projects: [

    {
      name: 'firefox',
      use: {
        headless: true,
        browserName: 'firefox',
        screenshot: 'on',
        trace: 'retain-on-failure',
      },
    },

  ],
});
