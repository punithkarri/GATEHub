import React from 'react';
import { GraduationCap, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { GATE_OFFICIAL_SOURCE } from '../data/gateInfo';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Brand & Disclaimer */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-white">GATE<span className="gradient-text">Hub</span></span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The premier all-in-one GATE preparation ecosystem. Built for students to master syllabus topics, solve verified PYQs, track progress, and excel in GATE CSE.
          </p>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Data Disclaimer</span>
            </div>
            <p>
              GATE is an official examination conducted by IITs & IISc. Factual exam rules are sourced directly from{' '}
              <a
                href={GATE_OFFICIAL_SOURCE.url}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 underline hover:text-indigo-300 inline-flex items-center gap-0.5"
              >
                {GATE_OFFICIAL_SOURCE.name} <ExternalLink className="w-2.5 h-2.5" />
              </a>.
            </p>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Preparation Platform</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => onNavigate('/syllabus')} className="hover:text-indigo-400 transition-colors">Interactive Syllabus</button></li>
            <li><button onClick={() => onNavigate('/subjects')} className="hover:text-indigo-400 transition-colors">Subject Deep Dives</button></li>
            <li><button onClick={() => onNavigate('/pyqs')} className="hover:text-indigo-400 transition-colors">GATE 2025 CS PYQs</button></li>
            <li><button onClick={() => onNavigate('/practice')} className="hover:text-indigo-400 transition-colors">Interactive Practice Mode</button></li>
            <li><button onClick={() => onNavigate('/mock-tests')} className="hover:text-indigo-400 transition-colors">3-Hour Mock Exam Simulator</button></li>
            <li><button onClick={() => onNavigate('/where-to-study')} className="hover:text-indigo-400 transition-colors">Where Should I Study?</button></li>
          </ul>
        </div>

        {/* Column 3: Tools & Resources */}
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Tools & Revision</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => onNavigate('/roadmap')} className="hover:text-indigo-400 transition-colors">6-Month & 3-Month Roadmaps</button></li>
            <li><button onClick={() => onNavigate('/planner')} className="hover:text-indigo-400 transition-colors">Study Planner & Task Tracker</button></li>
            <li><button onClick={() => onNavigate('/revision')} className="hover:text-indigo-400 transition-colors">Formula Sheets & Revision Cards</button></li>
            <li><button onClick={() => onNavigate('/resources')} className="hover:text-indigo-400 transition-colors">Curated Study Resources</button></li>
            <li><button onClick={() => onNavigate('/gate-info')} className="hover:text-indigo-400 transition-colors">Official GATE Info & Eligibility</button></li>
            <li><button onClick={() => onNavigate('/dashboard')} className="hover:text-indigo-400 transition-colors">Student Progress Dashboard</button></li>
          </ul>
        </div>

        {/* Column 4: Official Links & Branches */}
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Official Portals</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="https://gate2025.iitr.ac.in" target="_blank" rel="noreferrer" className="hover:text-indigo-400 flex items-center gap-1">
                IIT Roorkee GATE 2025 <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </li>
            <li>
              <a href="https://gate2026.iitg.ac.in" target="_blank" rel="noreferrer" className="hover:text-indigo-400 flex items-center gap-1">
                IIT Guwahati GATE 2026 <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </li>
            <li>
              <a href="https://gateoverflow.in" target="_blank" rel="noreferrer" className="hover:text-indigo-400 flex items-center gap-1">
                Gate Overflow Community <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </li>
            <li>
              <a href="https://nptel.ac.in" target="_blank" rel="noreferrer" className="hover:text-indigo-400 flex items-center gap-1">
                NPTEL Online Courses <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800/80 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>© 2025-2026 GATEHub. All rights reserved. Open education resource for GATE aspirants.</p>
        <div className="flex items-center gap-1 mt-2 sm:mt-0">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
          <span>for GATE Aspirants</span>
        </div>
      </div>
    </footer>
  );
};
