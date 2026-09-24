import React from 'react';
import { GATE_CSE_SUBJECTS } from '../data/syllabus';
import { TopicStatus, Badge, StudyRecommendation } from '../types';
import { ALL_GATE_PYQS } from '../data/pyqs';
import { LayoutDashboard, CheckCircle2, Flame, Award, HelpCircle, ArrowRight, Target, AlertTriangle, BookOpen, Sparkles, RefreshCw, Zap } from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (route: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const topicStatusMap: Record<string, TopicStatus> = (() => {
    const saved = localStorage.getItem('gatehub_topic_status');
    return saved ? JSON.parse(saved) : {};
  })();

  const revisionQueueIds: string[] = (() => {
    const saved = localStorage.getItem('gatehub_revision_queue');
    return saved ? JSON.parse(saved) : [];
  })();

  const totalTopicsCount = GATE_CSE_SUBJECTS.reduce((acc, s) => acc + s.topics.length, 0);
  const completedTopicsCount = Object.values(topicStatusMap).filter(st => st === 'Completed' || st === 'Strong').length;
  const learningTopicsCount = Object.values(topicStatusMap).filter(st => st === 'Learning' || st === 'Practicing').length;
  const prepPercent = Math.round((completedTopicsCount / totalTopicsCount) * 100);

  // Recommendations generator
  const recommendations: StudyRecommendation[] = [
    {
      id: 'rec-1',
      type: 'practice',
      title: 'Practice Operating Systems Deadlocks',
      reason: 'Deadlocks is a high-yield core OS topic carrying 3-4 marks annually.',
      actionLabel: 'Solve Deadlocks PYQs',
      route: '/pyqs?subject=os',
      priority: 'High'
    },
    {
      id: 'rec-2',
      type: 'revision',
      title: `Revise ${revisionQueueIds.length} Items in Revision Queue`,
      reason: 'You have questions waiting in your revision queue.',
      actionLabel: 'Open Revision Queue',
      route: '/revision-queue',
      priority: 'High'
    },
    {
      id: 'rec-3',
      type: 'mock',
      title: 'Attempt 3-Hour CBT Full Paper Simulator',
      reason: 'Test your 180-minute exam stamina and time management under pressure.',
      actionLabel: 'Launch CBT Simulator',
      route: '/mock-tests',
      priority: 'Medium'
    }
  ];

  // Academic Badges
  const badges: Badge[] = [
    { id: 'b1', title: 'GATE Explorer', description: 'Explored syllabus & topics', iconName: 'BookOpen', category: 'Syllabus', unlocked: true, progressText: 'Unlocked' },
    { id: 'b2', title: 'PYQ Solver', description: 'Solved first 10 GATE PYQs', iconName: 'HelpCircle', category: 'PYQ', unlocked: true, progressText: '10/10 Solved' },
    { id: 'b3', title: 'Mock Test Warrior', description: 'Completed a 3-hour CBT mock exam', iconName: 'Award', category: 'Mock', unlocked: true, progressText: 'Completed' },
    { id: 'b4', title: 'Consistent Aspirant', description: 'Maintained a 5-day study streak', iconName: 'Flame', category: 'Streak', unlocked: true, progressText: '5 Days Active' }
  ];

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
            <div className="text-2xl font-black text-amber-400">{revisionQueueIds.length}</div>
            <div className="text-xs text-slate-400">Items in Revision Queue</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
            <div className="text-2xl font-black text-purple-400 flex items-center justify-center gap-1">
              <Flame className="w-5 h-5 fill-purple-400 text-purple-500" /> 5 Days
            </div>
            <div className="text-xs text-slate-400">Study Streak</div>
          </div>
        </div>
      </div>

      {/* "What Should I Study Now?" Intelligent Recommender */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" /> Recommended Next Preparation Steps
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 uppercase">
                  {rec.priority} Priority
                </span>
                <h4 className="font-bold text-sm text-slate-100">{rec.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{rec.reason}</p>
              </div>

              <button
                onClick={() => onNavigate(rec.route)}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-bold border border-slate-700 transition-colors flex items-center justify-center gap-1"
              >
                <span>{rec.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CBT Exam Attempt History */}
      {(() => {
        const historyStr = localStorage.getItem('gatehub_exam_history');
        const history = historyStr ? JSON.parse(historyStr) : [];
        if (history.length === 0) return null;

        return (
          <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" /> Past CBT Exam Attempt History
              </h3>
              <button
                onClick={() => onNavigate('/mock-tests')}
                className="text-xs text-indigo-400 font-bold hover:underline"
              >
                Take New Mock Exam →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {history.slice(0, 4).map((rec: any) => (
                <div key={rec.id} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-xs text-white">{rec.paperTitle}</h4>
                      <span className="text-[10px] text-slate-400">{rec.date}</span>
                    </div>
                    <span className="text-sm font-black text-emerald-400">{rec.score} / {rec.totalMarks} pts</span>
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2">
                    <span>Accuracy: <strong>{rec.accuracy}%</strong></span>
                    <span>Attempted: <strong>{rec.attempted}/{rec.totalQuestions}</strong></span>
                    <span>Focus Lost: <strong>{rec.focusLossCount}x</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Badges & Achievements */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-400" /> Academic Badges & Milestones
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((b) => (
            <div key={b.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                <Award className="w-5 h-5" />
              </div>
              <div className="font-bold text-xs text-slate-200">{b.title}</div>
              <div className="text-[10px] text-slate-400">{b.description}</div>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 font-mono">
                {b.progressText}
              </span>
            </div>
          ))}
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
