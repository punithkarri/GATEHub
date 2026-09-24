import React, { useState } from 'react';
import { GATE_ROADMAPS } from '../data/roadmaps';
import { Target, CheckCircle2, Circle, Clock, Award, Sparkles } from 'lucide-react';

export const RoadmapsPage: React.FC = () => {
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>('6-month-plan');
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('gatehub_roadmap_milestones');
    return saved ? JSON.parse(saved) : {};
  });

  const toggleMilestone = (key: string) => {
    const updated = { ...completedMilestones, [key]: !completedMilestones[key] };
    setCompletedMilestones(updated);
    localStorage.setItem('gatehub_roadmap_milestones', JSON.stringify(updated));
  };

  const activeRoadmap = GATE_ROADMAPS.find(r => r.id === selectedRoadmapId) || GATE_ROADMAPS[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/30">
          <Target className="w-3.5 h-3.5" /> Structured GATE Preparation Timelines
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          Preparation Roadmaps & Milestone Checklists
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Step-by-step phase plans designed to maximize score efficiency whether you have 6 months, 3 months, or 7 days remaining.
        </p>
      </div>

      {/* Roadmap Selector Tabs */}
      <div className="flex justify-center gap-3 overflow-x-auto py-1">
        {GATE_ROADMAPS.map((rm) => {
          const isSelected = rm.id === selectedRoadmapId;
          return (
            <button
              key={rm.id}
              onClick={() => setSelectedRoadmapId(rm.id)}
              className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                isSelected
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/20'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{rm.title}</span>
            </button>
          );
        })}
      </div>

      {/* Roadmap Phase Timeline */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-extrabold text-slate-100">{activeRoadmap.title}</h2>
          <p className="text-xs text-indigo-400 mt-1 font-semibold">{activeRoadmap.duration} • Target: {activeRoadmap.targetAudience}</p>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">{activeRoadmap.description}</p>
        </div>

        {/* Phases Loop */}
        <div className="space-y-6">
          {activeRoadmap.phases.map((phase) => (
            <div key={phase.phaseNumber} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs font-mono">
                    P{phase.phaseNumber}
                  </div>
                  <h3 className="font-bold text-base text-slate-100">{phase.title}</h3>
                </div>
                <span className="text-xs font-mono text-indigo-400 font-semibold">{phase.durationWeeks}</span>
              </div>

              {/* Focus Subjects */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Focus Subjects:</span>
                {phase.focusSubjects.map((sub, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                    {sub}
                  </span>
                ))}
              </div>

              {/* Action Items Checkbox List */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Phase Action Checkpoints:</h4>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  {phase.actionItems.map((item, idx) => {
                    const key = `${activeRoadmap.id}-p${phase.phaseNumber}-item${idx}`;
                    const isChecked = !!completedMilestones[key];

                    return (
                      <div
                        key={idx}
                        onClick={() => toggleMilestone(key)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isChecked
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200 line-through'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {isChecked ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                        )}
                        <span>{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
