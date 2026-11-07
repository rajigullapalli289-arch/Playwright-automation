// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { on } from 'node:cluster';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 40000,
  expect: { timeout: 40 * 1000 },
  reporter: 'html',
  use: {
  headless: true,
  browserName: 'chromium',
  screenshot: 'on',
  trace: 'retain-on-failure', //off,on

  },
   
});

