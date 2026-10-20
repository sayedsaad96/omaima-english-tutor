import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AssessmentForm } from '@/components/assessment/AssessmentForm';
import { en } from '@/content/en';

const BUSINESS_NUMBER = '201111111111';
const NEXT = new RegExp(`^${en.assessment.next}$`, 'i');
const SUBMIT = new RegExp(en.assessment.submit, 'i');

/** Chooses the first option of every visible question, then advances the screen. */
async function completeScreen(user: ReturnType<typeof userEvent.setup>) {
  const groups = screen.getAllByRole('group');
  for (const group of groups) {
    await user.click(within(group).getAllByRole('radio')[0]);
  }
  await user.click(screen.getByRole('button', { name: NEXT }));
}

/** Reaches the 4th screen (name & WhatsApp) with every choice answered. */
async function advanceToContactScreen(user: ReturnType<typeof userEvent.setup>) {
  for (let i = 0; i < 3; i += 1) {
    await completeScreen(user);
  }
}

/** Completes the form without a WhatsApp number so the copy fallback renders. */
async function completeToCopyFallback(user: ReturnType<typeof userEvent.setup>) {
  render(<AssessmentForm dict={en} businessNumber="" />);
  await advanceToContactScreen(user);
  await user.type(screen.getByLabelText(en.assessment.questions.name.label), 'Sara Ahmed');
  await user.type(
    screen.getByLabelText(en.assessment.questions.whatsapp.label),
    '+201000000000',
  );
  await user.click(screen.getByRole('button', { name: SUBMIT }));
  await screen.findByText(en.assessment.success.title);
}

function setClipboard(value: unknown) {
  Object.defineProperty(navigator, 'clipboard', {
    value,
    configurable: true,
    writable: true,
  });
}

afterEach(() => {
  setClipboard(undefined);
  // Reset the URL so context tests never leak into each other.
  window.history.replaceState(null, '', '/');
});

