import React from 'react';
import { GATE_EXAM_INFO, GATE_OFFICIAL_SOURCE } from '../data/gateInfo';
import { ShieldCheck, ExternalLink, Award, CheckCircle2, Clock, HelpCircle, FileText, AlertCircle } from 'lucide-react';

export const GateInfoPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Header Banner */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
          <ShieldCheck className="w-4 h-4" /> Official GATE Examination Guidelines
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
          GATE Exam Information & Architecture
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Comprehensive guide to eligibility, exam pattern, marking scheme, score validity, and post-GATE career opportunities. Sourced directly from official IIT notifications.
        </p>

        {/* Official Link Badge */}
        <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <span className="font-semibold text-emerald-400">Official Source:</span>
          <a
            href={GATE_OFFICIAL_SOURCE.url}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-400 underline hover:text-indigo-300 flex items-center gap-1 font-mono"
          >
            {GATE_OFFICIAL_SOURCE.name} <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 1. What is GATE? */}
      <section className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
            01
          </div>
          <h2 className="text-xl font-bold text-slate-100">{GATE_EXAM_INFO.overview.title}</h2>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          {GATE_EXAM_INFO.overview.description}
        </p>
        <div className="pt-2 space-y-2">
          <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Primary Purposes:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {GATE_EXAM_INFO.overview.purpose.map((p, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Eligibility Criteria */}
      <section className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
            02
          </div>
          <h2 className="text-xl font-bold text-slate-100">{GATE_EXAM_INFO.eligibility.title}</h2>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          {GATE_EXAM_INFO.eligibility.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {GATE_EXAM_INFO.eligibility.keyPoints.map((point, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-purple-400 font-mono">Rule {idx + 1}</span>
              <p>{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Exam Pattern & Marking Scheme Table */}
      <section className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 font-bold">
            03
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">{GATE_EXAM_INFO.examPattern.title}</h2>
            <p className="text-xs text-slate-400">Duration: {GATE_EXAM_INFO.examPattern.duration} • Mode: {GATE_EXAM_INFO.examPattern.mode}</p>
          </div>
        </div>

        {/* Section Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GATE_EXAM_INFO.examPattern.sections.map((sec, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-bold text-sm text-indigo-300">{sec.name}</div>
              <div className="text-xs text-slate-400">{sec.questions}</div>
              <div className="text-xs font-semibold text-emerald-400">{sec.marks}</div>
              <div className="text-[11px] text-slate-500 border-t border-slate-800 pt-2 mt-2">{sec.topics}</div>
            </div>
          ))}
        </div>

        {/* Marking Scheme Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-200">Official Marking Scheme & Negative Marking Rules</h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3">Question Type</th>
                  <th className="p-3">Correct Answer</th>
                  <th className="p-3">Incorrect Answer (Negative)</th>
                  <th className="p-3">Unattempted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {GATE_EXAM_INFO.markingSchemeTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-slate-200">{row.type}</td>
                    <td className="p-3 text-emerald-400 font-bold">{row.correct}</td>
                    <td className="p-3 text-rose-400 font-semibold">{row.incorrect}</td>
                    <td className="p-3 text-slate-400">{row.unattempted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Question Types Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {GATE_EXAM_INFO.examPattern.questionTypes.map((qType, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="font-bold text-xs text-indigo-300">{qType.type}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{qType.description}</p>
              <div className="text-[11px] text-amber-400 font-semibold pt-1 border-t border-slate-800">{qType.marking}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Opportunities after GATE */}
      <section className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
            04
          </div>
          <h2 className="text-xl font-bold text-slate-100">Opportunities After GATE</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GATE_EXAM_INFO.opportunities.map((opp, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <h4 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                {opp.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">{opp.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
