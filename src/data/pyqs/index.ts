import { Question, PaperInfo } from '../../types';
import { PYQS_2025_CS1 } from './2025_cs1';
import { PYQS_2025_CS2 } from './2025_cs2';
import { PYQS_2024_CS } from './2024_cs';
import { PYQS_2023_CS } from './2023_cs';
import { PYQS_2022_CS } from './2022_cs';
import { PYQS_HISTORICAL_CS } from './historical_cs';

// Combine all verified PYQs into a unified dataset
export const ALL_GATE_PYQS: Question[] = [
  ...PYQS_2025_CS1,
  ...PYQS_2025_CS2,
  ...PYQS_2024_CS,
  ...PYQS_2023_CS,
  ...PYQS_2022_CS,
  ...PYQS_HISTORICAL_CS
];

export const getQuestionsByPaper = (year: number, paper: string): Question[] => {
  return ALL_GATE_PYQS.filter(q => q.year === year && (q.paper === paper || paper === 'CS' || q.paper === 'CS'))
    .sort((a, b) => a.questionNo - b.questionNo);
};

export const getQuestionsBySubject = (subjectId: string): Question[] => {
  return ALL_GATE_PYQS.filter(q => q.subjectId === subjectId);
};

export const getQuestionsByTopic = (topicName: string): Question[] => {
  const norm = topicName.toLowerCase();
  return ALL_GATE_PYQS.filter(q =>
    q.topic.toLowerCase().includes(norm) ||
    (q.subtopic && q.subtopic.toLowerCase().includes(norm)) ||
    q.conceptTested.toLowerCase().includes(norm)
  );
};

// Full Paper Metadata Catalog (2007 - 2025)
const RAW_CATALOG: Omit<PaperInfo, 'questionCount' | 'isVerified'>[] = [
  {
    id: '2025-CS-1',
    year: 2025,
    paper: 'CS-1',
    title: 'GATE 2025 Computer Science - Session 1 (Forenoon)',
    organizingInstitute: 'IIT Roorkee',
    totalMarks: 100,
    officialSourceUrl: 'https://gate2025.iitr.ac.in',
  },
  {
    id: '2025-CS-2',
    year: 2025,
    paper: 'CS-2',
    title: 'GATE 2025 Computer Science - Session 2 (Afternoon)',
    organizingInstitute: 'IIT Roorkee',
    totalMarks: 100,
    officialSourceUrl: 'https://gate2025.iitr.ac.in',
  },
  {
    id: '2024-CS',
    year: 2024,
    paper: 'CS',
    title: 'GATE 2024 Computer Science & Information Tech',
    organizingInstitute: 'IISc Bangalore',
    totalMarks: 100,
    officialSourceUrl: 'https://gate2025.iitr.ac.in',
  },
  {
    id: '2023-CS',
    year: 2023,
    paper: 'CS',
    title: 'GATE 2023 Computer Science & Information Tech',
    organizingInstitute: 'IIT Kanpur',
    totalMarks: 100,
    officialSourceUrl: 'https://gate2025.iitr.ac.in',
  },
  {
    id: '2022-CS',
    year: 2022,
    paper: 'CS',
    title: 'GATE 2022 Computer Science & Information Tech',
    organizingInstitute: 'IIT Kharagpur',
    totalMarks: 100,
    officialSourceUrl: 'https://gate2025.iitr.ac.in',
  },
  {
    id: '2021-CS',
    year: 2021,
    paper: 'CS',
    title: 'GATE 2021 Computer Science & Information Tech',
    organizingInstitute: 'IIT Bombay',
    totalMarks: 100,
    officialSourceUrl: 'https://gate2025.iitr.ac.in',
  },
  {
    id: '2020-CS',
    year: 2020,
    paper: 'CS',
    title: 'GATE 2020 Computer Science & Information Tech',
    organizingInstitute: 'IIT Delhi',
    totalMarks: 100,
    officialSourceUrl: 'https://gate2025.iitr.ac.in',
  },
  {
    id: '2019-CS',
    year: 2019,
    paper: 'CS',
    title: 'GATE 2019 Computer Science & Information Tech',
    organizingInstitute: 'IIT Madras',
    totalMarks: 100,
    officialSourceUrl: 'https://gate2025.iitr.ac.in',
  }
];

export const GATE_PAPERS_CATALOG: PaperInfo[] = RAW_CATALOG.map(item => {
  const qs = getQuestionsByPaper(item.year, item.paper);
  const count = qs.length;
  return {
    ...item,
    questionCount: count,
    isVerified: count >= 65
  };
});

/**
 * Returns exact paper completeness status.
 * If available questions < 65, labels it clearly as a "Partial Paper — XX/65 questions available".
 */
export const getPaperCompletenessInfo = (year: number, paper: string) => {
  const questions = getQuestionsByPaper(year, paper);
  const count = questions.length;
  const isComplete = count >= 65;

  return {
    isComplete,
    availableCount: count,
    totalExpected: 65,
    label: isComplete
      ? `Full Official Paper (65/65 Questions)`
      : `Partial Paper — ${count}/65 questions available`,
    questions
  };
};

/**
 * Generates a balanced 65-question GATE CSE Full Practice Paper from the entire database pool.
 * Clearly labeled: "Practice Paper — GATEHub Generated"
 */
export const generateFullPracticePaper = (paperTitle: string = 'GATEHub Full Practice Paper'): Question[] => {
  const gaQuestions = ALL_GATE_PYQS.filter(q => q.subjectId === 'ga');
  const coreQuestions = ALL_GATE_PYQS.filter(q => q.subjectId !== 'ga');

  const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => 0.5 - Math.random());

  // Target 10 GA questions & 55 Core CS questions
  const selectedGA = shuffle(gaQuestions).slice(0, Math.min(10, gaQuestions.length));
  const remainingNeededCore = 65 - selectedGA.length;
  const selectedCore = shuffle(coreQuestions).slice(0, Math.min(remainingNeededCore, coreQuestions.length));

  const fullPaper: Question[] = [];

  // Q1 - Q10 GA
  selectedGA.forEach((q, idx) => {
    fullPaper.push({
      ...q,
      id: `gen-practice-q${idx + 1}`,
      questionNo: idx + 1,
      source: 'Practice Paper — GATEHub Generated',
      tags: [...(q.tags || []), 'GATEHub Practice Paper']
    });
  });

  // Q11 - Q65 Core CS
  selectedCore.forEach((q, idx) => {
    const qNo = selectedGA.length + idx + 1;
    fullPaper.push({
      ...q,
      id: `gen-practice-q${qNo}`,
      questionNo: qNo,
      source: 'Practice Paper — GATEHub Generated',
      tags: [...(q.tags || []), 'GATEHub Practice Paper']
    });
  });

  return fullPaper;
};
