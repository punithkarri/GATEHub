import React, { useState } from 'react';
import { GATE_PYQS } from '../data/pyqs';
import { GATE_CSE_SUBJECTS } from '../data/syllabus';
import { QuestionCard } from '../components/QuestionCard';
import { Question } from '../types';
import { Play, RotateCcw, Award, CheckCircle2, XCircle, Clock, Target, ArrowRight } from 'lucide-react';

export const PracticeModePage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);

  const startSession = () => {
    let pool = GATE_PYQS;
    if (selectedSubject !== 'All') {
      pool = pool.filter(q => q.subjectId === selectedSubject);
    }
    if (pool.length === 0) pool = GATE_PYQS;

    // Shuffle and pick
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, Math.min(questionCount, shuffled.length)));
    setCurrentIndex(0);
    setSessionActive(true);
    setSessionCompleted(false);
  };

  const resetSession = () => {
    setSessionActive(false);
    setSessionCompleted(false);
    setQuestions([]);
    setCurrentIndex(0);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Configuration View */}
      {!sessionActive && (
        <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/30">
              <Target className="w-3.5 h-3.5 text-indigo-400" /> Interactive Quiz Practice Mode
            </div>
            <h1 className="text-3xl font-extrabold text-slate-100">Configure Your Practice Session</h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              Select a target subject, number of questions, and practice interactively with step-by-step verified explanations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            {/* Subject Selector */}
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

            {/* Question Count Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">Number of Questions:</label>
              <div className="flex items-center gap-2">
                {[3, 5, 10].map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => setQuestionCount(cnt)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      questionCount === cnt
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/25'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {cnt} Questions
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={startSession}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-600 hover:to-pink-700 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Practice Session</span>
          </button>
        </div>
      )}

      {/* Active Practice Session Runner */}
      {sessionActive && !sessionCompleted && questions.length > 0 && (
        <div className="space-y-6">
          {/* Progress & Controls Header */}
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

          {/* Active Question Card */}
          <QuestionCard question={questions[currentIndex]} key={questions[currentIndex].id} />

          {/* Navigation Controls */}
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

      {/* Session Completed Summary */}
      {sessionCompleted && (
        <div className="rounded-3xl glass-card p-8 border border-slate-800 text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-100">Session Completed!</h2>
            <p className="text-xs text-slate-400">Great job reviewing {questions.length} GATE questions.</p>
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={startSession}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
            >
              Start Another Quiz
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
