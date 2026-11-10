// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 40000,
  workers: 8, // run tests in 8 parallel workers
  retries: 2, // retry failed tests up to 2 times
  expect: { timeout: 40 * 1000 },
  reporter: 'html',

  projects: [
    {
      name: 'chromium',
      use: {
        headless: false,
        browserName: 'chromium',
        screenshot: 'on',
        trace: 'retain-on-failure', //off,on
        // video: 'retain-on-failure', //off,on // save video only on failure
        // viewport: { width: 1280, height: 720 }, // for web responsive testing 
        // ...devices['Galaxy S8'] // testing in device settings
        // ignoreHTTPSErrors: true, // ignore HTTPS errors
      },
    },

    {
      name: 'webkit',
      use: {
        headless: true,
        ...devices['Desktop Safari'],
        screenshot: 'on',
        trace: 'retain-on-failure',
      },
    },

  ],
});
