import React, { useState } from 'react';
import { Search, X, BookOpen, HelpCircle, FileText, Compass, ExternalLink } from 'lucide-react';
import { GATE_CSE_SUBJECTS } from '../data/syllabus';
import { GATE_PYQS } from '../data/pyqs';
import { GATE_RESOURCES } from '../data/resources';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const searchQuery = query.trim().toLowerCase();

  const matchingSubjects = searchQuery ? GATE_CSE_SUBJECTS.filter(s =>
    s.name.toLowerCase().includes(searchQuery) ||
    s.code.toLowerCase().includes(searchQuery) ||
    s.description.toLowerCase().includes(searchQuery)
  ) : [];

  const matchingTopics = searchQuery ? GATE_CSE_SUBJECTS.flatMap(s =>
    s.topics.filter(t => t.name.toLowerCase().includes(searchQuery) || t.subtopics.some(sub => sub.toLowerCase().includes(searchQuery)))
      .map(t => ({ ...t, subjectName: s.name, subjectId: s.id }))
  ) : [];

  const matchingQuestions = searchQuery ? GATE_PYQS.filter(q =>
    q.questionText.toLowerCase().includes(searchQuery) ||
    q.topic.toLowerCase().includes(searchQuery) ||
    q.conceptTested.toLowerCase().includes(searchQuery)
  ) : [];

  const matchingResources = searchQuery ? GATE_RESOURCES.filter(r =>
    r.name.toLowerCase().includes(searchQuery) ||
    r.description.toLowerCase().includes(searchQuery) ||
    r.tags.some(t => t.toLowerCase().includes(searchQuery))
  ) : [];

  const hasResults = matchingSubjects.length > 0 || matchingTopics.length > 0 || matchingQuestions.length > 0 || matchingResources.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 dark:bg-slate-900 light:bg-white rounded-2xl border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="relative p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics (e.g. 'deadlock', 'dijkstra', 'bcnf', 'sliding window')..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 focus:outline-none text-base"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 hover:text-white text-slate-400">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="px-2 py-1 text-xs font-medium text-slate-400 hover:text-white border border-slate-700 rounded-md">
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1">
          {!query && (
            <div className="text-center py-8 text-slate-400 space-y-2">
              <Compass className="w-8 h-8 mx-auto text-indigo-400/60 animate-bounce" />
              <p className="text-sm">Type any concept, subject, PYQ keyword, or resource to search across GATEHub.</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['Deadlock', 'Dijkstra', 'Pipelining', 'BCNF', 'Subnetting', 'Master Theorem'].map(sample => (
                  <button
                    key={sample}
                    onClick={() => setQuery(sample)}
                    aria-label={`Search for ${sample}`}
                    className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-indigo-600/30 hover:text-indigo-300 rounded-full text-slate-300 border border-slate-700/50 transition-colors"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && !hasResults && (
            <div className="text-center py-8 text-slate-400">
              <p className="text-sm">No results found for "<span className="text-slate-200">{query}</span>".</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for broader terms like "OS", "Trees", "Paging", or "Logic".</p>
            </div>
          )}

          {/* Subjects */}
          {matchingSubjects.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Subjects ({matchingSubjects.length})
              </h4>
              <div className="space-y-1.5">
                {matchingSubjects.map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      onNavigate(`/subject/${sub.id}`);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-lg bg-slate-800/60 hover:bg-indigo-600/20 hover:border-indigo-500/40 border border-slate-800 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-medium text-sm text-slate-200 group-hover:text-indigo-300">{sub.name} ({sub.code})</div>
                      <div className="text-xs text-slate-400">{sub.marksWeightage} • {sub.topics.length} Topics</div>
                    </div>
                    <span className="text-xs text-indigo-400 font-medium">View Subject →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Topics */}
          {matchingTopics.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-purple-400" /> Syllabus Topics ({matchingTopics.length})
              </h4>
              <div className="space-y-1.5">
                {matchingTopics.slice(0, 5).map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      onNavigate(`/subject/${topic.subjectId}`);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-lg bg-slate-800/60 hover:bg-purple-600/20 hover:border-purple-500/40 border border-slate-800 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-medium text-sm text-slate-200 group-hover:text-purple-300">{topic.name}</div>
                      <div className="text-xs text-slate-400">{topic.subjectName} • {topic.weightageEstimate}</div>
                    </div>
                    <span className="text-xs text-purple-400 font-medium">Topic Details →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PYQs */}
          {matchingQuestions.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-400" /> GATE PYQs ({matchingQuestions.length})
              </h4>
              <div className="space-y-1.5">
                {matchingQuestions.slice(0, 4).map(q => (
                  <button
                    key={q.id}
                    onClick={() => {
                      onNavigate(`/pyqs?q=${q.id}`);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-lg bg-slate-800/60 hover:bg-emerald-600/20 hover:border-emerald-500/40 border border-slate-800 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-medium text-xs text-emerald-400 font-mono">GATE {q.year} {q.paper} • Q{q.questionNo} ({q.type})</div>
                      <div className="text-xs text-slate-300 line-clamp-1">{q.questionText}</div>
                    </div>
                    <span className="text-xs text-emerald-400 font-medium shrink-0 ml-2">Solve →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {matchingResources.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" /> Study Resources ({matchingResources.length})
              </h4>
              <div className="space-y-1.5">
                {matchingResources.slice(0, 3).map(r => (
                  <a
                    key={r.id}
                    href={r.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block p-2.5 rounded-lg bg-slate-800/60 hover:bg-amber-600/20 hover:border-amber-500/40 border border-slate-800 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm text-slate-200 group-hover:text-amber-300">{r.name}</div>
                      <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">{r.type}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{r.description}</div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
