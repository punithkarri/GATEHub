import React, { useState } from 'react';
import { Question } from '../types';
import { CheckCircle2, XCircle, Lightbulb, Zap, HelpCircle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  showExplanationInitially?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, showExplanationInitially = false }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [natInput, setNatInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(showExplanationInitially);

  const handleMcqSelect = (optionId: string) => {
    if (isSubmitted) return;
    if (question.type === 'MCQ') {
      setSelectedOptions([optionId]);
    } else if (question.type === 'MSQ') {
      setSelectedOptions(prev =>
        prev.includes(optionId) ? prev.filter(id => id !== optionId) : [...prev, optionId]
      );
    }
  };

  const checkAnswer = () => {
    setIsSubmitted(true);
    setShowExplanation(true);
  };

  const resetAnswer = () => {
    setIsSubmitted(false);
    setSelectedOptions([]);
    setNatInput('');
    setShowExplanation(false);
  };

  // Determine if student response is correct
  let isCorrect = false;
  if (isSubmitted) {
    if (question.type === 'MCQ') {
      isCorrect = selectedOptions[0] === question.correctAnswer;
    } else if (question.type === 'MSQ') {
      const correctSet = question.correctAnswer.split(',').map(s => s.trim());
      isCorrect =
        selectedOptions.length === correctSet.length &&
        selectedOptions.every(opt => correctSet.includes(opt));
    } else if (question.type === 'NAT') {
      const userVal = parseFloat(natInput.trim());
      // Handle range e.g. "62" or "12.5 to 13.0"
      if (!isNaN(userVal)) {
        if (question.correctAnswer.includes('to')) {
          const [min, max] = question.correctAnswer.split('to').map(v => parseFloat(v.trim()));
          isCorrect = userVal >= min && userVal <= max;
        } else {
          const target = parseFloat(question.correctAnswer);
          isCorrect = Math.abs(userVal - target) < 0.05;
        }
      }
    }
  }

  const difficultyColors = {
    Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    Hard: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  };

  return (
    <div className="rounded-2xl glass-card p-6 border border-slate-800 shadow-xl space-y-4 text-slate-200">
      {/* Question Header Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-bold font-mono bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 rounded-lg">
            GATE {question.year} {question.paper} • Q{question.questionNo}
          </span>
          <span className="px-2.5 py-1 text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30 rounded-lg">
            {question.type} ({question.marks} {question.marks === 1 ? 'Mark' : 'Marks'})
          </span>
          <span className={`px-2.5 py-1 text-xs font-semibold border rounded-lg ${difficultyColors[question.difficulty]}`}>
            {question.difficulty}
          </span>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span className="font-medium text-slate-300">{question.subjectName}</span>
          <span>•</span>
          <span className="text-slate-400">{question.topic}</span>
        </div>
      </div>

      {/* Question Text */}
      <div className="text-sm sm:text-base leading-relaxed font-normal text-slate-100 whitespace-pre-line">
        {question.questionText}
      </div>

      {/* Code Snippet if present */}
      {question.codeSnippet && (
        <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-emerald-300 border border-slate-800 overflow-x-auto">
          <pre>{question.codeSnippet}</pre>
        </div>
      )}

      {/* Options for MCQ & MSQ */}
      {(question.type === 'MCQ' || question.type === 'MSQ') && question.options && (
        <div className="space-y-2 pt-2">
          {question.options.map((opt) => {
            const isSelected = selectedOptions.includes(opt.id);
            const isCorrectOption = question.correctAnswer.split(',').map(s => s.trim()).includes(opt.id);

            let btnStyle = 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/60 text-slate-200';
            if (isSelected) {
              btnStyle = 'bg-indigo-600/30 border-indigo-500 text-indigo-200 font-semibold';
            }

            if (isSubmitted) {
              if (isCorrectOption) {
                btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold';
              } else if (isSelected && !isCorrectOption) {
                btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-semibold';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleMcqSelect(opt.id)}
                disabled={isSubmitted}
                className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-start gap-3 ${btnStyle}`}
              >
                <span className="font-bold font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 shrink-0 text-xs">
                  {opt.id}
                </span>
                <span className="flex-1">{opt.text}</span>
                {isSubmitted && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isSubmitted && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Input box for NAT */}
      {question.type === 'NAT' && (
        <div className="pt-2 space-y-2">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Enter Numerical Answer:
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={natInput}
              onChange={(e) => setNatInput(e.target.value)}
              disabled={isSubmitted}
              placeholder="e.g. 62 or 16.5"
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500 w-48"
            />
            {isSubmitted && (
              <div className="text-xs font-semibold flex items-center gap-1.5">
                {isCorrect ? (
                  <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Correct Answer!</span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1"><XCircle className="w-4 h-4" /> Official Key: {question.correctAnswer}</span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80">
        <div className="flex items-center gap-2">
          {!isSubmitted ? (
            <button
              onClick={checkAnswer}
              disabled={
                (question.type !== 'NAT' && selectedOptions.length === 0) ||
                (question.type === 'NAT' && !natInput.trim())
              }
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit & Check Answer
            </button>
          ) : (
            <button
              onClick={resetAnswer}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700"
            >
              Re-attempt Question
            </button>
          )}

          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-indigo-300 text-xs font-medium border border-indigo-500/30 flex items-center gap-1"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>{showExplanation ? 'Hide Explanation' : 'View Explanation'}</span>
            {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {question.officialSourceLink && (
          <a
            href={question.officialSourceLink}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-slate-400 hover:text-indigo-400 flex items-center gap-1 transition-colors"
          >
            <span>Official GATE 2025 Key Source</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* Explanation Box */}
      {showExplanation && (
        <div className="mt-4 p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 animate-fadeIn text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-indigo-400 font-bold border-b border-slate-800 pb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Official Solution & Mathematical Breakdown</span>
            <span className="ml-auto font-mono text-emerald-400">Correct Answer: {question.correctAnswer}</span>
          </div>

          <div className="text-slate-300 whitespace-pre-line leading-relaxed">
            {question.explanation}
          </div>

          {/* Concept Tested */}
          <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300">
            <div className="font-semibold text-xs flex items-center gap-1 mb-1">
              <Zap className="w-3.5 h-3.5 text-purple-400" /> Important Concept Tested:
            </div>
            <div>{question.conceptTested}</div>
          </div>

          {/* Shortcut Trick if available */}
          {question.shortcutTrick && (
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300">
              <div className="font-semibold text-xs flex items-center gap-1 mb-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Exam Shortcut / Trick:
              </div>
              <div>{question.shortcutTrick}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
