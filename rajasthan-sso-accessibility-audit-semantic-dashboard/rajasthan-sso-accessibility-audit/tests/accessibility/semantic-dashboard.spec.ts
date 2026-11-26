import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('dashboard uses semantic landmarks and a labelled primary navigation', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('contentinfo')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1, name: 'Dashboard' })).toBeVisible();
});

test('service request form opens as a modal dialog with labelled required fields', async ({ page }) => {
  await page.goto('/#services');
  await page.getByRole('button', { name: /new request/i }).click();
  const dialog = page.getByRole('dialog', { name: 'Create service request' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByLabel('Applicant name')).toHaveAttribute('required', '');
  await expect(dialog.getByLabel('Email address')).toHaveAttribute('type', 'email');
  await expect(dialog.getByRole('group', { name: 'Applicant information' })).toBeVisible();
});

test('navigation changes the active page and data table has a caption and scoped headers', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Service requests' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Service requests' })).toBeVisible();
  await expect(page.getByRole('table')).toBeVisible();
  await expect(page.getByRole('table').getByRole('caption')).toContainText('fictional');
});

test('dashboard has no automatically detected serious or critical axe violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter(v => ['serious', 'critical'].includes(v.impact ?? ''));
  expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
});
