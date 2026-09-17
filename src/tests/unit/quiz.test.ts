import { describe, expect, it } from 'vitest';
import { getQuizBand, scoreQuiz } from '@/lib/quiz';

const key = ['b', 'c', 'a', 'b', 'c', 'a', 'b', 'c'] as const;

describe('quiz scoring', () => {
  it('scores one point per correct answer', () => {
    expect(scoreQuiz(['b', 'c', 'x', 'b', 'x', 'a', 'b', 'x'], key)).toBe(5);
  });

  it('maps low scores to foundations', () => {
    expect(getQuizBand(2)).toBe('foundations');
  });

  it('maps middle scores to pre-intermediate', () => {
    expect(getQuizBand(5)).toBe('preIntermediate');
  });

  it('maps high scores to intermediatePlus', () => {
    expect(getQuizBand(8)).toBe('intermediatePlus');
  });
});
