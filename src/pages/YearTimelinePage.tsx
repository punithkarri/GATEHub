import React from 'react';
import { GATE_PAPERS_CATALOG, ALL_GATE_PYQS } from '../data/pyqs/index';
import { Calendar, Award, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';

interface YearTimelinePageProps {
  onNavigate: (route: string) => void;
}

export const YearTimelinePage: React.FC<YearTimelinePageProps> = ({ onNavigate }) => {
  const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/30">
          <Calendar className="w-3.5 h-3.5" /> GATE Historical Archive (2007 - 2025)
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          Interactive GATE Paper Timeline
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Navigate 18+ years of official GATE papers. Select any year to explore master question papers, official answer keys, and attempt full exam simulations.
        </p>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {years.map((year) => {
          const yearPapers = GATE_PAPERS_CATALOG.filter(p => p.year === year);
          const yearPyqsCount = ALL_GATE_PYQS.filter(q => q.year === year).length;

          return (
            <div key={year} className="p-6 rounded-3xl glass-card border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-2xl text-indigo-400 font-mono">
                    GATE {year}
                  </span>
                  {yearPapers.length > 0 && (
                    <span className="text-xs font-semibold text-slate-300">
                      Organized by {yearPapers[0].organizingInstitute}
                    </span>
                  )}
                </div>

                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 w-fit">
                  {yearPyqsCount > 0 ? `${yearPyqsCount} Verified PYQs Available` : 'Master Paper Archive'}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 text-xs pt-1">
                <p className="text-slate-400">
                  Official Master Question Papers and final keys verified against official IIT sources.
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => onNavigate(`/pyqs?year=${year}`)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 font-semibold border border-slate-700 transition-colors"
                  >
                    View GATE {year} PYQs →
                  </button>

                  <a
                    href="https://gate2025.iitr.ac.in"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 flex items-center gap-1"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
