import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AssessmentForm } from '@/components/assessment/AssessmentForm';
import { en } from '@/content/en';

const BUSINESS_NUMBER = '201111111111';

async function chooseFirstOption(user: ReturnType<typeof userEvent.setup>) {
  const group = screen.getByRole('group', { name: new RegExp(`${en.assessment.stepOf}|${en.assessment.questions.learnerFor.label}|${en.assessment.questions.ageGroup.label}|${en.assessment.questions.goal.label}|${en.assessment.questions.currentLevel.label}|${en.assessment.questions.format.label}`, 'i') });
  const radios = within(group).getAllByRole('radio');
  await user.click(radios[0]);
  await user.click(screen.getByRole('button', { name: new RegExp(`^${en.assessment.next}$`, 'i') }));
}

async function advanceToNameStep(user: ReturnType<typeof userEvent.setup>) {
  for (let i = 0; i < 5; i += 1) {
    await chooseFirstOption(user);
  }
}

describe('AssessmentForm', () => {
  it('blocks Next until the current required choice is selected', async () => {
    const user = userEvent.setup({ delay: null });
    render(<AssessmentForm dict={en} businessNumber={BUSINESS_NUMBER} />);

    const next = screen.getByRole('button', { name: new RegExp(`^${en.assessment.next}$`, 'i') });
    expect(next).toBeDisabled();

    const radios = screen.getAllByRole('radio');
    await user.click(radios[0]);
    expect(next).toBeEnabled();
  });

  it('shows an adjacent error for an invalid short name', async () => {
    const user = userEvent.setup({ delay: null });
    render(<AssessmentForm dict={en} businessNumber={BUSINESS_NUMBER} />);
    await advanceToNameStep(user);

    const nameInput = screen.getByLabelText(en.assessment.questions.name.label);
    await user.type(nameInput, 'A');
    await user.click(screen.getByRole('button', { name: new RegExp(`^${en.assessment.next}$`, 'i') }));

    const error = await screen.findByRole('alert');
    expect(error).toHaveTextContent(en.assessment.errors.name);
    expect(nameInput).toHaveAttribute('aria-describedby', error.id);
  });

  it('shows an adjacent error for an invalid WhatsApp value', async () => {
    const user = userEvent.setup({ delay: null });
    render(<AssessmentForm dict={en} businessNumber={BUSINESS_NUMBER} />);
    await advanceToNameStep(user);

    await user.type(screen.getByLabelText(en.assessment.questions.name.label), 'Sara Ahmed');
    await user.click(screen.getByRole('button', { name: new RegExp(`^${en.assessment.next}$`, 'i') }));

    const whatsappInput = screen.getByLabelText(en.assessment.questions.whatsapp.label);
    await user.type(whatsappInput, 'abc');
    await user.click(
      screen.getByRole('button', { name: new RegExp(en.assessment.submit, 'i') }),
    );

    const error = await screen.findByRole('alert');
    expect(error).toHaveTextContent(en.assessment.errors.whatsapp);
  });

  it('preserves previous selections after correcting a validation error', async () => {
    const user = userEvent.setup({ delay: null });
    render(<AssessmentForm dict={en} businessNumber={BUSINESS_NUMBER} />);
    await advanceToNameStep(user);

    const nameInput = screen.getByLabelText(en.assessment.questions.name.label);
    await user.type(nameInput, 'X');
    await user.click(screen.getByRole('button', { name: new RegExp(`^${en.assessment.next}$`, 'i') }));
    expect(await screen.findByRole('alert')).toBeVisible();

    await user.clear(nameInput);
    await user.type(nameInput, 'Sara Ahmed');
    await user.click(screen.getByRole('button', { name: new RegExp(`^${en.assessment.next}$`, 'i') }));
    await user.type(
      screen.getByLabelText(en.assessment.questions.whatsapp.label),
      '+201000000000',
    );
    await user.click(screen.getByRole('button', { name: new RegExp(en.assessment.submit, 'i') }));

    expect(await screen.findByText(en.assessment.success.title)).toBeVisible();
    // First choice of goal step was Conversation — earlier selections survived.
    expect(screen.getByText('Conversation', { selector: 'dd' })).toBeVisible();
    expect(screen.getByText('Sara Ahmed', { selector: 'dd' })).toBeVisible();
  });

  it('keeps a copyable message fallback when no business number is configured', async () => {
    const user = userEvent.setup({ delay: null });
    render(<AssessmentForm dict={en} businessNumber="" />);
    await advanceToNameStep(user);

    await user.type(screen.getByLabelText(en.assessment.questions.name.label), 'Sara Ahmed');
    await user.click(screen.getByRole('button', { name: new RegExp(`^${en.assessment.next}$`, 'i') }));
    await user.type(
      screen.getByLabelText(en.assessment.questions.whatsapp.label),
      '+201000000000',
    );
    await user.click(screen.getByRole('button', { name: new RegExp(en.assessment.submit, 'i') }));

    expect(await screen.findByText(en.assessment.success.title)).toBeVisible();
    expect(screen.queryByRole('link', { name: en.assessment.success.continueWhatsapp })).not.toBeInTheDocument();
    expect(screen.getByText(en.assessment.success.noNumberNote)).toBeVisible();

    const copyButton = screen.getByRole('button', { name: en.assessment.success.copyMessage });
    await user.click(copyButton);
    expect(await screen.findByRole('status')).toHaveTextContent(en.assessment.success.copied);
    expect(screen.getByDisplayValue(/Sara Ahmed/)).toBeVisible();
  });
});
