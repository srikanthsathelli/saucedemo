import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['list'],
    ['junit', { outputFile: 'test-results/results.xml' }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: 'https://www.saucedemo.com/',
    trace: 'on-first-retry',
    testIdAttribute: 'data-test',
    screenshot: 'only-on-failure'
  },

  projects: [
    {
      name: 'login-setup',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/auth-setup.ts',
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
            storageState: 'playwright/.auth/standard_user.json'
       },
       dependencies: ['login-setup'],
    },
  ],

});
