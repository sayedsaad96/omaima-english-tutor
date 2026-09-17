import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from '@/components/ui/Accordion';

const items = [
  { id: 'q1', question: 'Are the lessons online?', answer: 'Yes — online-first.' },
  { id: 'q2', question: 'Who can join?', answer: 'Kids, teens and adults.' },
];

describe('Accordion', () => {
  it('toggles content on click with associated ids', async () => {
    const user = userEvent.setup({ delay: null });
    render(<Accordion items={items} />);

    const trigger = screen.getByRole('button', { name: 'Are the lessons online?' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-controls', 'accordion-panel-q1');
    expect(screen.getAllByRole('region', { hidden: true })).toHaveLength(2);

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Yes — online-first.')).toBeVisible();

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles with keyboard activation', async () => {
    const user = userEvent.setup({ delay: null });
    render(<Accordion items={items} />);

    const trigger = screen.getByRole('button', { name: 'Who can join?' });
    trigger.focus();
    await user.keyboard('{Enter}');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Kids, teens and adults.')).toBeVisible();

    await user.keyboard(' ');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
