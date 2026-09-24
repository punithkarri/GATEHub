import React from 'react';
import { Subject } from '../types';
import {
  Calculator,
  Cpu,
  Server,
  Code,
  Activity,
  FileCode,
  Terminal,
  Layers,
  Database,
  Wifi,
  Globe,
  ChevronRight,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

interface SubjectCardProps {
  subject: Subject;
  completedTopicsCount?: number;
  onSelect: (subjectId: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Calculator: <Calculator className="w-6 h-6 text-indigo-400" />,
  Cpu: <Cpu className="w-6 h-6 text-purple-400" />,
  Server: <Server className="w-6 h-6 text-pink-400" />,
  Code: <Code className="w-6 h-6 text-cyan-400" />,
  Activity: <Activity className="w-6 h-6 text-emerald-400" />,
  FileCode: <FileCode className="w-6 h-6 text-amber-400" />,
  Terminal: <Terminal className="w-6 h-6 text-orange-400" />,
  Layers: <Layers className="w-6 h-6 text-blue-400" />,
  Database: <Database className="w-6 h-6 text-teal-400" />,
  Wifi: <Wifi className="w-6 h-6 text-indigo-400" />,
  Globe: <Globe className="w-6 h-6 text-rose-400" />,
};

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, completedTopicsCount = 0, onSelect }) => {
  const totalTopics = subject.topics.length;
  const progressPercentage = Math.round((completedTopicsCount / totalTopics) * 100);

  return (
    <div
      onClick={() => onSelect(subject.id)}
      className="group relative rounded-2xl glass-card p-6 border border-slate-800 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Header row with Icon and Weightage Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover:scale-110 transition-transform">
            {iconMap[subject.iconName] || <BookOpen className="w-6 h-6 text-indigo-400" />}
          </div>
          <span className="px-2.5 py-1 text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded-full">
            {subject.marksWeightage}
          </span>
        </div>

        {/* Title and Code */}
        <div className="flex items-baseline gap-2 mb-1">
          <h3 className="font-bold text-lg text-slate-100 group-hover:text-indigo-300 transition-colors">
            {subject.name}
          </h3>
          <span className="text-xs font-mono text-slate-400 font-semibold">({subject.code})</span>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {subject.description}
        </p>
      </div>

      <div>
        {/* Topics Count & Progress Bar */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs mb-2">
          <span className="text-slate-400 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            {totalTopics} Topics
          </span>
          <span className="text-slate-300 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            {completedTopicsCount}/{totalTopics} ({progressPercentage}%)
          </span>
        </div>

        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mb-4">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* CTA Button */}
        <div className="flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
          <span>Explore Subject</span>
          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
