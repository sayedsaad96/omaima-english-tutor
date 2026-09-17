export const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    prompt: 'Choose the correct sentence.',
    choices: [
      { id: 'a', label: 'She go to school every day.' },
      { id: 'b', label: 'She goes to school every day.' },
      { id: 'c', label: 'She going to school every day.' },
    ],
  },
  {
    id: 'q2',
    prompt: 'Which word means the opposite of “expensive”?',
    choices: [
      { id: 'a', label: 'heavy' },
      { id: 'b', label: 'slow' },
      { id: 'c', label: 'cheap' },
    ],
  },
  {
    id: 'q3',
    prompt: 'Complete the sentence: “I ___ my homework yesterday.”',
    choices: [
      { id: 'a', label: 'finished' },
      { id: 'b', label: 'finish' },
      { id: 'c', label: 'finishing' },
    ],
  },
  {
    id: 'q4',
    prompt: 'Choose the correct question.',
    choices: [
      { id: 'a', label: 'Where you live?' },
      { id: 'b', label: 'Where do you live?' },
      { id: 'c', label: 'Where does you live?' },
    ],
  },
  {
    id: 'q5',
    prompt: 'Complete the sentence: “We have lived here ___ 2022.”',
    choices: [
      { id: 'a', label: 'for' },
      { id: 'b', label: 'during' },
      { id: 'c', label: 'since' },
    ],
  },
  {
    id: 'q6',
    prompt: 'Choose the best sentence.',
    choices: [
      { id: 'a', label: 'If I have time, I will call you.' },
      { id: 'b', label: 'If I will have time, I call you.' },
      { id: 'c', label: 'If I had time, I will call you.' },
    ],
  },
  {
    id: 'q7',
    prompt: 'Read: “Mona missed the bus, so she arrived late.” Why was Mona late?',
    choices: [
      { id: 'a', label: 'She woke up early.' },
      { id: 'b', label: 'She missed the bus.' },
      { id: 'c', label: 'She finished work early.' },
    ],
  },
  {
    id: 'q8',
    prompt: 'Choose the most natural sentence.',
    choices: [
      { id: 'a', label: 'I am interested to learn English.' },
      { id: 'b', label: 'I am interesting in learning English.' },
      { id: 'c', label: 'I am interested in learning English.' },
    ],
  },
] as const;

export const QUIZ_ANSWER_KEY = ['b', 'c', 'a', 'b', 'c', 'a', 'b', 'c'] as const;
