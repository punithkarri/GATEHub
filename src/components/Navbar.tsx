import React, { useState } from 'react';
import {
  GraduationCap,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  Flame,
  Award,
  Calculator
} from 'lucide-react';
import type { Branch } from '../types';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  selectedBranch: Branch;
  onSelectBranch: (branch: Branch) => void;
  onToggleCalculator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenSearch,
  isDarkMode,
  onToggleTheme,
  selectedBranch,
  onSelectBranch,
  onToggleCalculator,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Home', route: '/' },
    { label: 'Plan My Preparation', route: '/personalized-plan' },
    { label: 'Syllabus', route: '/syllabus' },
    { label: 'Subjects', route: '/subjects' },
    { label: 'PYQs', route: '/pyqs' },
    { label: 'Practice', route: '/practice' },
    { label: 'Mock Tests', route: '/mock-tests' },
    { label: 'Where to Study?', route: '/where-to-study' },
    { label: 'Resources', route: '/resources' },
    { label: 'Roadmap', route: '/roadmap' },
    { label: 'Revision', route: '/revision' },
    { label: 'GATE Info', route: '/gate-info' },
  ];

  const branches: { code: Branch; name: string }[] = [
    { code: 'CSE', name: 'Computer Science (CSE)' },
    { code: 'DA', name: 'Data Science & AI (DA)' },
    { code: 'ECE', name: 'Electronics (ECE)' },
    { code: 'EE', name: 'Electrical (EE)' },
    { code: 'ME', name: 'Mechanical (ME)' },
    { code: 'CE', name: 'Civil (CE)' },
  ];

  return (
    <header className="sticky top-0 z-40 glass-nav transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Branch Dropdown */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2.5 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform" />
                </div>
              </div>
              <div>
                <div className="font-extrabold text-xl tracking-tight flex items-center gap-1">
                  <span className="text-white dark:text-white light:text-slate-900">GATE</span>
                  <span className="gradient-text">Hub</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-md uppercase tracking-wider ml-1">
                    2025/26
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500 -mt-1 font-medium">
                  Organized Preparation Platform
                </div>
              </div>
            </button>

            {/* Branch Selector Pill */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800/80 hover:bg-slate-800 text-indigo-300 border border-indigo-500/30 transition-all"
              >
                <Award className="w-3.5 h-3.5 text-indigo-400" />
                <span>{selectedBranch}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {branchDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-1 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    Select GATE Branch
                  </div>
                  {branches.map((b) => (
                    <button
                      key={b.code}
                      onClick={() => {
                        onSelectBranch(b.code);
                        setBranchDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${
                        selectedBranch === b.code
                          ? 'text-indigo-400 font-semibold bg-indigo-500/10'
                          : 'text-slate-300'
                      }`}
                    >
                      <span>{b.name}</span>
                      {selectedBranch === b.code && (
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => onNavigate(link.route)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons (Search, Virtual Calc, Theme, Dashboard, Mobile Menu) */}
          <div className="flex items-center gap-2">
            {/* Virtual Calculator Button */}
            <button
              onClick={onToggleCalculator}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30 transition-all"
              title="Open GATE Virtual Scientific Calculator"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calculator</span>
            </button>

            {/* Search Trigger Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs border border-slate-700/60 transition-all hover:border-slate-600"
              title="Global Search (Cmd + K)"
            >
              <Search className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-900 text-slate-400 rounded border border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Student Dashboard Button */}
            <button
              onClick={() => onNavigate('/dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                currentRoute === '/dashboard'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                  : 'bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Dashboard</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-all"
              title="Toggle Light/Dark Theme"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-400">GATE Branch:</span>
            <div className="flex gap-1 overflow-x-auto py-1">
              {branches.map((b) => (
                <button
                  key={b.code}
                  onClick={() => onSelectBranch(b.code)}
                  className={`px-2 py-0.5 text-xs rounded font-medium ${
                    selectedBranch === b.code
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {b.code}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => {
                  onNavigate(link.route);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  currentRoute === link.route
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-300 bg-slate-800/50 hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