describe('AssessmentForm', () => {
  it('blocks Next until every required choice of the screen is selected', async () => {
    const user = userEvent.setup({ delay: null });
    render(<AssessmentForm dict={en} businessNumber={BUSINESS_NUMBER} />);

    const next = screen.getByRole('button', { name: NEXT });
    expect(next).toBeDisabled();

    // Screen 1 bundles two questions (learner & age) — both must be answered.
    const groups = screen.getAllByRole('group');
    expect(groups).toHaveLength(2);
    await user.click(within(groups[0]).getAllByRole('radio')[0]);
    expect(next).toBeDisabled();

    await user.click(within(groups[1]).getAllByRole('radio')[0]);
    expect(next).toBeEnabled();
  });

  it('keeps previously chosen values when navigating back across screens', async () => {
    const user = userEvent.setup({ delay: null });
    render(<AssessmentForm dict={en} businessNumber={BUSINESS_NUMBER} />);

    await user.click(within(screen.getAllByRole('group')[1]).getAllByRole('radio')[1]);
    await user.click(within(screen.getAllByRole('group')[0]).getAllByRole('radio')[0]);
    await user.click(screen.getByRole('button', { name: NEXT }));
    await user.click(screen.getByRole('button', { name: new RegExp(en.assessment.back, 'i') }));

    // The "My child" choice survived the round trip; the other one stayed.
    expect(within(screen.getAllByRole('group')[1]).getAllByRole('radio')[1]).toBeChecked();
    expect(within(screen.getAllByRole('group')[0]).getAllByRole('radio')[0]).toBeChecked();
  });

  it('shows an adjacent error for an invalid short name', async () => {
    const user = userEvent.setup({ delay: null });
    render(<AssessmentForm dict={en} businessNumber={BUSINESS_NUMBER} />);
    await advanceToContactScreen(user);

    const nameInput = screen.getByLabelText(en.assessment.questions.name.label);
    await user.type(nameInput, 'A');
    await user.click(screen.getByRole('button', { name: SUBMIT }));

    const error = await screen.findByRole('alert');
    expect(error).toHaveTextContent(en.assessment.errors.name);
    expect(nameInput).toHaveAttribute('aria-describedby', error.id);
  });

  it('moves focus to the new screen heading when advancing a step', async () => {
    const user = userEvent.setup({ delay: null });
    render(<AssessmentForm dict={en} businessNumber={BUSINESS_NUMBER} />);

    await completeScreen(user);

    expect(screen.getAllByRole('group').length).toBe(2);
    expect(document.activeElement).toHaveTextContent(en.assessment.questions.goal.label);
  });

  it('moves focus to the alert message when validation fails', async () => {
    const user = userEvent.setup({ delay: null });
    render(<AssessmentForm dict={en} businessNumber={BUSINESS_NUMBER} />);
    await advanceToContactScreen(user);

    const nameInput = screen.getByLabelText(en.assessment.questions.name.label);
    await user.type(nameInput, 'A');
    await user.click(screen.getByRole('button', { name: SUBMIT }));

    const error = await screen.findByRole('alert');
    expect(document.activeElement).toBe(error);
  });

  it('moves focus to the success heading on completion', async () => {
    const user = userEvent.setup({ delay: null });
    await completeToCopyFallback(user);
    expect(document.activeElement).toHaveTextContent(en.assessment.success.title);
  });

  it('shows a dedicated error for a name above 80 characters', async () => {
    const user = userEvent.setup({ delay: null });
    render(<AssessmentForm dict={en} businessNumber={BUSINESS_NUMBER} />);
    await advanceToContactScreen(user);

    const nameInput = screen.getByLabelText(en.assessment.questions.name.label);
    await user.type(nameInput, 'A'.repeat(81));
    await user.click(screen.getByRole('button', { name: SUBMIT }));

    const error = await screen.findByRole('alert');
    expect(error).toHaveTextContent(en.assessment.errors.nameTooLong);
  });

  it('shows an adjacent error for an invalid WhatsApp value', async () => {
    const user = userEvent.setup({ delay: null });
    render(<AssessmentForm dict={en} businessNumber={BUSINESS_NUMBER} />);
    await advanceToContactScreen(user);

    await user.type(screen.getByLabelText(en.assessment.questions.name.label), 'Sara Ahmed');
    await user.type(screen.getByLabelText(en.assessment.questions.whatsapp.label), 'abc');
    await user.click(screen.getByRole('button', { name: SUBMIT }));

    const error = await screen.findByRole('alert');
    expect(error).toHaveTextContent(en.assessment.errors.whatsapp);
    expect(
      screen.getByLabelText(en.assessment.questions.whatsapp.label),
    ).toHaveAttribute('aria-describedby', error.id);
  });

  it('rejects a WhatsApp value with formatting but no digits', async () => {
    const user = userEvent.setup({ delay: null });
    render(<AssessmentForm dict={en} businessNumber={BUSINESS_NUMBER} />);
    await advanceToContactScreen(user);

    await user.type(screen.getByLabelText(en.assessment.questions.name.label), 'Sara Ahmed');
    await user.type(screen.getByLabelText(en.assessment.questions.whatsapp.label), '--------');
    await user.click(screen.getByRole('button', { name: SUBMIT }));

    expect(await screen.findByRole('alert')).toHaveTextContent(en.assessment.errors.whatsapp);
  });

  it('shows an error for a WhatsApp value with too few digits', async () => {
    const user = userEvent.setup({ delay: null });
    render(<AssessmentForm dict={en} businessNumber={BUSINESS_NUMBER} />);
    await advanceToContactScreen(user);

    await user.type(screen.getByLabelText(en.assessment.questions.name.label), 'Sara Ahmed');
    await user.type(screen.getByLabelText(en.assessment.questions.whatsapp.label), '1234567');
    await user.click(screen.getByRole('button', { name: SUBMIT }));

    expect(await screen.findByRole('alert')).toHaveTextContent(en.assessment.errors.whatsapp);
  });

  it('preserves previous selections after correcting a validation error', async () => {
    const user = userEvent.setup({ delay: null });
    render(<AssessmentForm dict={en} businessNumber={BUSINESS_NUMBER} />);
    await advanceToContactScreen(user);

    const nameInput = screen.getByLabelText(en.assessment.questions.name.label);
    await user.type(nameInput, 'A');
    await user.click(screen.getByRole('button', { name: SUBMIT }));
    expect(await screen.findByRole('alert')).toBeVisible();

    await user.clear(nameInput);
    await user.type(nameInput, 'Sara Ahmed');
    await user.type(
      screen.getByLabelText(en.assessment.questions.whatsapp.label),
      '+201000000000',
    );
    await user.click(screen.getByRole('button', { name: SUBMIT }));

    expect(await screen.findByText(en.assessment.success.title)).toBeVisible();
    // Screen 2's first goal choice was Conversation — earlier selections survived.
    expect(screen.getByText('Conversation', { selector: 'dd' })).toBeVisible();
    expect(screen.getByText('Sara Ahmed', { selector: 'dd' })).toBeVisible();
  });
});

