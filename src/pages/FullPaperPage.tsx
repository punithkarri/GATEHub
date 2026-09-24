import React from 'react';
import { ALL_GATE_PYQS, GATE_PAPERS_CATALOG, getQuestionsByPaper, getPaperCompletenessInfo, generateFullPracticePaper } from '../data/pyqs';
import { ExamModeConsole } from '../components/ExamModeConsole';

interface FullPaperPageProps {
  year: number;
  paper: string;
  onNavigate: (route: string) => void;
  onExamModeChange?: (isActive: boolean) => void;
}

export const FullPaperPage: React.FC<FullPaperPageProps> = ({ year, paper, onNavigate, onExamModeChange }) => {
  const paperInfo = getPaperCompletenessInfo(year, paper);
  const catalogEntry = GATE_PAPERS_CATALOG.find(p => p.year === year && (p.paper === paper || paper === 'CS'));
  const paperTitle = catalogEntry ? catalogEntry.title : `GATE ${year} ${paper} Examination`;

  const questions = paperInfo.questions.length > 0 
    ? paperInfo.questions 
    : generateFullPracticePaper(`GATE ${year} ${paper} Full Practice`);

  return (
    <ExamModeConsole
      paperTitle={paperTitle}
      paperType="official"
      questions={questions}
      onExit={() => onNavigate('/pyqs')}
      onNavigate={onNavigate}
      onExamModeChange={onExamModeChange}
    />
  );
};
