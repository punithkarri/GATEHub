import { Question } from '../../types';

export const PYQS_2024_CS: Question[] = [
  {
    id: 'gate2024-cs-q15',
    questionNo: 15,
    year: 2024,
    paper: 'CS',
    subjectId: 'cd',
    subjectName: 'Compiler Design',
    topic: 'Parsing',
    subtopic: 'FIRST and FOLLOW Sets',
    type: 'MCQ',
    marks: 1,
    difficulty: 'Medium',
    questionText: 'Consider the following context-free grammar G:\nS → aA | b\nA → aA | ε\nWhich one of the following represents the correct FOLLOW(A) set?',
    options: [
      { id: 'A', text: '{ $ }' },
      { id: 'B', text: '{ a, $ }' },
      { id: 'C', text: '{ a, b }' },
      { id: 'D', text: '{ ε }' }
    ],
    correctAnswer: 'A',
    explanation: '1. Rule 1: Place $ in FOLLOW(S) as S is start symbol → FOLLOW(S) = { $ }.\n2. Rule 2: For production S → aA, A is at the right end. So FOLLOW(A) includes FOLLOW(S) = { $ }.\n3. Rule 3: For production A → aA, A is at the end. FOLLOW(A) includes FOLLOW(A).\nThus, FOLLOW(A) = { $ }.\nNote: FOLLOW sets NEVER contain ε!',
    conceptTested: 'FOLLOW set computation rules in top-down parser construction.',
    shortcutTrick: 'A appears only at the end of productions S → aA and A → aA, so FOLLOW(A) = FOLLOW(S) = { $ }.',
    source: 'Official GATE 2024 CS Master Paper (IISc Bangalore)',
    officialSourceLink: 'https://gate2025.iitr.ac.in',
    tags: ['GATE 2024', 'CS', 'Compiler', 'Parsing']
  },
  {
    id: 'gate2024-cs-q28',
    questionNo: 28,
    year: 2024,
    paper: 'CS',
    subjectId: 'algo',
    subjectName: 'Algorithms',
    topic: 'Dynamic Programming',
    subtopic: '0/1 Knapsack',
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    questionText: 'Which one of the following algorithmic paradigms guarantees finding an optimal solution for the 0/1 Knapsack Problem?',
    options: [
      { id: 'A', text: 'Greedy Strategy based on Value-to-Weight ratio' },
      { id: 'B', text: 'Dynamic Programming' },
      { id: 'C', text: 'Simple First-Fit Decreasing heuristic' },
      { id: 'D', text: 'Divide & Conquer without memoization' }
    ],
    correctAnswer: 'B',
    explanation: 'Greedy strategy fails on 0/1 Knapsack because items cannot be broken into fractions. Dynamic Programming guarantees exact optimal solution in O(N*W) pseudo-polynomial time by examining optimal subproblems.',
    conceptTested: '0/1 Knapsack vs Fractional Knapsack algorithmic optimal subproblem properties.',
    shortcutTrick: 'Greedy works for Fractional Knapsack; Dynamic Programming is required for 0/1 Knapsack.',
    source: 'Official GATE 2024 CS Master Paper (IISc Bangalore)',
    officialSourceLink: 'https://gate2025.iitr.ac.in',
    tags: ['GATE 2024', 'CS', 'Algorithms', 'Dynamic Programming']
  }
];
