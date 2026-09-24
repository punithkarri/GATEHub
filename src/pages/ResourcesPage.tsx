import React, { useState } from 'react';
import { GATE_RESOURCES } from '../data/resources';
import { ExternalLink, Search, Filter, Star, BookOpen, ShieldCheck } from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredResources = GATE_RESOURCES.filter(r => {
    const matchesType = selectedType === 'All' || r.type === selectedType;
    const matchesQuery =
      !searchQuery.trim() ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesType && matchesQuery;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/30">
          <BookOpen className="w-3.5 h-3.5" /> Curated GATE Study Directory
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          GATE Study Resources & References
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          Standard textbooks, NPTEL video courses, Gate Overflow PYQ portals, and official IIT resources — verified and organized by subject.
        </p>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources (e.g., 'clrs', 'gateoverflow', 'networks')..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none"
            >
              <option value="All">All Resource Types</option>
              <option value="Book">Standard Textbooks</option>
              <option value="YouTube">Video Lectures (NPTEL/YT)</option>
              <option value="Practice Platform">Practice Platforms</option>
              <option value="Official">Official IIT Resources</option>
              <option value="Website">Revision Websites</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((res) => (
          <div key={res.id} className="p-6 rounded-3xl glass-card border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-mono">
                  {res.type}
                </span>
                <span className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border ${
                  res.isFree ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  {res.isFree ? 'FREE Resource' : 'Paid Textbook'}
                </span>
              </div>

              <h3 className="font-bold text-lg text-slate-100 group-hover:text-indigo-300 transition-colors">
                {res.name}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                {res.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {res.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{res.rating} / 5.0</span>
                <span className="text-slate-500 ml-1">({res.sourceName})</span>
              </div>

              <a
                href={res.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 font-bold border border-indigo-500/40 flex items-center gap-1 transition-all"
              >
                <span>Visit Source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
