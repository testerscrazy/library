import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('http://example.com');
  const pageTitle = await page.title();
  expect(pageTitle).toBe('Example Domain');
});