import { expect, test } from '@playwright/test';

test('English home exposes the primary conversion journey', async ({ page }) => {
  await page.goto('/en');
  await expect(page.getByRole('heading', { level: 1, name: /learn english with confidence/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /book your free assessment/i }).first()).toBeVisible();
  await expect(page.getByText(/who are you learning for/i)).toBeVisible();
  await expect(page.getByText(/private english lessons/i)).toBeVisible();
});

test('home sections follow the approved conversion order', async ({ page }) => {
  await page.goto('/en');
  const headings = await page.locator('main h1, main h2').allInnerTexts();
  const normalized = headings.map((h) => h.toLowerCase());

  const expectedOrder = [
    /learn english with confidence/,
    /who are you learning for/,
    /english lessons that fit your goal/,
    /how learning with omaima works/,
    /discover your level in 2 minutes/,
    /free 15–20 minute assessment/,
    /choose your learning path/,
    /what students can expect/,
    /why learn with omaima/,
    /hi, i’m omaima/,
    /common questions/,
    /ready to make english feel easier/,
  ];

  let cursor = -1;
  for (const pattern of expectedOrder) {
    const found = normalized.findIndex((text, index) => index > cursor && pattern.test(text));
    expect(found, `expected heading matching ${pattern} after position ${cursor}`).toBeGreaterThan(cursor);
    cursor = found;
  }
});
