import React, { useState, useEffect } from 'react';
import { ALL_GATE_PYQS } from '../data/pyqs';
import { Question } from '../types';
import { Clock, CheckCircle2, RotateCcw, Award, Play, ShieldAlert, ArrowLeft, ArrowRight } from 'lucide-react';

interface FullPaperPageProps {
  year: number;
  paper: string;
  onNavigate: (route: string) => void;
}

export const FullPaperPage: React.FC<FullPaperPageProps> = ({ year, paper, onNavigate }) => {
  const [testStarted, setTestStarted] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(180 * 60);
  const [currentQIndex, setCurrentQIndex] = useState(0);

  const [questionStates, setQuestionStates] = useState<Record<number, {
    status: 'not-visited' | 'not-answered' | 'answered' | 'marked' | 'answered-marked';
    selectedOptions: string[];
    natValue: string;
  }>>({});

  const paperQuestions = ALL_GATE_PYQS.filter(q => q.year === year && (q.paper === paper || paper === 'CS'));
  const testQuestions = paperQuestions.length > 0 ? paperQuestions : ALL_GATE_PYQS.slice(0, 10);

  useEffect(() => {
    let timer: any;
    if (testStarted && !testSubmitted && timeLeftSeconds > 0) {
      timer = setInterval(() => {
        setTimeLeftSeconds(prev => {
          if (prev <= 1) {
            setTestSubmitted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testStarted, testSubmitted, timeLeftSeconds]);

  const startTest = () => {
    const initStates: any = {};
    testQuestions.forEach((_, idx) => {
      initStates[idx] = {
        status: idx === 0 ? 'not-answered' : 'not-visited',
        selectedOptions: [],
        natValue: ''
      };
    });
    setQuestionStates(initStates);
    setCurrentQIndex(0);
    setTimeLeftSeconds(180 * 60);
    setTestStarted(true);
    setTestSubmitted(false);
  };

  const handleOptionClick = (optId: string) => {
    const q = testQuestions[currentQIndex];
    const currentState = questionStates[currentQIndex] || { status: 'not-answered', selectedOptions: [], natValue: '' };

    let newOpts: string[] = [];
    if (q.type === 'MCQ') {
      newOpts = [optId];
    } else if (q.type === 'MSQ') {
      newOpts = currentState.selectedOptions.includes(optId)
        ? currentState.selectedOptions.filter(id => id !== optId)
        : [...currentState.selectedOptions, optId];
    }

    setQuestionStates(prev => ({
      ...prev,
      [currentQIndex]: {
        ...currentState,
        selectedOptions: newOpts,
        status: newOpts.length > 0 ? 'answered' : 'not-answered'
      }
    }));
  };

  const handleNatChange = (val: string) => {
    const currentState = questionStates[currentQIndex] || { status: 'not-answered', selectedOptions: [], natValue: '' };
    setQuestionStates(prev => ({
      ...prev,
      [currentQIndex]: {
        ...currentState,
        natValue: val,
        status: val.trim() ? 'answered' : 'not-answered'
      }
    }));
  };

  const clearResponse = () => {
    setQuestionStates(prev => ({
      ...prev,
      [currentQIndex]: {
        status: 'not-answered',
        selectedOptions: [],
        natValue: ''
      }
    }));
  };

  const markForReview = () => {
    const currentState = questionStates[currentQIndex];
    const hasAnswer = currentState.selectedOptions.length > 0 || currentState.natValue.trim().length > 0;
    const newStatus = hasAnswer ? 'answered-marked' : 'marked';

    setQuestionStates(prev => ({
      ...prev,
      [currentQIndex]: { ...currentState, status: newStatus }
    }));
    navigateNext();
  };

  const saveAndNext = () => {
    const currentState = questionStates[currentQIndex];
    const hasAnswer = currentState.selectedOptions.length > 0 || currentState.natValue.trim().length > 0;
    if (hasAnswer && currentState.status !== 'answered-marked') {
      setQuestionStates(prev => ({
        ...prev,
        [currentQIndex]: { ...currentState, status: 'answered' }
      }));
    }
    navigateNext();
  };

  const navigateNext = () => {
    if (currentQIndex < testQuestions.length - 1) {
      const nextIdx = currentQIndex + 1;
      if (questionStates[nextIdx]?.status === 'not-visited') {
        setQuestionStates(prev => ({
          ...prev,
          [nextIdx]: { ...prev[nextIdx], status: 'not-answered' }
        }));
      }
      setCurrentQIndex(nextIdx);
    }
  };

  const formatTimer = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Evaluation
  let totalScore = 0;
  let attemptedCount = 0;
  let correctCount = 0;
  let incorrectCount = 0;

  if (testSubmitted) {
    testQuestions.forEach((q, idx) => {
      const state = questionStates[idx];
      if (!state) return;

      const isAttempted = state.selectedOptions.length > 0 || state.natValue.trim().length > 0;
      if (isAttempted) attemptedCount++;

      let isCorrect = false;
      if (q.type === 'MCQ') {
        isCorrect = state.selectedOptions[0] === q.correctAnswer;
      } else if (q.type === 'MSQ') {
        const correctSet = q.correctAnswer.split(',').map(s => s.trim());
        isCorrect = state.selectedOptions.length === correctSet.length && state.selectedOptions.every(opt => correctSet.includes(opt));
      } else if (q.type === 'NAT') {
        const userVal = parseFloat(state.natValue);
        if (!isNaN(userVal)) {
          if (q.correctAnswer.includes('to')) {
            const [min, max] = q.correctAnswer.split('to').map(v => parseFloat(v.trim()));
            isCorrect = userVal >= min && userVal <= max;
          } else {
            isCorrect = Math.abs(userVal - parseFloat(q.correctAnswer)) < 0.05;
          }
        }
      }

      if (isCorrect) {
        correctCount++;
        totalScore += q.marks;
      } else if (isAttempted) {
        incorrectCount++;
        if (q.type === 'MCQ') {
          totalScore -= q.marks === 1 ? (1 / 3) : (2 / 3);
        }
      }
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* 1. Pre-Test Screen */}
      {!testStarted && (
        <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-6 max-w-4xl mx-auto">
          <button
            onClick={() => onNavigate('/pyqs')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to PYQ Library
          </button>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
              <Award className="w-3.5 h-3.5" /> Official Full Paper Simulator
            </div>
            <h1 className="text-3xl font-extrabold text-slate-100">
              GATE {year} {paper} Full Exam Simulation
            </h1>
            <p className="text-xs text-slate-400">Duration: 180 Minutes • Total Questions: {testQuestions.length} Available Verified PYQs</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs text-slate-300">
            <div className="font-bold text-indigo-400">Full Paper Exam Protocol:</div>
            <p className="text-slate-400">
              Attempt the official GATE {year} paper under exact 3-hour computer-based test conditions. Negative marking applies to MCQs.
            </p>
          </div>

          <button
            onClick={startTest}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-emerald-600 hover:from-indigo-600 hover:to-emerald-700 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Begin GATE {year} {paper} Full Paper</span>
          </button>
        </div>
      )}

      {/* 2. Active Test Runner */}
      {testStarted && !testSubmitted && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <div className="rounded-2xl glass-card p-4 border border-slate-800 flex items-center justify-between text-xs">
              <div className="font-bold text-slate-200">
                GATE {year} {paper} • Q{currentQIndex + 1} of {testQuestions.length}
              </div>
              <div className="flex items-center gap-2 font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/30">
                <Clock className="w-4 h-4" />
                <span>{formatTimer(timeLeftSeconds)}</span>
              </div>
            </div>

            <div className="rounded-2xl glass-card p-6 border border-slate-800 space-y-4 text-slate-200 min-h-[350px]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
                <span className="font-bold font-mono text-indigo-400">Q{currentQIndex + 1} ({testQuestions[currentQIndex].type} - {testQuestions[currentQIndex].marks} Mark)</span>
                <span className="text-slate-400">{testQuestions[currentQIndex].subjectName}</span>
              </div>

              <div className="text-sm sm:text-base leading-relaxed text-slate-100 whitespace-pre-line">
                {testQuestions[currentQIndex].questionText}
              </div>

              {(testQuestions[currentQIndex].type === 'MCQ' || testQuestions[currentQIndex].type === 'MSQ') && (
                <div className="space-y-2 pt-2">
                  {testQuestions[currentQIndex].options?.map((opt) => {
                    const isSelected = questionStates[currentQIndex]?.selectedOptions.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleOptionClick(opt.id)}
                        className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200 font-semibold'
                            : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <span className="font-bold font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-700 text-xs">
                          {opt.id}
                        </span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {testQuestions[currentQIndex].type === 'NAT' && (
                <div className="pt-2 space-y-2">
                  <label className="block text-xs font-semibold text-slate-400">Enter Numerical Value:</label>
                  <input
                    type="text"
                    value={questionStates[currentQIndex]?.natValue || ''}
                    onChange={(e) => handleNatChange(e.target.value)}
                    placeholder="Enter answer..."
                    className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500 w-64"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <div className="flex gap-2">
                <button onClick={clearResponse} className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">Clear</button>
                <button onClick={markForReview} className="px-3.5 py-2 rounded-xl bg-purple-600/20 text-purple-300 text-xs font-semibold border border-purple-500/40">Mark Review & Next</button>
              </div>
              <button onClick={saveAndNext} className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-600 text-white text-xs font-bold">Save & Next →</button>
            </div>
          </div>

          <div className="rounded-2xl glass-card p-5 border border-slate-800 space-y-4 h-fit">
            <div className="font-bold text-xs text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2">Palette</div>
            <div className="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto pt-2">
              {testQuestions.map((_, idx) => {
                const state = questionStates[idx]?.status || 'not-visited';
                let btnBg = 'bg-slate-800/80 text-slate-400 border-slate-700';
                if (state === 'answered') btnBg = 'bg-emerald-600 text-white font-bold border-emerald-500';
                else if (state === 'not-answered') btnBg = 'bg-rose-600 text-white font-bold border-rose-500';
                else if (state === 'marked' || state === 'answered-marked') btnBg = 'bg-purple-600 text-white font-bold border-purple-500';
                if (currentQIndex === idx) btnBg += ' ring-2 ring-indigo-400 scale-105';

                return (
                  <button key={idx} onClick={() => setCurrentQIndex(idx)} className={`h-8 rounded-lg border text-xs flex items-center justify-center transition-all ${btnBg}`}>
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <button onClick={() => setTestSubmitted(true)} className="w-full py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs transition-all mt-4">
              Submit GATE {year} Paper
            </button>
          </div>
        </div>
      )}

      {/* 3. Results Screen */}
      {testSubmitted && (
        <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-6 max-w-4xl mx-auto animate-fadeIn">
          <div className="text-center space-y-2">
            <Award className="w-12 h-12 text-emerald-400 mx-auto" />
            <h2 className="text-3xl font-extrabold text-slate-100">GATE {year} {paper} Scorecard</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-xs text-slate-400">Score</div>
              <div className="text-2xl font-black text-indigo-400">{totalScore.toFixed(2)}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-xs text-slate-400">Attempted</div>
              <div className="text-2xl font-black text-slate-200">{attemptedCount} / {testQuestions.length}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-xs text-slate-400">Correct</div>
              <div className="text-2xl font-black text-emerald-400">{correctCount}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-xs text-slate-400">Incorrect</div>
              <div className="text-2xl font-black text-rose-400">{incorrectCount}</div>
            </div>
          </div>

          <button onClick={() => onNavigate('/pyqs')} className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-bold text-xs">
            Return to PYQ Explorer
          </button>
        </div>
      )}
    </div>
  );
};
