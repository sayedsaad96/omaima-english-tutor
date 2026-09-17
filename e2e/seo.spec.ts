import { expect, test } from '@playwright/test';

test('English about page exposes localized SEO metadata', async ({ page }) => {
  await page.goto('/en/about');
  await expect(page).toHaveTitle(/About Omaima/);
  const canonical = page.locator('link[rel="canonical"]');
  await expect(canonical).toHaveAttribute('href', /\/en\/about$/);
  await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveAttribute(
    'href',
    /\/ar\/about$/,
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
});

test('Arabic about page exposes localized SEO metadata', async ({ page }) => {
  await page.goto('/ar/about');
  await expect(page).toHaveTitle(/عن أميمة/);
  const canonical = page.locator('link[rel="canonical"]');
  await expect(canonical).toHaveAttribute('href', /\/ar\/about$/);
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
    'href',
    /\/en\/about$/,
  );
});