describe('AssessmentForm booking context', () => {
  it('renders no guidance banner on a direct visit without context', () => {
    render(<AssessmentForm dict={en} businessNumber={BUSINESS_NUMBER} />);
    expect(screen.queryByText(en.assessment.contextBanner.title)).not.toBeInTheDocument();
  });

  it('ignores unknown service/path/band values', async () => {
    window.history.replaceState(
      null,
      '',
      '/en/free-assessment?service=hackme&path=zzz#quizBand=not-a-band',
    );
    render(<AssessmentForm dict={en} businessNumber={BUSINESS_NUMBER} />);
    expect(screen.queryByText(en.assessment.contextBanner.title)).not.toBeInTheDocument();
  });

  it('suggests the goal for a known service id while keeping it changeable', async () => {
    const user = userEvent.setup({ delay: null });
    window.history.replaceState(null, '', '/en/free-assessment?service=exam');
    render(<AssessmentForm dict={en} businessNumber={BUSINESS_NUMBER} />);

    const bannerNote = (await screen.findByText(en.assessment.contextBanner.title)).closest(
      '[role="note"]',
    ) as HTMLElement;
    expect(within(bannerNote).getByText(/exam preparation/i)).toBeTruthy();

    // The suggestion preselects a standard option; the learner can advance and change it.
    await completeScreen(user);
    const goalGroup = screen
      .getAllByRole('group')
      .find((group) => within(group).queryByRole('radio', { name: /exam preparation/i }));
    expect(
      within(goalGroup as HTMLElement).getByRole('radio', { name: /exam preparation/i }),
    ).toBeChecked();
  });

  it('shows the quiz band as separate guidance without touching the level estimate', async () => {
    const user = userEvent.setup({ delay: null });
    window.history.replaceState(
      null,
      '',
      '/en/free-assessment#quizBand=preIntermediate',
    );
    render(<AssessmentForm dict={en} businessNumber={BUSINESS_NUMBER} />);

    expect(
      await screen.findByText(/quiz result \(indicative\)/i),
    ).toBeVisible();
    expect(screen.getByText(/pre-intermediate/i)).toBeTruthy();

    // Level stays untouched: nothing is preselected on its own screen.
    await completeScreen(user);
    const levelGroup = screen
      .getAllByRole('group')
      .find((group) => within(group).queryByRole('radio', { name: /not sure/i }));
    for (const radio of within(levelGroup as HTMLElement).getAllByRole('radio')) {
      expect(radio).not.toBeChecked();
    }
  });
});

describe('AssessmentSuccess copy messaging', () => {
  it('shows the no-number fallback UI without a WhatsApp link', async () => {
    const user = userEvent.setup({ delay: null });
    await completeToCopyFallback(user);

    expect(
      screen.queryByRole('link', { name: en.assessment.success.continueWhatsapp }),
    ).not.toBeInTheDocument();
    expect(screen.getByText(en.assessment.success.noNumberNote)).toBeVisible();
    expect(screen.getByDisplayValue(/Sara Ahmed/)).toBeVisible();
  });

  it('announces success only when the clipboard write actually succeeds', async () => {
    const writeText = vi.fn(() => Promise.resolve());
    const user = userEvent.setup({ delay: null });
    // user-event's setup() installs its own clipboard mock, so stub after it.
    setClipboard({ writeText });
    await completeToCopyFallback(user);

    await user.click(screen.getByRole('button', { name: en.assessment.success.copyMessage }));

    expect(await screen.findByRole('status')).toHaveTextContent(en.assessment.success.copied);
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('Sara Ahmed'));
  });

  it('announces failure when the clipboard rejects the write', async () => {
    const user = userEvent.setup({ delay: null });
    setClipboard({ writeText: () => Promise.reject(new Error('denied')) });
    await completeToCopyFallback(user);

    await user.click(screen.getByRole('button', { name: en.assessment.success.copyMessage }));

    expect(await screen.findByRole('alert')).toHaveTextContent(en.assessment.success.copyFailed);
    expect(screen.queryByRole('status')).toBeNull();
    expect(screen.getByText(en.assessment.success.noNumberNote)).toBeVisible();
  });

  it('announces failure when the clipboard API is unavailable', async () => {
    const user = userEvent.setup({ delay: null });
    setClipboard(undefined);
    await completeToCopyFallback(user);

    await user.click(screen.getByRole('button', { name: en.assessment.success.copyMessage }));

    expect(await screen.findByRole('alert')).toHaveTextContent(en.assessment.success.copyFailed);
    // The message stays available for manual selection and copying.
    expect(screen.getByDisplayValue(/Sara Ahmed/)).toBeVisible();
  });
});
