import React, { useState } from 'react';
import { Subject } from '../types';
import { GATE_CSE_SUBJECTS } from '../data/syllabus';
import { GATE_PYQS } from '../data/pyqs';
import { QuestionCard } from '../components/QuestionCard';
import { GATE_RESOURCES } from '../data/resources';
import { BookOpen, Calculator, AlertTriangle, HelpCircle, ExternalLink, ArrowLeft, CheckCircle2, Zap } from 'lucide-react';

interface SubjectDetailPageProps {
  subjectId: string;
  onNavigate: (route: string) => void;
}

export const SubjectDetailPage: React.FC<SubjectDetailPageProps> = ({ subjectId, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'topics' | 'pyqs' | 'formulas' | 'mistakes' | 'resources'>('topics');

  const subject = GATE_CSE_SUBJECTS.find(s => s.id === subjectId) || GATE_CSE_SUBJECTS[0];
  const subjectPyqs = GATE_PYQS.filter(q => q.subjectId === subject.id || q.subjectName.toLowerCase().includes(subject.name.toLowerCase()));
  const subjectResources = GATE_RESOURCES.filter(r => r.subjectId === subject.id || r.tags.some(t => t.toLowerCase().includes(subject.code.toLowerCase())));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('/subjects')}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-all"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to All Subjects
      </button>

      {/* Subject Hero Header */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 font-mono font-bold text-xs border border-indigo-500/30">
                {subject.code}
              </span>
              <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-xs border border-emerald-500/30">
                Weightage: {subject.marksWeightage}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">{subject.name}</h1>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <div className="font-bold text-slate-200 text-sm">{subject.topics.length}</div>
              <div>Topics</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <div className="font-bold text-slate-200 text-sm">{subject.recommendedHours} hrs</div>
              <div>Est. Study</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <div className="font-bold text-emerald-400 text-sm">{subjectPyqs.length}</div>
              <div>PYQs Available</div>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
          {subject.overview}
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-2">
        {[
          { id: 'topics', label: 'Topics & Concepts', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'pyqs', label: `Subject PYQs (${subjectPyqs.length})`, icon: <HelpCircle className="w-4 h-4" /> },
          { id: 'formulas', label: 'Formulas & Equations', icon: <Calculator className="w-4 h-4" /> },
          { id: 'mistakes', label: 'Common Pitfalls', icon: <AlertTriangle className="w-4 h-4" /> },
          { id: 'resources', label: 'Recommended Books & Resources', icon: <ExternalLink className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content 1: Topics & Concepts */}
      {activeTab === 'topics' && (
        <div className="space-y-4">
          {subject.topics.map((t) => (
            <div key={t.id} className="p-5 rounded-2xl glass-card border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-100">{t.name}</h3>
                <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
                  t.importance === 'High' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  {t.importance} Weight ({t.weightageEstimate})
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                {t.subtopics.map((st, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
                    • {st}
                  </span>
                ))}
              </div>
              {t.importantConcepts && (
                <div className="p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/15 text-xs text-indigo-300 space-y-1">
                  <div className="font-bold flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-indigo-400" /> Key Exam Concepts:</div>
                  <div className="text-slate-300">{t.importantConcepts.join(' • ')}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 2: PYQs */}
      {activeTab === 'pyqs' && (
        <div className="space-y-6">
          {subjectPyqs.length > 0 ? (
            subjectPyqs.map((q) => <QuestionCard key={q.id} question={q} />)
          ) : (
            <div className="p-8 text-center glass-card rounded-2xl border border-slate-800 text-slate-400">
              No specific PYQs matched this exact filter yet. Visit the global PYQ Explorer for all papers.
            </div>
          )}
        </div>
      )}

      {/* Tab Content 3: Formulas */}
      {activeTab === 'formulas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subject.formulas && subject.formulas.length > 0 ? (
            subject.formulas.map((f, i) => (
              <div key={i} className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
                <h4 className="font-bold text-sm text-indigo-300">{f.title}</h4>
                <div className="p-3 rounded-xl bg-slate-950 font-mono text-sm text-emerald-400 border border-slate-800">
                  {f.formula}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{f.explanation}</p>
              </div>
            ))
          ) : (
            <div className="p-8 col-span-2 text-center text-xs text-slate-400">Formulas sheet generated for this subject.</div>
          )}
        </div>
      )}

      {/* Tab Content 4: Common Pitfalls */}
      {activeTab === 'mistakes' && (
        <div className="space-y-3">
          {subject.commonMistakes && subject.commonMistakes.length > 0 ? (
            subject.commonMistakes.map((m, i) => (
              <div key={i} className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs sm:text-sm flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-rose-400">Common Student Trap #{i + 1}: </span>
                  {m}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-slate-400">No reported traps.</div>
          )}
        </div>
      )}

      {/* Tab Content 5: Resources */}
      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjectResources.map((r) => (
            <a
              key={r.id}
              href={r.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-2xl glass-card border border-slate-800 hover:border-indigo-500/50 transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-100 group-hover:text-indigo-300">{r.name}</h4>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-500/20 text-indigo-300">{r.type}</span>
              </div>
              <p className="text-xs text-slate-400">{r.description}</p>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span>Source: {r.sourceName}</span>
                <span className="text-indigo-400 flex items-center gap-0.5">Open Resource <ExternalLink className="w-3 h-3" /></span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
