import { expect, test } from '@playwright/test';

test('assessment completes and exposes a WhatsApp handoff', async ({ page }) => {
  await page.goto('/en/free-assessment');

  // Five choice steps: pick the first option each time.
  for (let i = 0; i < 5; i += 1) {
    await page.getByRole('radio').first().click();
    await page.getByRole('button', { name: /^next$/i }).click();
  }

  await page.getByLabel(/your name/i).fill('Sara Ahmed');
  await page.getByRole('button', { name: /^next$/i }).click();

  await page.getByLabel(/whatsapp number/i).fill('+201000000000');
  await page.getByRole('button', { name: /review my request/i }).click();

  await expect(page.getByText(/assessment request is ready/i)).toBeVisible();

  const whatsappLink = page.getByRole('link', { name: /continue on whatsapp/i });
  await expect(whatsappLink).toHaveAttribute('href', /wa\.me\/201111111111\?text=/);
  const href = (await whatsappLink.getAttribute('href')) ?? '';
  expect(decodeURIComponent(href)).toContain('Sara Ahmed');
});
