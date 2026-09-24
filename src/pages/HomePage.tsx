import React from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Clock,
  Compass,
  CheckCircle2,
  TrendingUp,
  FileText,
  Target,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';
import { GATE_CSE_SUBJECTS } from '../data/syllabus';
import { SubjectCard } from '../components/SubjectCard';
import { GATE_PYQS } from '../data/pyqs';
import { QuestionCard } from '../components/QuestionCard';

interface HomePageProps {
  onNavigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [activeFaq, setActiveFaq] = React.useState<number | null>(null);

  const stats = [
    { label: 'Core CSE Subjects', value: '11', icon: <BookOpen className="w-5 h-5 text-indigo-400" /> },
    { label: 'Syllabus Topics', value: '50+', icon: <FileText className="w-5 h-5 text-purple-400" /> },
    { label: 'GATE 2025 & PYQs', value: 'Verified', icon: <HelpCircle className="w-5 h-5 text-emerald-400" /> },
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

  const gate2025SampleQuestion = GATE_PYQS.find(q => q.id === 'gate2025-cs1-q29') || GATE_PYQS[0];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto px-4 space-y-6 pt-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold shadow-lg shadow-indigo-500/10 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Complete GATE 2025 & 2026 Preparation Ecosystem</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 leading-tight">
          GATE Preparation, <br />
          <span className="gradient-text">Organized & Autonomous.</span>
        </h1>

        <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Everything you need to understand the syllabus, learn concepts, practice PYQs, take mock tests, and track your preparation — in one place.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onNavigate('/syllabus')}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-600 hover:to-pink-700 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 flex items-center gap-2 transform hover:-translate-y-0.5 transition-all"
          >
            <span>Start Preparing Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('/pyqs')}
            className="px-6 py-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm flex items-center gap-2 transition-all hover:border-slate-500"
          >
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>Explore GATE 2025 PYQs</span>
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

      {/* Section 1: Prepare by Subject */}
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
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
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

      {/* Section 2: Official GATE 2025 Questions Spotlight */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30 mb-2">
                <Award className="w-3.5 h-3.5" /> Verified Official GATE 2025 Paper Solution
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-100">GATE 2025 CS-1 & CS-2 Question Bank</h3>
              <p className="text-xs text-slate-400 mt-1">Official master question papers, verified keys, and step-by-step mathematical reasoning.</p>
            </div>
            <button
              onClick={() => onNavigate('/pyqs')}
              className="px-4 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all shrink-0"
            >
              Open Full PYQ Explorer →
            </button>
          </div>

          {/* Interactive Question Card Sample */}
          <QuestionCard question={gate2025SampleQuestion} showExplanationInitially={true} />
        </div>
      </section>

      {/* Section 3: Where Should I Study & Roadmaps CTA */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Where Should I Study */}
        <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-4 flex flex-col justify-between hover:border-indigo-500/40 transition-all">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Where Should I Study?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Not sure whether to choose NPTEL, standard books, YouTube channels, or Gate Overflow? Use our interactive decision tool based on your current level, timeline, and budget.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/where-to-study')}
            className="w-full py-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 font-bold text-xs border border-indigo-500/40 transition-all flex items-center justify-center gap-2"
          >
            <span>Launch Resource Matcher</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Study Roadmaps */}
        <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-4 flex flex-col justify-between hover:border-purple-500/40 transition-all">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Structured Study Roadmaps</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Choose from 6-Month Master Plan, 3-Month Fast Track Sprint, or Last 7-Day Revision Checklist with interactive milestone tracking.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/roadmap')}
            className="w-full py-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 font-bold text-xs border border-purple-500/40 transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Roadmaps & Timelines</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Section 4: Practice & Mock Test CTAs */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-purple-900/60 p-8 border border-slate-800 space-y-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Exam Condition Simulator</div>
            <h3 className="text-2xl font-black text-slate-100">Ready to test your 3-hour exam stamina?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Experience the authentic computer-based test (CBT) palette, virtual calculator, 3-hour countdown timer, marked for review flags, and detailed accuracy analytics.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onNavigate('/practice')}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
            >
              Custom Subject Quiz
            </button>
            <button
              onClick={() => onNavigate('/mock-tests')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition-all"
            >
              Start 3-Hour Mock Test
            </button>
          </div>
        </div>
      </section>

      {/* Section 5: FAQ Accordion */}
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
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between text-sm font-semibold text-slate-200 hover:text-indigo-300 transition-colors"
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
