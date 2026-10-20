import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LevelQuiz } from '@/components/quiz/LevelQuiz';
import { en } from '@/content/en';
import { QUIZ_ANSWER_KEY, QUIZ_QUESTIONS } from '@/content/quiz';

async function answerAll(user: ReturnType<typeof userEvent.setup>, correct = true) {
  for (let i = 0; i < QUIZ_QUESTIONS.length; i += 1) {
    const choice = correct ? QUIZ_ANSWER_KEY[i] : 'x';
    const question = QUIZ_QUESTIONS[i];
    const validChoice = (question.choices as readonly { id: string; label: string }[]).some(
      (c) => c.id === choice,
    )
      ? choice
      : question.choices[0].id;
    const radio = screen.getByRole('radio', {
      name: (question.choices as readonly { id: string; label: string }[]).find(
        (c) => c.id === validChoice,
      )!.label,
    });
    await user.click(radio);
    const isLast = i === QUIZ_QUESTIONS.length - 1;
    await user.click(screen.getByRole('button', { name: isLast ? en.quiz.finish : en.quiz.next }));
  }
}

describe('LevelQuiz', () => {
  it('renders the first question with progress 1/8', () => {
    render(<LevelQuiz locale="en" dict={en} />);
    expect(screen.getByText(QUIZ_QUESTIONS[0].prompt)).toBeVisible();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1');
    expect(screen.getByText(/1\s*\/\s*8/)).toBeVisible();
  });

  it('enables Next only after selecting an answer and advances one question', async () => {
    const user = userEvent.setup({ delay: null });
    render(<LevelQuiz locale="en" dict={en} />);

    const next = screen.getByRole('button', { name: en.quiz.next });
    expect(next).toBeDisabled();

    await user.click(screen.getByRole('radio', { name: QUIZ_QUESTIONS[0].choices[0].label }));
    expect(next).toBeEnabled();

    await user.click(next);
    expect(screen.getByText(QUIZ_QUESTIONS[1].prompt)).toBeVisible();
    expect(screen.queryByText(QUIZ_QUESTIONS[0].prompt)).not.toBeInTheDocument();
  });

  it('moves focus to the new prompt when advancing', async () => {
    const user = userEvent.setup({ delay: null });
    render(<LevelQuiz locale="en" dict={en} />);

    await user.click(screen.getByRole('radio', { name: QUIZ_QUESTIONS[0].choices[0].label }));
    await user.click(screen.getByRole('button', { name: en.quiz.next }));

    expect(screen.getByText(QUIZ_QUESTIONS[1].prompt)).toBeVisible();
    expect(document.activeElement).toHaveTextContent(QUIZ_QUESTIONS[1].prompt);
  });

  it('shows an indicative result with disclaimer and supports retake', async () => {
    const user = userEvent.setup({ delay: null });
    render(<LevelQuiz locale="en" dict={en} />);

    await answerAll(user);

    expect(screen.getByText(en.quiz.disclaimer)).toBeVisible();
    expect(
      screen.getByRole('link', { name: en.quiz.bookCta }),
    ).toHaveAttribute('href', '/en/free-assessment#quizBand=intermediatePlus');

    await user.click(screen.getByRole('button', { name: en.quiz.retake }));
    expect(screen.getByText(QUIZ_QUESTIONS[0].prompt)).toBeVisible();
  });

  it('preserves the selected answer when navigating back', async () => {
    const user = userEvent.setup({ delay: null });
    render(<LevelQuiz locale="en" dict={en} />);

    const firstChoiceLabel = QUIZ_QUESTIONS[0].choices[1].label;
    await user.click(screen.getByRole('radio', { name: firstChoiceLabel }));
    await user.click(screen.getByRole('button', { name: en.quiz.next }));
    await user.click(screen.getByRole('button', { name: en.quiz.back }));

    expect(screen.getByRole('radio', { name: firstChoiceLabel })).toBeChecked();
  });

  it('exposes quiz semantics for assistive technology', () => {
    render(<LevelQuiz locale="en" dict={en} />);
    expect(screen.getByRole('group', { name: QUIZ_QUESTIONS[0].prompt })).toBeVisible();
    expect(
      within(screen.getByRole('group', { name: QUIZ_QUESTIONS[0].prompt })).getAllByRole('radio'),
    ).toHaveLength(3);
  });
});
