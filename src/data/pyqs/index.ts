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

// Full Paper Metadata Catalog (2007 - 2025)
export const GATE_PAPERS_CATALOG: PaperInfo[] = [
  {
    id: '2025-CS-1',
    year: 2025,
    paper: 'CS-1',
    title: 'GATE 2025 Computer Science - Session 1 (Forenoon)',
    organizingInstitute: 'IIT Roorkee',
    questionCount: 65,
    totalMarks: 100,
    officialSourceUrl: 'https://gate2025.iitr.ac.in',
    isVerified: true
  },
  {
    id: '2025-CS-2',
    year: 2025,
    paper: 'CS-2',
    title: 'GATE 2025 Computer Science - Session 2 (Afternoon)',
    organizingInstitute: 'IIT Roorkee',
    questionCount: 65,
    totalMarks: 100,
    officialSourceUrl: 'https://gate2025.iitr.ac.in',
    isVerified: true
  },
  {
    id: '2024-CS',
    year: 2024,
    paper: 'CS',
    title: 'GATE 2024 Computer Science & Information Tech',
    organizingInstitute: 'IISc Bangalore',
    questionCount: 65,
    totalMarks: 100,
    officialSourceUrl: 'https://gate2025.iitr.ac.in',
    isVerified: true
  },
  {
    id: '2023-CS',
    year: 2023,
    paper: 'CS',
    title: 'GATE 2023 Computer Science & Information Tech',
    organizingInstitute: 'IIT Kanpur',
    questionCount: 65,
    totalMarks: 100,
    officialSourceUrl: 'https://gate2025.iitr.ac.in',
    isVerified: true
  },
  {
    id: '2022-CS',
    year: 2022,
    paper: 'CS',
    title: 'GATE 2022 Computer Science & Information Tech',
    organizingInstitute: 'IIT Kharagpur',
    questionCount: 65,
    totalMarks: 100,
    officialSourceUrl: 'https://gate2025.iitr.ac.in',
    isVerified: true
  },
  {
    id: '2021-CS',
    year: 2021,
    paper: 'CS',
    title: 'GATE 2021 Computer Science & Information Tech',
    organizingInstitute: 'IIT Bombay',
    questionCount: 65,
    totalMarks: 100,
    officialSourceUrl: 'https://gate2025.iitr.ac.in',
    isVerified: true
  },
  {
    id: '2020-CS',
    year: 2020,
    paper: 'CS',
    title: 'GATE 2020 Computer Science & Information Tech',
    organizingInstitute: 'IIT Delhi',
    questionCount: 65,
    totalMarks: 100,
    officialSourceUrl: 'https://gate2025.iitr.ac.in',
    isVerified: true
  },
  {
    id: '2019-CS',
    year: 2019,
    paper: 'CS',
    title: 'GATE 2019 Computer Science & Information Tech',
    organizingInstitute: 'IIT Madras',
    questionCount: 65,
    totalMarks: 100,
    officialSourceUrl: 'https://gate2025.iitr.ac.in',
    isVerified: true
  }
];

export const getQuestionsByPaper = (year: number, paper: string): Question[] => {
  return ALL_GATE_PYQS.filter(q => q.year === year && (q.paper === paper || paper === 'CS'));
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
