import React from 'react';
import { GATE_PAPERS_CATALOG, getPaperCompletenessInfo, generateFullPracticePaper } from '../data/pyqs';
import { ExamMode } from '../components/exam/ExamMode';

interface FullPaperPageProps {
  year: number;
  paper: string;
  onNavigate: (route: string) => void;
  onExamModeChange?: (isActive: boolean) => void;
}

export const FullPaperPage: React.FC<FullPaperPageProps> = ({ year, paper, onNavigate, onExamModeChange }) => {
  const paperInfo = getPaperCompletenessInfo(year, paper);
  const catalogEntry = GATE_PAPERS_CATALOG.find(p => p.year === year && (p.paper === paper || paper === 'CS' || p.paper === 'CS-1'));
  const paperTitle = catalogEntry ? catalogEntry.title : `GATE ${year} ${paper} Examination`;

  // For official paper route, load actual questions (or if 0, generated paper fallback clearly labeled)
  const questions = paperInfo.questions.length > 0 
    ? paperInfo.questions 
    : generateFullPracticePaper(`GATE ${year} ${paper} Full Practice`);

  const paperType = paperInfo.questions.length > 0 ? 'official' : 'generated';

  return (
    <ExamMode
      paperTitle={paperTitle}
      paperType={paperType}
      questions={questions}
      isPartialPaper={!paperInfo.isComplete}
      availableCount={paperInfo.availableCount}
      onExit={() => onNavigate('/pyqs')}
      onNavigate={onNavigate}
      onExamModeChange={onExamModeChange}
    />
  );
};
