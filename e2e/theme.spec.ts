import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('theme toggle switches modes and persists across reload', async ({ page }) => {
  await page.goto('/en');
  const html = page.locator('html');

  await expect(html).toHaveAttribute('data-theme', 'light');

  const toggle = page.getByRole('button', { name: /switch to dark mode/i });
  await toggle.click();
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await page.getByRole('button', { name: /switch to light mode/i }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('theme toggle is announced in Arabic on /ar', async ({ page }) => {
  await page.goto('/ar');
  const toggle = page.getByRole('button', { name: 'التبديل إلى الوضع الليلي' });
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('button', { name: 'التبديل إلى الوضع النهاري' })).toBeVisible();
});

test('axe finds no serious violations on dark home', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('omaima-theme', 'dark');
  });
  await page.goto('/en');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('main').getByRole('heading').first()).toBeVisible();
  await page.waitForLoadState('networkidle');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  const blocking = results.violations.filter(
    (violation) => violation.impact === 'serious' || violation.impact === 'critical',
  );
  expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
});
