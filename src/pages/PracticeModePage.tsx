import React, { useState } from 'react';
import { ALL_GATE_PYQS, GATE_PAPERS_CATALOG, generateFullPracticePaper, getQuestionsByPaper, getPaperCompletenessInfo } from '../data/pyqs';
import { GATE_CSE_SUBJECTS } from '../data/syllabus';
import { QuestionCard } from '../components/QuestionCard';
import { ExamModeConsole } from '../components/ExamModeConsole';
import { Question } from '../types';
import { Play, RotateCcw, Award, CheckCircle2, Clock, Target, ArrowRight, Sparkles, BookOpen, Layers, ShieldAlert } from 'lucide-react';

interface PracticeModePageProps {
  onExamModeChange?: (isActive: boolean) => void;
  onNavigate?: (route: string) => void;
}

export const PracticeModePage: React.FC<PracticeModePageProps> = ({ onExamModeChange, onNavigate }) => {
  const [practiceType, setPracticeType] = useState<'subject' | 'official' | 'generated'>('subject');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedPaperId, setSelectedPaperId] = useState<string>('2025-CS-1');
  const [questionCountOption, setQuestionCountOption] = useState<number>(10);
  
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [isFullExamConsole, setIsFullExamConsole] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);

  const startPractice = () => {
    let pool: Question[] = [];

    if (practiceType === 'generated' || questionCountOption === 65) {
      // Launch Full 65-Question CBT Exam Mode Console!
      const generated = generateFullPracticePaper('GATEHub Full Practice Paper');
      setQuestions(generated);
      setIsFullExamConsole(true);
      setSessionActive(true);
      return;
    }

    if (practiceType === 'official') {
      const parts = selectedPaperId.split('-');
      const year = parseInt(parts[0]);
      const paperCode = parts.slice(1).join('-');
      const paperQuestions = getQuestionsByPaper(year, paperCode);
      pool = paperQuestions.length > 0 ? paperQuestions : ALL_GATE_PYQS;

      if (questionCountOption === 65 || pool.length >= 65) {
        setQuestions(pool);
        setIsFullExamConsole(true);
        setSessionActive(true);
        return;
      }
    } else {
      pool = selectedSubject === 'All' 
        ? ALL_GATE_PYQS 
        : ALL_GATE_PYQS.filter(q => q.subjectId === selectedSubject);
      if (pool.length === 0) pool = ALL_GATE_PYQS;
    }

    // Shuffle and slice for quick/focused/deep practice
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, Math.min(questionCountOption, shuffled.length)));
    setCurrentIndex(0);
    setIsFullExamConsole(false);
    setSessionActive(true);
    setSessionCompleted(false);
  };

  const resetSession = () => {
    setSessionActive(false);
    setSessionCompleted(false);
    setIsFullExamConsole(false);
    setQuestions([]);
    setCurrentIndex(0);
    if (onExamModeChange) onExamModeChange(false);
  };

  // If Full Exam Console is launched, render ExamModeConsole
  if (sessionActive && isFullExamConsole && questions.length > 0) {
    const selectedCatalog = GATE_PAPERS_CATALOG.find(p => p.id === selectedPaperId);
    const paperTitle = practiceType === 'official' 
      ? selectedCatalog ? selectedCatalog.title : `GATE ${selectedPaperId}`
      : 'GATEHub Full Practice Paper';

    return (
      <ExamModeConsole
        paperTitle={paperTitle}
        paperType={practiceType === 'official' ? 'official' : 'generated'}
        questions={questions}
        onExit={resetSession}
        onNavigate={onNavigate}
        onExamModeChange={onExamModeChange}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* 1. Configuration View */}
      {!sessionActive && (
        <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/30">
              <Target className="w-3.5 h-3.5 text-indigo-400" /> Interactive Practice & CBT Exam Engine
            </div>
            <h1 className="text-3xl font-extrabold text-slate-100">Configure Practice Session</h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              Choose between Subject-wise Practice, Official Previous-Year Full Papers, or a complete 65-Question GATE CBT Exam Simulation.
            </p>
          </div>

          {/* Mode Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <button
              onClick={() => setPracticeType('subject')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                practiceType === 'subject'
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-md ring-1 ring-indigo-500'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-bold text-xs flex items-center gap-1.5 mb-1 text-slate-200">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Subject & Mixed Practice</span>
              </div>
              <p className="text-[11px] text-slate-400">Target specific CSE subjects or mixed topic pools.</p>
            </button>

            <button
              onClick={() => setPracticeType('official')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                practiceType === 'official'
                  ? 'bg-emerald-600/20 border-emerald-500 text-emerald-200 shadow-md ring-1 ring-emerald-500'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-bold text-xs flex items-center gap-1.5 mb-1 text-slate-200">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Official PYQ Paper</span>
              </div>
              <p className="text-[11px] text-slate-400">Attempt official GATE 2007–2025 question papers.</p>
            </button>

            <button
              onClick={() => {
                setPracticeType('generated');
                setQuestionCountOption(65);
              }}
              className={`p-4 rounded-2xl border text-left transition-all ${
                practiceType === 'generated'
                  ? 'bg-purple-600/20 border-purple-500 text-purple-200 shadow-md ring-1 ring-purple-500'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-bold text-xs flex items-center gap-1.5 mb-1 text-slate-200">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>GATEHub Full Practice Paper</span>
              </div>
              <p className="text-[11px] text-slate-400">Generated 65-Question CBT paper (100 Marks, 180 Mins).</p>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            {/* Subject or Paper Selection */}
            {practiceType === 'subject' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">Select Target Subject:</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  <option value="All">All Subjects (Mixed Practice)</option>
                  {GATE_CSE_SUBJECTS.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                  ))}
                </select>
              </div>
            )}

            {practiceType === 'official' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">Select Official Previous Year Paper:</label>
                <select
                  value={selectedPaperId}
                  onChange={(e) => setSelectedPaperId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-medium"
                >
                  {GATE_PAPERS_CATALOG.map((p) => {
                    const info = getPaperCompletenessInfo(p.year, p.paper);
                    return (
                      <option key={p.id} value={p.id}>
                        {p.title} — {info.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            {/* Session Length / Question Count Selector */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300">Select Session Length & Mode:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { count: 10, label: 'Quick Practice', desc: '10 Questions' },
                  { count: 25, label: 'Focused Practice', desc: '25 Questions' },
                  { count: 50, label: 'Deep Practice', desc: '50 Questions' },
                  { count: 65, label: 'Full GATE Paper', desc: '65 Questions (180 Mins)' }
                ].map((item) => (
                  <button
                    key={item.count}
                    onClick={() => setQuestionCountOption(item.count as any)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      questionCountOption === item.count
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/25 ring-2 ring-indigo-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span className="block font-extrabold text-xs text-white">{item.label}</span>
                    <span className="text-[10px] text-slate-300 block">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={startPractice}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-emerald-600 hover:from-indigo-600 hover:to-emerald-700 text-white font-black text-sm shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>
              {questionCountOption === 65 ? 'Launch Full 65-Question CBT Examination' : 'Start Practice Session'}
            </span>
          </button>
        </div>
      )}

      {/* 2. Quick / Focused / Deep Practice Session Runner */}
      {sessionActive && !isFullExamConsole && !sessionCompleted && questions.length > 0 && (
        <div className="space-y-6">
          <div className="rounded-2xl glass-card p-4 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-200">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-indigo-400 font-semibold">{questions[currentIndex].subjectName}</span>
            </div>

            <button
              onClick={resetSession}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> End Session
            </button>
          </div>

          <QuestionCard question={questions[currentIndex]} key={questions[currentIndex].id} />

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 disabled:opacity-40"
            >
              ← Previous Question
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => prev + 1)}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-1.5"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setSessionCompleted(true)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Finish Practice Session</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 3. Session Completed Summary */}
      {sessionCompleted && !isFullExamConsole && (
        <div className="rounded-3xl glass-card p-8 border border-slate-800 text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-100">Practice Session Completed!</h2>
            <p className="text-xs text-slate-400">Great job reviewing {questions.length} GATE questions with verified explanations.</p>
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={startPractice}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
            >
              Start Another Practice
            </button>
            <button
              onClick={resetSession}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700"
            >
              Back to Configuration
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
