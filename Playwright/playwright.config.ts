import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",
  retries: 0,
  timeout: 120000,
  expect: {
    timeout: 100000,
  },
  use: {
    baseURL: "https://healthapp.yaksha.com",
    trace: "on",
    headless: false,
    screenshot: "only-on-failure",
    video: "retry-with-video",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1520, height: 1080 },
        launchOptions: {
          args: ["--disable-web-security"],
          slowMo: 1000,

        },
      },
    },
  ],

  reporter: [
    ["list"], // Default console output
    // Disabled custom reporter due to test loading conflict
    // [
    //   "./jest/PlaywrightCustomReporter.js", 
    //   { customOption: "value" } // Optional configuration for the custom reporter
    // ],
  ],
});
