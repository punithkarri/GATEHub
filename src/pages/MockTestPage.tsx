import React, { useState } from 'react';
import { generateFullPracticePaper } from '../data/pyqs';
import { ExamModeConsole } from '../components/ExamModeConsole';

interface MockTestPageProps {
  onNavigate?: (route: string) => void;
  onExamModeChange?: (isActive: boolean) => void;
}

export const MockTestPage: React.FC<MockTestPageProps> = ({ onNavigate, onExamModeChange }) => {
  const [mockQuestions] = useState(() => generateFullPracticePaper('GATEHub Full-Length Mock Examination'));

  return (
    <ExamModeConsole
      paperTitle="GATE 2026 Full-Length Mock Examination (CBT Simulator)"
      paperType="generated"
      questions={mockQuestions}
      onExit={() => {
        if (onNavigate) onNavigate('/dashboard');
      }}
      onNavigate={onNavigate}
      onExamModeChange={onExamModeChange}
    />
  );
};
