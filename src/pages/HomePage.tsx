import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Clock,
  Compass,
  TrendingUp,
  FileText,
  Target,
  ChevronDown,
  ChevronUp,
  Award,
  Zap,
  BarChart3,
  Calendar,
  Scale,
  Play,
  RotateCcw
} from 'lucide-react';
import { GATE_CSE_SUBJECTS } from '../data/syllabus';
import { SubjectCard } from '../components/SubjectCard';
import { ALL_GATE_PYQS } from '../data/pyqs';
import { QuestionCard } from '../components/QuestionCard';

interface HomePageProps {
  onNavigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [qotdIndex, setQotdIndex] = useState<number>(0);

  const activeExamStr = localStorage.getItem('gatehub_active_exam');
  const activeExam = activeExamStr ? JSON.parse(activeExamStr) : null;

  const stats = [
    { label: 'Core CSE Subjects', value: '11', icon: <BookOpen className="w-5 h-5 text-indigo-400" /> },
    { label: 'Syllabus Topics', value: '50+', icon: <FileText className="w-5 h-5 text-purple-400" /> },
    { label: 'Verified GATE PYQs', value: `${ALL_GATE_PYQS.length}+`, icon: <HelpCircle className="w-5 h-5 text-emerald-400" /> },
    { label: 'Mock Test Simulator', value: '3-Hour CBT', icon: <Clock className="w-5 h-5 text-amber-400" /> },
    { label: 'Study Roadmaps', value: '6M / 3M / 7D', icon: <TrendingUp className="w-5 h-5 text-pink-400" /> },
  ];

  const faqs = [
    {
      q: 'How are GATE 2025 CS-1 and CS-2 questions processed on GATEHub?',
      a: 'We systematically extract official questions from IIT Roorkee master question papers for both Forenoon (CS-1) and Afternoon (CS-2) sessions. Every question contains verified answer keys, independent numerical calculations, code step-by-step traces, concept tested descriptions, and exam shortcut tricks.'
    },
    {
      q: 'What is the marking scheme for GATE Computer Science (CSE)?',
      a: 'GATE CSE contains 65 questions totaling 100 marks. General Aptitude carries 15 marks (10 questions), while Core CS & Engineering Math carries 85 marks (55 questions). 1-mark MCQs have -0.33 negative marking, 2-mark MCQs have -0.67 negative marking. MSQs and NAT questions have ZERO negative marking.'
    },
    {
      q: 'Can I use GATEHub offline or persist my study progress?',
      a: 'Yes! All topic progress, completed PYQs, daily planner tasks, and mock test scores automatically save locally in your browser storage. You can pick up right where you left off.'
    },
    {
      q: 'Does GATEHub support other engineering branches like DA or ECE?',
      a: 'Yes! While CSE is fully architected with complete syllabus and PYQs, GATEHub is designed to seamlessly support Data Science & AI (DA), ECE, EE, ME, and Civil engineering branches.'
    }
  ];

  const currentQotd = ALL_GATE_PYQS[qotdIndex % ALL_GATE_PYQS.length];

  const nextQotd = () => {
    setQotdIndex(prev => prev + 1);
  };

