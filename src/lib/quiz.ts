export type QuizChoice = 'a' | 'b' | 'c';
export type QuizResultBand = 'foundations' | 'elementary' | 'preIntermediate' | 'intermediatePlus';

export function scoreQuiz(answers: readonly string[], answerKey: readonly QuizChoice[]): number {
  return answerKey.reduce((score, correct, index) => score + (answers[index] === correct ? 1 : 0), 0);
}

export function getQuizBand(score: number): QuizResultBand {
  if (score <= 2) return 'foundations';
  if (score <= 4) return 'elementary';
  if (score <= 6) return 'preIntermediate';
  return 'intermediatePlus';
}
