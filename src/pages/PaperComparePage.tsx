import React, { useState } from 'react';
import { ALL_GATE_PYQS } from '../data/pyqs';
import { GATE_PAPERS_CATALOG } from '../data/pyqs/index';
import { Scale, CheckCircle2, ArrowRight } from 'lucide-react';

export const PaperComparePage: React.FC = () => {
  const [selectedYear1, setSelectedYear1] = useState<number>(2025);
  const [selectedYear2, setSelectedYear2] = useState<number>(2024);

  const paper1Questions = ALL_GATE_PYQS.filter(q => q.year === selectedYear1);
  const paper2Questions = ALL_GATE_PYQS.filter(q => q.year === selectedYear2);

  const getStats = (questions: typeof ALL_GATE_PYQS) => {
    const mcq = questions.filter(q => q.type === 'MCQ').length;
    const msq = questions.filter(q => q.type === 'MSQ').length;
    const nat = questions.filter(q => q.type === 'NAT').length;
    const easy = questions.filter(q => q.difficulty === 'Easy').length;
    const med = questions.filter(q => q.difficulty === 'Medium').length;
    const hard = questions.filter(q => q.difficulty === 'Hard').length;

    return { total: questions.length, mcq, msq, nat, easy, med, hard };
  };

  const stats1 = getStats(paper1Questions);
  const stats2 = getStats(paper2Questions);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/30">
          <Scale className="w-3.5 h-3.5" /> Historical Paper Comparison Tool
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          Compare GATE Exam Years
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Select two exam years to compare question types, difficulty levels, and subject weightage side-by-side.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-2">
          <label className="block text-xs font-bold text-indigo-400 uppercase">Select First Year:</label>
          <select
            value={selectedYear1}
            onChange={(e) => setSelectedYear1(Number(e.target.value))}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none"
          >
            {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2015, 2010, 2007].map(yr => (
              <option key={yr} value={yr}>GATE {yr}</option>
            ))}
          </select>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-2">
          <label className="block text-xs font-bold text-purple-400 uppercase">Select Second Year:</label>
          <select
            value={selectedYear2}
            onChange={(e) => setSelectedYear2(Number(e.target.value))}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none"
          >
            {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2015, 2010, 2007].map(yr => (
              <option key={yr} value={yr}>GATE {yr}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Year 1 Card */}
        <div className="p-6 rounded-3xl glass-card border border-indigo-500/30 space-y-4">
          <h3 className="font-extrabold text-xl text-indigo-300">GATE {selectedYear1} Exam Stats</h3>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
              <span>Verified Questions in Database:</span>
              <span className="font-bold text-slate-100">{stats1.total}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
              <span>Question Types (MCQ / MSQ / NAT):</span>
              <span className="font-bold text-slate-100">{stats1.mcq} MCQ | {stats1.msq} MSQ | {stats1.nat} NAT</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
              <span>Difficulty Distribution:</span>
              <span className="font-bold text-slate-100">{stats1.easy} Easy | {stats1.med} Med | {stats1.hard} Hard</span>
            </div>
          </div>
        </div>

        {/* Year 2 Card */}
        <div className="p-6 rounded-3xl glass-card border border-purple-500/30 space-y-4">
          <h3 className="font-extrabold text-xl text-purple-300">GATE {selectedYear2} Exam Stats</h3>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
              <span>Verified Questions in Database:</span>
              <span className="font-bold text-slate-100">{stats2.total}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
              <span>Question Types (MCQ / MSQ / NAT):</span>
              <span className="font-bold text-slate-100">{stats2.mcq} MCQ | {stats2.msq} MSQ | {stats2.nat} NAT</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
              <span>Difficulty Distribution:</span>
              <span className="font-bold text-slate-100">{stats2.easy} Easy | {stats2.med} Med | {stats2.hard} Hard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
