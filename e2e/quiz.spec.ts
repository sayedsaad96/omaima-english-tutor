import { expect, test } from '@playwright/test';
import { QUIZ_ANSWER_KEY, QUIZ_QUESTIONS } from '../src/content/quiz';

test('quiz completes and offers assessment, then retakes cleanly', async ({ page }) => {
  await page.goto('/en/level-quiz');

  for (let i = 0; i < QUIZ_QUESTIONS.length; i += 1) {
    const question = QUIZ_QUESTIONS[i];
    const choice = question.choices.find((c) => c.id === QUIZ_ANSWER_KEY[i])!;
    await page.getByRole('radio', { name: choice.label }).click();
    const isLast = i === QUIZ_QUESTIONS.length - 1;
    await page.getByRole('button', { name: isLast ? /see my result/i : /^next$/i }).click();
  }

  await expect(page.getByText(/only a quick estimate/i)).toBeVisible();
  await expect(
    page.getByRole('link', { name: /book my free assessment/i }),
  ).toHaveAttribute('href', '/en/free-assessment#quizBand=intermediatePlus');

  await page.getByRole('button', { name: /retake/i }).click();
  await expect(page.getByText(QUIZ_QUESTIONS[0].prompt)).toBeVisible();
});
