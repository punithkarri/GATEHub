import React, { useState } from 'react';
import { WHERE_TO_STUDY_DATA } from '../data/whereToStudy';
import { Compass, CheckCircle2, ArrowRight, Sparkles, BookOpen, Clock, DollarSign, Lightbulb } from 'lucide-react';

export const WhereToStudyPage: React.FC = () => {
  const [selectedOptionId, setSelectedOptionId] = useState<string>('zero-start');

  const selectedData = WHERE_TO_STUDY_DATA.find(d => d.id === selectedOptionId) || WHERE_TO_STUDY_DATA[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/30">
          <Compass className="w-3.5 h-3.5" /> Resource Decision Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          Where Should I Study for GATE?
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Choosing the right study resources depends on your starting level, timeline, and budget. We provide clear, objective resource strategies without sponsored rankings.
        </p>
      </div>

      {/* Profile Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {WHERE_TO_STUDY_DATA.map((item) => {
          const isSelected = item.id === selectedOptionId;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedOptionId(item.id)}
              className={`p-5 rounded-2xl glass-card border cursor-pointer transition-all space-y-2 ${
                isSelected
                  ? 'bg-indigo-600/20 border-indigo-500 shadow-xl shadow-indigo-500/10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="font-bold text-sm text-slate-100">{item.studentProfile}</div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>{item.timeline}</span>
              </div>
              <div className="text-[11px] font-semibold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 w-fit">
                Budget: {item.budget}
              </div>
            </div>
          );
        })}
      </div>

      {/* Personalized Strategy Output Box */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-6 animate-fadeIn">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Recommended Preparation Strategy</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">{selectedData.studentProfile}</p>
        </div>

        {/* Recommended Strategy Overview */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <div className="font-bold text-indigo-300 text-sm mb-1">Core Approach:</div>
          {selectedData.recommendation.strategy}
        </div>

        {/* Top Resources List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Top Recommended Resources:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selectedData.recommendation.topResources.map((res, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{res}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Routine & Advice */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200 space-y-1">
            <div className="font-bold text-indigo-300 flex items-center gap-1.5"><Clock className="w-4 h-4 text-indigo-400" /> Recommended Daily Routine:</div>
            <p>{selectedData.recommendation.dailyRoutine}</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 space-y-1">
            <div className="font-bold text-amber-300 flex items-center gap-1.5"><Lightbulb className="w-4 h-4 text-amber-400" /> Pro Preparation Advice:</div>
            <p>{selectedData.recommendation.keyAdvice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
