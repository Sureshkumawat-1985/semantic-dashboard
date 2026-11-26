import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  use: { baseURL: 'http://localhost:5173', trace: 'on-first-retry' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    { command: 'npm run dev -w server', url: 'http://localhost:4000/api/health', reuseExistingServer: !process.env.CI },
    { command: 'npm run dev -w client', url: 'http://localhost:5173', reuseExistingServer: !process.env.CI }
  ]
});
