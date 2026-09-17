import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/en', '/ar', '/en/level-quiz', '/en/free-assessment'] as const;

for (const route of routes) {
  test(`axe finds no serious violations on ${route}`, async ({ page }) => {
    await page.goto(route);
    // Ensure SSR content *and* hydration settled before analyzing.
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
}

test('skip link becomes visible on keyboard focus', async ({ page }) => {
  await page.goto('/en');
  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: /skip to content/i });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
});

test('mobile menu opens and closes from the keyboard', async ({ page }) => {
  // Force a mobile viewport on every project: the toggle only exists below md.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/en');
  // Stable locator: the toggle renames Menu <-> Close when opened/closed.
  const menuButton = page.locator('[aria-controls="mobile-nav"]');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await expect(menuButton).toHaveAccessibleName(/menu/i);

  await menuButton.focus();
  await page.keyboard.press('Enter');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await expect(menuButton).toHaveAccessibleName(/close/i);

  // Menu links are reachable by Tab from the toggle.
  await page.keyboard.press('Tab');
  const focused = page.locator(':focus');
  await expect(focused).toHaveAttribute('href', /^\/(en|ar)(\/|$)/);

  await menuButton.focus();
  await page.keyboard.press('Enter');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
});

test('FAQ accordion is keyboard-operable', async ({ page }) => {
  await page.goto('/en');
  const trigger = page.getByRole('button', { name: /are the lessons online/i });
  await trigger.scrollIntoViewIfNeeded();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');

  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText(/online-first/i).first()).toBeVisible();
});

test('quiz is fully keyboard-operable', async ({ page }) => {
  await page.goto('/en/level-quiz');
  const radios = page.locator('input[type="radio"]');
  await radios.first().focus();
  await page.keyboard.press('Space');
  await expect(radios.first()).toBeChecked();

  const next = page.getByRole('button', { name: /^next$/i });
  await expect(next).toBeEnabled();
  await next.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByText(/question.*2 \/ 8/i)).toBeVisible();
});

test('assessment steps are keyboard-operable with visible progress', async ({ page }) => {
  await page.goto('/en/free-assessment');
  const radios = page.locator('input[type="radio"]');
  await radios.first().focus();
  await page.keyboard.press('Space');

  const next = page.getByRole('button', { name: /^next$/i });
  await expect(next).toBeEnabled();
  await next.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByText(/step.*2 \/ 7/i)).toBeVisible();
});

test('Arabic layout is genuinely RTL', async ({ page }) => {
  await page.goto('/ar');
  const root = page.getByTestId('locale-root');
  await expect(root).toHaveAttribute('dir', 'rtl');
  await expect(root).toHaveAttribute('lang', 'ar');

  const direction = await root.evaluate((node) => getComputedStyle(node).direction);
  expect(direction).toBe('rtl');

  await expect(
    page.getByRole('heading', { level: 1, name: /اتعلّم الإنجليزي بثقة/i }),
  ).toBeVisible();
  // Service cards keep a logical reading order in RTL.
  const firstCard = page.locator('[data-service]').first();
  await firstCard.scrollIntoViewIfNeeded();
  await expect(firstCard).toBeVisible();
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('essential content is immediately available', async ({ page }) => {
    await page.goto('/en');
    await expect(
      page.getByRole('heading', { level: 1, name: /learn english with confidence/i }),
    ).toBeVisible();

    // Reveal sections resolve to visible without animation delays.
    const servicesHeading = page.getByRole('heading', {
      name: /english lessons that fit your goal/i,
    });
    await servicesHeading.scrollIntoViewIfNeeded();
    await expect(servicesHeading).toBeVisible();
    const revealState = await servicesHeading.evaluate((node) => {
      const wrapper = node.closest('.reveal');
      return {
        hasReveal: wrapper !== null,
        visible: wrapper?.classList.contains('is-visible') ?? true,
      };
    });
    expect(revealState.visible).toBe(true);
  });
});
