import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('prototype has no automatically detected serious or critical axe violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter(v => ['serious', 'critical'].includes(v.impact ?? ''));
  expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
});
