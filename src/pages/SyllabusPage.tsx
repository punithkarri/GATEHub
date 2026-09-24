import React, { useState, useEffect } from 'react';
import { GATE_CSE_SUBJECTS } from '../data/syllabus';
import { TopicStatus } from '../types';
import { BookOpen, CheckCircle2, Clock, Search, Filter, Sparkles, ChevronDown, ChevronUp, Zap, HelpCircle } from 'lucide-react';

interface SyllabusPageProps {
  onNavigate: (route: string) => void;
}

export const SyllabusPage: React.FC<SyllabusPageProps> = ({ onNavigate }) => {
  const [topicStatusMap, setTopicStatusMap] = useState<Record<string, TopicStatus>>(() => {
    const saved = localStorage.getItem('gatehub_topic_status');
    return saved ? JSON.parse(saved) : {};
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImportance, setSelectedImportance] = useState<string>('All');
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({
    em: true,
    algo: true,
    os: true
  });

  useEffect(() => {
    localStorage.setItem('gatehub_topic_status', JSON.stringify(topicStatusMap));
  }, [topicStatusMap]);

  const handleStatusChange = (topicId: string, status: TopicStatus) => {
    setTopicStatusMap(prev => ({ ...prev, [topicId]: status }));
  };

  const toggleSubjectExpand = (subjId: string) => {
    setExpandedSubjects(prev => ({ ...prev, [subjId]: !prev[subjId] }));
  };

  // Compute total progress statistics
  const totalTopicsCount = GATE_CSE_SUBJECTS.reduce((acc, s) => acc + s.topics.length, 0);
  const completedTopicsCount = Object.values(topicStatusMap).filter(st => st === 'Completed' || st === 'Strong').length;
  const progressPercent = totalTopicsCount > 0 ? Math.round((completedTopicsCount / totalTopicsCount) * 100) : 0;

  const statusColors: Record<TopicStatus, string> = {
    'Not Started': 'bg-slate-800 text-slate-400 border-slate-700',
    'Learning': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Practicing': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'Strong': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Completed': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header & Progress Summary */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Interactive Syllabus Tracker
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
              GATE CSE Syllabus Explorer
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Mark topics as Learning, Practicing, Strong, or Completed. Progress is saved locally in your browser.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shrink-0 space-y-2 min-w-[240px]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Syllabus Completion:</span>
              <span className="font-bold text-emerald-400 font-mono">{completedTopicsCount} / {totalTopicsCount} ({progressPercent}%)</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-slate-800/80">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g., 'bcnf', 'recursion', 'pipelining')..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedImportance}
              onChange={(e) => setSelectedImportance(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none"
            >
              <option value="All">All Importance Levels</option>
              <option value="High">High Importance Only</option>
              <option value="Medium">Medium Importance</option>
              <option value="Low">Low Importance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subject Syllabus Tree */}
      <div className="space-y-6">
        {GATE_CSE_SUBJECTS.map((subject) => {
          const filteredTopics = subject.topics.filter(topic => {
            const matchesQuery =
              topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              topic.subtopics.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesImportance = selectedImportance === 'All' || topic.importance === selectedImportance;
            return matchesQuery && matchesImportance;
          });

          if (filteredTopics.length === 0 && searchQuery) return null;

          const isExpanded = expandedSubjects[subject.id] ?? false;

          return (
            <div key={subject.id} className="rounded-3xl glass-card border border-slate-800 overflow-hidden shadow-lg">
              {/* Subject Accordion Header */}
              <div
                onClick={() => toggleSubjectExpand(subject.id)}
                className="p-5 bg-slate-900/80 hover:bg-slate-900 border-b border-slate-800 cursor-pointer flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                    {subject.code}
                  </span>
                  <div>
                    <h3 className="font-bold text-base text-slate-100">{subject.name}</h3>
                    <div className="text-xs text-slate-400">{subject.marksWeightage} • {subject.topics.length} Core Topics</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(`/subject/${subject.id}`);
                    }}
                    className="hidden sm:inline-block px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-semibold border border-slate-700 transition-colors"
                  >
                    View Subject Details →
                  </button>

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Topics Tree Body */}
              {isExpanded && (
                <div className="p-5 space-y-4 bg-slate-950/40">
                  {filteredTopics.map((topic) => {
                    const currentStatus = topicStatusMap[topic.id] || 'Not Started';

                    return (
                      <div key={topic.id} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-slate-100">{topic.name}</h4>
                              <span className={`px-2 py-0.5 text-[10px] font-semibold rounded border ${
                                topic.importance === 'High' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'
                              }`}>
                                {topic.importance} Importance ({topic.weightageEstimate})
                              </span>
                            </div>
                          </div>

                          {/* Status Dropdown / Button Selector */}
                          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                            {(['Not Started', 'Learning', 'Practicing', 'Strong', 'Completed'] as TopicStatus[]).map((st) => (
                              <button
                                key={st}
                                onClick={() => handleStatusChange(topic.id, st)}
                                className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-all ${
                                  currentStatus === st
                                    ? statusColors[st] + ' shadow-sm font-bold'
                                    : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
                                }`}
                              >
                                {st}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Subtopics List */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {topic.subtopics.map((sub, idx) => (
                            <span key={idx} className="px-2 py-1 rounded-md bg-slate-800/60 border border-slate-800 text-[11px] text-slate-300">
                              • {sub}
                            </span>
                          ))}
                        </div>

                        {/* Important Concepts */}
                        {topic.importantConcepts && topic.importantConcepts.length > 0 && (
                          <div className="p-2.5 rounded-xl bg-purple-500/5 border border-purple-500/10 text-[11px] text-purple-300 space-y-1">
                            <span className="font-bold flex items-center gap-1"><Zap className="w-3 h-3 text-purple-400" /> Key Exam Concepts:</span>
                            <div className="flex flex-wrap gap-2 text-slate-300">
                              {topic.importantConcepts.map((c, i) => (
                                <span key={i} className="underline decoration-purple-500/40">{c}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
