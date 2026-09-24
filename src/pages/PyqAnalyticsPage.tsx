import React from 'react';
import { ALL_GATE_PYQS } from '../data/pyqs';
import { GATE_CSE_SUBJECTS } from '../data/syllabus';
import { BarChart3, TrendingUp, HelpCircle, BookOpen, Layers, Award, Sparkles } from 'lucide-react';

export const PyqAnalyticsPage: React.FC = () => {
  const totalQuestions = ALL_GATE_PYQS.length;

  // Calculate subject distributions based ONLY on actual dataset
  const subjectStats = GATE_CSE_SUBJECTS.map((subj) => {
    const questions = ALL_GATE_PYQS.filter(q => q.subjectId === subj.id);
    const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

    // Topic frequency
    const topicFreq: Record<string, number> = {};
    questions.forEach(q => {
      topicFreq[q.topic] = (topicFreq[q.topic] || 0) + 1;
    });

    const sortedTopics = Object.entries(topicFreq).sort((a, b) => b[1] - a[1]);

    return {
      subject: subj,
      questionCount: questions.length,
      totalMarks,
      topTopics: sortedTopics.slice(0, 3)
    };
  });

  // Calculate difficulty distribution
  const easyCount = ALL_GATE_PYQS.filter(q => q.difficulty === 'Easy').length;
  const mediumCount = ALL_GATE_PYQS.filter(q => q.difficulty === 'Medium').length;
  const hardCount = ALL_GATE_PYQS.filter(q => q.difficulty === 'Hard').length;

  // Calculate type distribution
  const mcqCount = ALL_GATE_PYQS.filter(q => q.type === 'MCQ').length;
  const msqCount = ALL_GATE_PYQS.filter(q => q.type === 'MSQ').length;
  const natCount = ALL_GATE_PYQS.filter(q => q.type === 'NAT').length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold border border-purple-500/30">
          <BarChart3 className="w-3.5 h-3.5" /> Historical Exam Analytics
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          GATE PYQ Frequency & Topic Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          Historical observations calculated strictly from the verified GATE dataset. Analyze subject weightage, topic recurrence, and question type distribution.
        </p>
      </div>

      {/* Dataset Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-card border border-slate-800 text-center">
          <div className="text-xs text-slate-400">Total Analyzed PYQs</div>
          <div className="text-2xl font-black text-indigo-400 mt-1">{totalQuestions} Questions</div>
        </div>
        <div className="p-4 rounded-2xl glass-card border border-slate-800 text-center">
          <div className="text-xs text-slate-400">Question Types</div>
          <div className="text-xs font-bold text-slate-200 mt-2">
            MCQ: {mcqCount} | MSQ: {msqCount} | NAT: {natCount}
          </div>
        </div>
        <div className="p-4 rounded-2xl glass-card border border-slate-800 text-center">
          <div className="text-xs text-slate-400">Difficulty Split</div>
          <div className="text-xs font-bold text-slate-200 mt-2">
            Easy: {easyCount} | Med: {mediumCount} | Hard: {hardCount}
          </div>
        </div>
        <div className="p-4 rounded-2xl glass-card border border-slate-800 text-center">
          <div className="text-xs text-slate-400">Coverage Years</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">2007 – 2025</div>
        </div>
      </div>

      {/* Subject-Wise PYQ Weightage Breakdown */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" /> Subject & Topic Recurrence Analysis
        </h2>

        <div className="space-y-4">
          {subjectStats.map(({ subject, questionCount, totalMarks, topTopics }) => {
            const barWidth = totalQuestions > 0 ? Math.round((questionCount / totalQuestions) * 100) : 0;

            return (
              <div key={subject.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-mono font-bold text-indigo-300 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 mr-2">
                      {subject.code}
                    </span>
                    <span className="font-bold text-slate-100 text-sm">{subject.name}</span>
                  </div>
                  <span className="text-slate-400 font-medium">
                    {questionCount} Questions ({totalMarks} Total Marks)
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full" style={{ width: `${Math.max(barWidth, 8)}%` }} />
                </div>

                {/* Top Recurrent Topics */}
                {topTopics.length > 0 && (
                  <div className="flex flex-wrap gap-2 text-[11px] pt-1">
                    <span className="text-slate-500 font-semibold">High Recurrence Topics:</span>
                    {topTopics.map(([topic, cnt], i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-purple-300 border border-slate-700">
                        {topic} ({cnt} PYQs)
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
