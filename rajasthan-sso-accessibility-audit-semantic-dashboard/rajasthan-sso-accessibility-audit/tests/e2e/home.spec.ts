import { test, expect } from '@playwright/test';

test('home page exposes skip link and main landmark', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /skip to main content/i })).toBeAttached();
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('health-check vertical slice reaches the API', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /check api status/i }).click();
  await expect(page.getByRole('status')).toContainText('API ok');
});
