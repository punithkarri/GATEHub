import React, { useState } from 'react';
import { GATE_PYQS } from '../data/pyqs';
import { QuestionCard } from '../components/QuestionCard';
import { GATE_CSE_SUBJECTS } from '../data/syllabus';
import { QuestionType } from '../types';
import { HelpCircle, Filter, Search, Award, Sparkles, BookOpen } from 'lucide-react';

export const PyqExplorerPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedPaper, setSelectedPaper] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredQuestions = GATE_PYQS.filter(q => {
    const matchesYear = selectedYear === 'All' || q.year.toString() === selectedYear;
    const matchesPaper = selectedPaper === 'All' || q.paper === selectedPaper;
    const matchesSubject = selectedSubject === 'All' || q.subjectId === selectedSubject;
    const matchesType = selectedType === 'All' || q.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    const matchesSearch =
      !searchQuery.trim() ||
      q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.conceptTested.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesYear && matchesPaper && matchesSubject && matchesType && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
          <Award className="w-3.5 h-3.5" /> Verified Official GATE Previous Year Questions
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          GATE PYQ Explorer & Solution Bank
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          Explore official GATE 2025 CS-1 (Forenoon), CS-2 (Afternoon), and historical GATE papers. Every question includes verified answer keys, step-by-step math derivations, and core concepts tested.
        </p>

        {/* Filter Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-4 border-t border-slate-800/80">
          {/* Year Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Years</option>
              <option value="2025">GATE 2025</option>
              <option value="2024">GATE 2024</option>
              <option value="2023">GATE 2023</option>
            </select>
          </div>

          {/* Paper Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Paper</label>
            <select
              value={selectedPaper}
              onChange={(e) => setSelectedPaper(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Papers</option>
              <option value="CS-1">CS-1 (Forenoon)</option>
              <option value="CS-2">CS-2 (Afternoon)</option>
              <option value="CS">General CS</option>
            </select>
          </div>

          {/* Subject Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Subjects</option>
              {GATE_CSE_SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
              ))}
            </select>
          </div>

          {/* Question Type Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Types</option>
              <option value="MCQ">MCQ (Single Correct)</option>
              <option value="MSQ">MSQ (Multiple Select)</option>
              <option value="NAT">NAT (Numerical)</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Levels</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Search Box */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Search Keywords</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. 'cache', 'dfa'..."
                className="w-full px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
          <span>Showing <strong className="text-emerald-400">{filteredQuestions.length}</strong> questions matching current criteria.</span>
          {(selectedYear !== 'All' || selectedPaper !== 'All' || selectedSubject !== 'All' || selectedType !== 'All' || selectedDifficulty !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedYear('All');
                setSelectedPaper('All');
                setSelectedSubject('All');
                setSelectedType('All');
                setSelectedDifficulty('All');
                setSearchQuery('');
              }}
              className="text-indigo-400 hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))
        ) : (
          <div className="p-12 text-center rounded-3xl glass-card border border-slate-800 space-y-3">
            <HelpCircle className="w-10 h-10 mx-auto text-slate-600 animate-pulse" />
            <h3 className="text-base font-bold text-slate-200">No questions match your current filters</h3>
            <p className="text-xs text-slate-400">Try loosening the filter constraints or clearing the search keyword.</p>
          </div>
        )}
      </div>
    </div>
  );
};
