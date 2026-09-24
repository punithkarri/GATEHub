import React, { useState } from 'react';
import { REVISION_CARDS } from '../data/revision';
import { GATE_CSE_SUBJECTS } from '../data/syllabus';
import { Zap, Calculator, AlertTriangle, Lightbulb, RotateCw, CheckCircle2 } from 'lucide-react';

export const RevisionPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredCards = REVISION_CARDS.filter(c => selectedSubject === 'All' || c.subjectId === selectedSubject);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold border border-purple-500/30">
          <Zap className="w-3.5 h-3.5" /> High-Yield Formula & Revision Center
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          Formula Sheets & Flashcards
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          Quick review cards covering critical numerical formulas, asymptotic bounds, and common student traps across all GATE CSE subjects.
        </p>

        {/* Subject Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 border-t border-slate-800 pb-1">
          <button
            onClick={() => setSelectedSubject('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              selectedSubject === 'All'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All Subjects
          </button>
          {GATE_CSE_SUBJECTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSubject(s.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                selectedSubject === s.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {s.name} ({s.code})
            </button>
          ))}
        </div>
      </div>

      {/* Revision Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCards.map((card) => {
          const isFlipped = !!flippedCards[card.id];

          return (
            <div
              key={card.id}
              className="p-6 rounded-3xl glass-card border border-slate-800 hover:border-purple-500/40 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/30 font-mono">
                    {card.subjectName} • {card.topic}
                  </span>
                  <button
                    onClick={() => toggleFlip(card.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-400 text-xs flex items-center gap-1 border border-slate-700"
                    title="Toggle details"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Flip</span>
                  </button>
                </div>

                <h3 className="font-bold text-lg text-slate-100">{card.title}</h3>

                <p className="text-xs text-slate-300 leading-relaxed">{card.content}</p>

                {card.formula && (
                  <div className="p-3.5 rounded-2xl bg-slate-950 font-mono text-xs text-emerald-400 border border-slate-800/80 whitespace-pre-line">
                    {card.formula}
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                  <span className="font-bold flex items-center gap-1.5"><Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Key Takeaway:</span>
                  <div className="text-slate-300 mt-0.5">{card.keyTakeaway}</div>
                </div>

                {isFlipped && card.commonTrap && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 animate-fadeIn">
                    <span className="font-bold flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Exam Trap:</span>
                    <div className="text-slate-300 mt-0.5">{card.commonTrap}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
