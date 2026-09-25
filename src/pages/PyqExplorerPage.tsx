import React, { useState } from 'react';
import { ALL_GATE_PYQS, GATE_PAPERS_CATALOG } from '../data/pyqs/index';
import { QuestionCard } from '../components/QuestionCard';
import { GATE_CSE_SUBJECTS } from '../data/syllabus';
import { Award, Filter, Search, Sparkles, BookOpen, Clock, Play } from 'lucide-react';

interface PyqExplorerPageProps {
  onNavigate?: (route: string) => void;
}

export const PyqExplorerPage: React.FC<PyqExplorerPageProps> = ({ onNavigate }) => {
  const parseSubjectFromUrl = () => {
    const hash = window.location.hash;
    if (hash.includes('?')) {
      const queryStr = hash.split('?')[1];
      const params = new URLSearchParams(queryStr);
      const subj = params.get('subject');
      if (subj) return subj;
    }
    return 'All';
  };

  const [activeTab, setActiveTab] = useState<'all' | 'recent' | 'classic' | 'full-papers'>('all');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedPaper, setSelectedPaper] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>(parseSubjectFromUrl);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  React.useEffect(() => {
    const subj = parseSubjectFromUrl();
    if (subj !== 'All') {
      setSelectedSubject(subj);
    }
  }, [window.location.hash]);

  const filteredQuestions = ALL_GATE_PYQS.filter(q => {
    let matchesTab = true;
    if (activeTab === 'recent') matchesTab = q.year >= 2020;
    if (activeTab === 'classic') matchesTab = q.year < 2020;

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

    return matchesTab && matchesYear && matchesPaper && matchesSubject && matchesType && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30 mb-2">
              <Award className="w-3.5 h-3.5" /> Verified Official GATE Archive
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
              GATE PYQ Library ({ALL_GATE_PYQS.length}+ Verified Questions)
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed mt-1">
              Search and practice official previous year questions from GATE 2007 to GATE 2025. Verified against official master keys with step-by-step derivations.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shrink-0 text-center space-y-1">
            <div className="text-2xl font-black text-emerald-400 font-mono">{ALL_GATE_PYQS.length}+</div>
            <div className="text-[11px] text-slate-400 font-semibold">Verified Questions</div>
          </div>
        </div>

        {/* Library Mode Tabs */}
        <div className="flex items-center gap-2 pt-4 border-t border-slate-800 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Verified PYQs' },
            { id: 'recent', label: 'Recent Years (2020-2025)' },
            { id: 'classic', label: 'Classic PYQs (2007-2019)' },
            { id: 'full-papers', label: 'Full Paper Mode Catalog' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter Bar (for Question Views) */}
        {activeTab !== 'full-papers' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-4 border-t border-slate-800/80">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="All">All Years</option>
                {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2015, 2010, 2007].map(yr => (
                  <option key={yr} value={yr}>GATE {yr}</option>
                ))}
              </select>
            </div>

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

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="All">All Types</option>
                <option value="MCQ">MCQ (Single)</option>
                <option value="MSQ">MSQ (Multiple)</option>
                <option value="NAT">NAT (Numerical)</option>
              </select>
            </div>

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

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Search Keywords</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. 'cache'..."
                className="w-full px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* View 1: Full Paper Catalog */}
      {activeTab === 'full-papers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GATE_PAPERS_CATALOG.map((paper) => (
            <div key={paper.id} className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                    GATE {paper.year} {paper.paper}
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold">{paper.organizingInstitute}</span>
                </div>
                <h3 className="font-bold text-base text-slate-100">{paper.title}</h3>
                <p className="text-xs text-slate-400">Official master paper format with 65 questions, 100 marks, and 180-minute countdown timer.</p>
              </div>

              <button
                onClick={() => onNavigate && onNavigate(`/full-paper/${paper.year}/${paper.paper}`)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-600 hover:from-indigo-600 hover:to-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Attempt Full Paper Exam ({paper.year})</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* View 2: Filtered Questions List */}
      {activeTab !== 'full-papers' && (
        <div className="space-y-6">
          <div className="text-xs text-slate-400">
            Showing <strong className="text-emerald-400">{filteredQuestions.length}</strong> verified questions.
          </div>

          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => <QuestionCard key={q.id} question={q} />)
          ) : (
            <div className="p-12 text-center rounded-3xl glass-card border border-slate-800 text-slate-400">
              No questions match your filter criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
