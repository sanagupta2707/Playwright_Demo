import type { PlaywrightTestConfig } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 150 * 1000,
  workers: 1,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: false,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */

  outputDir: 'test-results/',
  reporter: [['allure-playwright', { outputFolder: 'allure-results' }], ['line']],
  globalSetup: require.resolve('./Utils/globalSetup'),
  globalTeardown: require.resolve('./Utils/globalTeardown'),

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */

    actionTimeout: 0,
    browserName: 'chromium',
    channel: 'chrome',
    headless: false,

    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'URL of the application',
    
    viewport: null,
    launchOptions: {
      args : ['--start-maximized']
    },
    screenshot: "on",
    video: {
      mode: "on",
      size: {
        //  width:1260,
        //  height:1080
        width: 1366,
        height: 768
      }
    },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
  },


};

export default config;



