import { expect, test } from '@playwright/test';

async function completeChoiceScreens(page: import('@playwright/test').Page) {
  // Screens 1–3 bundle the seven booked fields; select the first option of
  // every visible question group, then advance. Scoped to main so the header
  // language switcher (role="group") is never picked up.
  for (let i = 0; i < 3; i += 1) {
    const groups = page.locator('main').getByRole('group');
    const groupCount = await groups.count();
    for (let g = 0; g < groupCount; g += 1) {
      await groups.nth(g).getByRole('radio').first().click();
    }
    await page.getByRole('button', { name: /^next$/i }).click();
  }
}

test('assessment completes in four screens and exposes a WhatsApp handoff', async ({ page }) => {
  await page.goto('/en/free-assessment');

  await completeChoiceScreens(page);
  await expect(page.getByText(/step.*4 \/ 4/i)).toBeVisible();

  await page.getByLabel(/your name/i).fill('Sara Ahmed');
  await page.getByLabel(/whatsapp number/i).fill('+201000000000');
  await page.getByRole('button', { name: /review my request/i }).click();

  await expect(page.getByText(/assessment request is ready/i)).toBeVisible();

  const whatsappLink = page.getByRole('link', { name: /continue on whatsapp/i });
  await expect(whatsappLink).toHaveAttribute('href', /wa\.me\/201111111111\?text=/);
  const href = (await whatsappLink.getAttribute('href')) ?? '';
  expect(decodeURIComponent(href)).toContain('Sara Ahmed');
});

test('direct visit without context shows no guidance banner', async ({ page }) => {
  await page.goto('/en/free-assessment');
  await expect(page.getByRole('note')).toHaveCount(0);
});

test('deep link carries service suggestion and quiz band as guidance', async ({ page }) => {
  await page.goto('/en/free-assessment?service=exam&path=intensive#quizBand=preIntermediate');

  const banner = page.getByRole('note');
  await expect(banner).toContainText(/coming from service/i);
  await expect(banner).toContainText(/exam preparation/i);
  await expect(banner).toContainText(/learning path/i);
  await expect(banner).toContainText(/intensive/i);
  await expect(banner).toContainText(/quiz result \(indicative\)/i);
  await expect(banner).toContainText(/pre-intermediate/i);

  // The service suggestion preselects a standard goal — still changeable.
  const screen1Groups = page.locator('main').getByRole('group');
  await screen1Groups.first().getByRole('radio').first().click();
  await screen1Groups.nth(1).getByRole('radio').first().click();
  await page.getByRole('button', { name: /^next$/i }).click();
  await expect(
    page.locator('main').getByRole('radio', { name: /exam preparation/i }),
  ).toBeChecked();

  // The quiz band never preselects the learner's own level estimate.
  const levelRadios = await page.locator('main').getByRole('group').nth(1).getByRole('radio').all();
  for (const radio of levelRadios) {
    await expect(radio).not.toBeChecked();
  }
});

test('unknown context values are ignored', async ({ page }) => {
  await page.goto('/en/free-assessment?service=hackme&path=zzz#quizBand=not-a-band');
  await expect(page.getByRole('note')).toHaveCount(0);
});

test('locale switch keeps only the allow-listed context ids', async ({ page }) => {
  await page.goto('/en/lessons?service=school&utm_source=leak#quizBand=elementary');
  await page.locator('header').getByRole('link', { name: 'العربية' }).click();
  await expect(page).toHaveURL('/ar/lessons?service=school#quizBand=elementary');
});
