import React, { useState } from 'react';
import { ALL_GATE_PYQS } from '../data/pyqs';
import { QuestionCard } from '../components/QuestionCard';
import { RefreshCw, Bookmark, AlertTriangle, ArrowLeft, Trash2 } from 'lucide-react';

interface RevisionQueuePageProps {
  onNavigate: (route: string) => void;
}

export const RevisionQueuePage: React.FC<RevisionQueuePageProps> = ({ onNavigate }) => {
  const [revisionQueueIds, setRevisionQueueIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('gatehub_revision_queue');
    return saved ? JSON.parse(saved) : [];
  });

  const [bookmarkIds, setBookmarkIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('gatehub_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState<'revision' | 'bookmarks'>('revision');

  const revisionQuestions = ALL_GATE_PYQS.filter(q => revisionQueueIds.includes(q.id));
  const bookmarkedQuestions = ALL_GATE_PYQS.filter(q => bookmarkIds.includes(q.id));

  const clearQueue = () => {
    if (activeTab === 'revision') {
      localStorage.setItem('gatehub_revision_queue', JSON.stringify([]));
      setRevisionQueueIds([]);
    } else {
      localStorage.setItem('gatehub_bookmarks', JSON.stringify([]));
      setBookmarkIds([]);
    }
  };

  const displayedQuestions = activeTab === 'revision' ? revisionQuestions : bookmarkedQuestions;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/30 mb-2">
              <RefreshCw className="w-3.5 h-3.5" /> Revision & Saved Items
            </div>
            <h1 className="text-3xl font-extrabold text-slate-100">
              Personalized Revision Queue
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Questions you flagged for later review during practice or mock test sessions.
            </p>
          </div>

          {displayedQuestions.length > 0 && (
            <button
              onClick={clearQueue}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All {activeTab === 'revision' ? 'Revision Items' : 'Bookmarks'}
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('revision')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'revision'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Revision Queue ({revisionQuestions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'bookmarks'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Bookmarks ({bookmarkedQuestions.length})</span>
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {displayedQuestions.length > 0 ? (
          displayedQuestions.map((q) => <QuestionCard key={q.id} question={q} />)
        ) : (
          <div className="p-12 text-center rounded-3xl glass-card border border-slate-800 space-y-3">
            <RefreshCw className="w-10 h-10 mx-auto text-slate-600 animate-pulse" />
            <h3 className="text-base font-bold text-slate-200">
              No questions in your {activeTab === 'revision' ? 'Revision Queue' : 'Saved Bookmarks'} yet
            </h3>
            <p className="text-xs text-slate-400">
              While solving PYQs in the explorer or practice mode, click <strong>Revise Later</strong> or <strong>Save</strong> to add items here.
            </p>
            <button
              onClick={() => onNavigate('/pyqs')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all mt-2"
            >
              Browse PYQs Now →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