  return (
    <div className="space-y-12 py-6">
      {/* Active Exam Alert if session saved */}
      {activeExam && (
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-amber-950/80 border border-amber-500 rounded-3xl p-5 text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center space-x-3">
              <RotateCcw className="w-6 h-6 text-amber-400 shrink-0 animate-spin" />
              <div>
                <h4 className="font-bold text-white text-sm">Active Examination Session Detected</h4>
                <p className="text-xs text-amber-300">Resume your saved exam session for "{activeExam.paperTitle}".</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/mock-tests')}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs shadow-md cursor-pointer shrink-0"
            >
              Resume Active Examination →
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto px-4 space-y-6 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold shadow-lg shadow-indigo-500/10 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>All-in-One GATE Preparation Ecosystem</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 leading-tight">
          GATE Preparation, <br />
          <span className="gradient-text">Organized & Autonomous.</span>
        </h1>

        <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Everything you need to understand the syllabus, learn concepts, practice PYQs, take mock tests, and track your preparation — in one place.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('/personalized-plan')}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black text-sm shadow-xl shadow-blue-500/30 flex items-center gap-2 transform hover:-translate-y-0.5 transition-all ring-2 ring-blue-400/50 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Continue Preparation</span>
          </button>

          <button
            onClick={() => onNavigate('/mock-tests')}
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-xl shadow-emerald-500/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Clock className="w-4 h-4" />
            <span>Start Real Exam Mode</span>
          </button>

          <button
            onClick={() => onNavigate('/syllabus')}
            className="px-6 py-3.5 rounded-2xl bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-200 border border-indigo-500/40 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Explore Syllabus</span>
          </button>
        </div>
      </section>

      {/* Today's Study Plan Quick Card */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="rounded-3xl glass-card p-6 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Today's Study Experience</span>
            <h3 className="text-lg font-black text-white">Daily Target: Operating Systems & Process Synchronization</h3>
            <p className="text-xs text-slate-400">Concept Video (NPTEL) • GATE PYQs • Spaced Revision Queue</p>
          </div>
          <button
            onClick={() => onNavigate('/personalized-plan')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>Open Today's Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Quick Navigation Quick Links Bar */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigate('/pyq-analytics')}
            className="p-4 rounded-2xl glass-card border border-slate-800 hover:border-indigo-500/40 text-left space-y-1 transition-all group cursor-pointer"
          >
            <BarChart3 className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-xs text-slate-200">PYQ Analytics</div>
            <div className="text-[10px] text-slate-400">Topic recurrence & weightage</div>
          </button>

          <button
            onClick={() => onNavigate('/timeline')}
            className="p-4 rounded-2xl glass-card border border-slate-800 hover:border-indigo-500/40 text-left space-y-1 transition-all group cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-xs text-slate-200">Paper Timeline</div>
            <div className="text-[10px] text-slate-400">2007 - 2025 GATE archive</div>
          </button>

          <button
            onClick={() => onNavigate('/compare-years')}
            className="p-4 rounded-2xl glass-card border border-slate-800 hover:border-indigo-500/40 text-left space-y-1 transition-all group cursor-pointer"
          >
            <Scale className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-xs text-slate-200">Compare Years</div>
            <div className="text-[10px] text-slate-400">Side-by-side year breakdown</div>
          </button>

          <button
            onClick={() => onNavigate('/revision-queue')}
            className="p-4 rounded-2xl glass-card border border-slate-800 hover:border-indigo-500/40 text-left space-y-1 transition-all group cursor-pointer"
          >
            <Zap className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-xs text-slate-200">Revision Queue</div>
            <div className="text-[10px] text-slate-400">Saved & flagged questions</div>
          </button>
        </div>
      </section>

      {/* Useful Statistics Bar */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {stats.map((st, idx) => (
            <div key={idx} className="glass-card p-4 rounded-2xl border border-slate-800 text-center space-y-1 hover:border-slate-700 transition-all">
              <div className="flex justify-center mb-1">{st.icon}</div>
              <div className="text-xl font-black text-slate-100">{st.value}</div>
              <div className="text-[11px] font-medium text-slate-400">{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Today's GATE Challenge / Question of the Day */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/30 mb-2">
                <Zap className="w-3.5 h-3.5 fill-amber-400" /> Today's GATE Challenge (Question of the Day)
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-100">Can You Solve This Official GATE Question?</h3>
            </div>

            <button
              onClick={nextQotd}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 text-xs font-bold transition-all shrink-0 cursor-pointer"
            >
              Try Another Challenge →
            </button>
          </div>

          <QuestionCard question={currentQotd} key={currentQotd.id} />
        </div>
      </section>

      {/* Section: Prepare by Subject */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> GATE Computer Science (CSE)
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">Prepare by Subject</h2>
          </div>
          <button
            onClick={() => onNavigate('/subjects')}
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
          >
            <span>View All 11 Subjects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GATE_CSE_SUBJECTS.slice(0, 6).map((subj) => (
            <SubjectCard
              key={subj.id}
              subject={subj}
              completedTopicsCount={0}
              onSelect={(id) => onNavigate(`/subject/${id}`)}
            />
          ))}
        </div>
      </section>

      {/* Section: FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-100">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-400">Everything you need to know about GATE exam structure and GATEHub.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl glass-card border border-slate-800 overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between text-sm font-semibold text-slate-200 hover:text-indigo-300 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                {activeFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {activeFaq === idx && (
                <div className="p-4 sm:p-5 pt-0 text-xs text-slate-400 border-t border-slate-800/60 leading-relaxed bg-slate-900/40">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
