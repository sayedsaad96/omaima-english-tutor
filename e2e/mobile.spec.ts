import { expect, test } from '@playwright/test';

for (const route of ['/en', '/ar'] as const) {
  test(`hero booking CTA precedes the portrait at 360px on ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(route);

    const isArabic = route.endsWith('/ar');
    const cta = page.getByRole('link', {
      name: isArabic ? 'احجز تقييمك المجاني' : 'Book Your Free Assessment',
    });
    const portrait = page.getByRole('img', {
      name: isArabic ? /صورة أميمة عاشور/ : /Portrait of Omaima Ashour/,
    });

    const ctaBox = await cta.first().boundingBox();
    expect(ctaBox, 'hero CTA must be rendered').not.toBeNull();
    const portraitBox = await portrait.boundingBox();
    expect(portraitBox, 'hero portrait must be rendered').not.toBeNull();
    expect(ctaBox!.y).toBeLessThan(portraitBox!.y);
  });
}

for (const route of ['/en', '/ar'] as const) {
  test(`no horizontal overflow at 360px on ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return {
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
      };
    });
    expect(
      overflow.scrollWidth,
      `horizontal overflow on ${route}: scrollWidth=${overflow.scrollWidth} clientWidth=${overflow.clientWidth}`,
    ).toBeLessThanOrEqual(overflow.clientWidth + 1);
  });
}
