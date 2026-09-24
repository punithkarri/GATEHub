import React from 'react';
import { GATE_CSE_SUBJECTS } from '../data/syllabus';
import { TopicStatus } from '../types';
import { LayoutDashboard, CheckCircle2, Flame, Award, HelpCircle, ArrowRight, Target, AlertTriangle, BookOpen } from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (route: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const topicStatusMap: Record<string, TopicStatus> = (() => {
    const saved = localStorage.getItem('gatehub_topic_status');
    return saved ? JSON.parse(saved) : {};
  })();

  const totalTopicsCount = GATE_CSE_SUBJECTS.reduce((acc, s) => acc + s.topics.length, 0);
  const completedTopicsCount = Object.values(topicStatusMap).filter(st => st === 'Completed' || st === 'Strong').length;
  const learningTopicsCount = Object.values(topicStatusMap).filter(st => st === 'Learning' || st === 'Practicing').length;
  const prepPercent = Math.round((completedTopicsCount / totalTopicsCount) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/30 mb-2">
              <LayoutDashboard className="w-3.5 h-3.5" /> Student Analytics Dashboard
            </div>
            <h1 className="text-3xl font-extrabold text-slate-100">Welcome Back, Aspirant!</h1>
            <p className="text-xs text-slate-400 mt-1">Here is your live preparation velocity & syllabus tracking breakdown.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('/practice')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20"
            >
              Resume Quiz Practice
            </button>
          </div>
        </div>

        {/* Progress Gauges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
            <div className="text-2xl font-black text-emerald-400">{prepPercent}%</div>
            <div className="text-xs text-slate-400">Syllabus Mastered</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
            <div className="text-2xl font-black text-indigo-400">{completedTopicsCount} / {totalTopicsCount}</div>
            <div className="text-xs text-slate-400">Topics Completed</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
            <div className="text-2xl font-black text-amber-400">{learningTopicsCount}</div>
            <div className="text-xs text-slate-400">Topics In Progress</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
            <div className="text-2xl font-black text-purple-400 flex items-center justify-center gap-1">
              <Flame className="w-5 h-5 fill-purple-400 text-purple-500" /> 5 Days
            </div>
            <div className="text-xs text-slate-400">Study Streak</div>
          </div>
        </div>
      </div>

      {/* Subject Wise Completion Status */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-400" /> Subject Readiness Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GATE_CSE_SUBJECTS.map((subj) => {
            const subjTopics = subj.topics;
            const completedInSubj = subjTopics.filter(t => topicStatusMap[t.id] === 'Completed' || topicStatusMap[t.id] === 'Strong').length;
            const pct = Math.round((completedInSubj / subjTopics.length) * 100);

            return (
              <div key={subj.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">{subj.name} ({subj.code})</span>
                  <span className="font-mono text-emerald-400 font-semibold">{completedInSubj}/{subjTopics.length} ({pct}%)</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
