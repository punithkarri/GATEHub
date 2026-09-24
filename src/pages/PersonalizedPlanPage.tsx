import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Target, BookOpen, CheckCircle, Circle, AlertTriangle, 
  Sparkles, RefreshCw, Printer, ExternalLink, Play, PlayCircle, BarChart2, 
  Zap, Award, CheckSquare, Layers, ChevronRight, ChevronLeft, ArrowRight, Video, Flame
} from 'lucide-react';
import { GATE_CSE_SUBJECTS } from '../data/syllabus';
import { 
  OnboardingSettings, DailyScheduleItem, GeneratedPlan, 
  generatePersonalizedPlan, WeeklyAvailability 
} from '../utils/plannerAlgorithm';
import { VERIFIED_VIDEO_RESOURCES } from '../data/videoResources';

const DEFAULT_WEEKLY_HOURS: WeeklyAvailability = {
  monday: 4,
  tuesday: 4,
  wednesday: 4,
  thursday: 4,
  friday: 4,
  saturday: 6,
  sunday: 6,
};

const DEFAULT_SUBJECT_STATUS: Record<string, 'Not Started' | 'Weak' | 'Average' | 'Strong' | 'Completed'> = {
  'c-ds': 'Average',
  'algo': 'Weak',
  'toc': 'Not Started',
  'compiler': 'Not Started',
  'os': 'Average',
  'dbms': 'Average',
  'cn': 'Weak',
  'coa': 'Weak',
  'digital': 'Average',
  'discrete': 'Weak',
  'em': 'Average',
  'ga': 'Strong',
};

const STORAGE_KEY = 'gatehub_personalized_plan';

export const PersonalizedPlanPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'subjects' | 'weak' | 'revision'>('today');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);

  // Form State for Onboarding Wizard
  const [settings, setSettings] = useState<OnboardingSettings>({
    branch: 'CSE',
    examDate: '2026-02-07',
    dailyHours: 4,
    weeklyHours: { ...DEFAULT_WEEKLY_HOURS },
    studySessions: ['Morning', 'Evening'],
    currentLevel: 'Basic concepts completed',
    subjectStatus: { ...DEFAULT_SUBJECT_STATUS },
    learningStyles: ['Video', 'PYQs', 'Notes'],
    freeOnly: 'Yes',
    targetIntensity: 'Balanced',
  });

  // Today view completion tracker state
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  // Load stored plan on mount
  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem(STORAGE_KEY);
      if (savedPlan) {
        const parsed = JSON.parse(savedPlan) as GeneratedPlan;
        setPlan(parsed);
      }
    } catch (e) {
      console.error('Failed to load saved planner state', e);
    }
  }, []);

  const handleGeneratePlan = () => {
    const generated = generatePersonalizedPlan(settings);
    setPlan(generated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(generated));
    } catch (e) {
      console.error('Failed to save plan to localStorage', e);
    }
    setActiveTab('today');
  };

  const handleResetPlan = () => {
    if (window.confirm('Are you sure you want to reset your GATE preparation plan and start fresh?')) {
      setPlan(null);
      localStorage.removeItem(STORAGE_KEY);
      setCurrentStep(1);
    }
  };

  const toggleTaskCompletion = (itemDate: string) => {
    setCompletedItems(prev => {
      const updated = { ...prev, [itemDate]: !prev[itemDate] };
      return updated;
    });
  };

  // Dynamic countdown calculation
  const getDaysUntilExam = (dateStr: string) => {
    const today = new Date();
    const target = new Date(dateStr);
    const diffTime = target.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const daysLeft = getDaysUntilExam(settings.examDate);

  // Helper for preset weekly schedules
  const applyPresetSchedule = (type: 'student' | 'pro' | 'beast') => {
    if (type === 'student') {
      setSettings(prev => ({
        ...prev,
        weeklyHours: { monday: 6, tuesday: 6, wednesday: 6, thursday: 6, friday: 6, saturday: 8, sunday: 8 }
      }));
    } else if (type === 'pro') {
      setSettings(prev => ({
        ...prev,
        weeklyHours: { monday: 3, tuesday: 3, wednesday: 3, thursday: 3, friday: 3, saturday: 7, sunday: 7 }
      }));
    } else if (type === 'beast') {
      setSettings(prev => ({
        ...prev,
        weeklyHours: { monday: 8, tuesday: 8, wednesday: 8, thursday: 8, friday: 8, saturday: 10, sunday: 10 }
      }));
    }
  };

  // Render ONBOARDING WIZARD if no plan exists
  if (!plan) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-3 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered GATE 2026 Strategy Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Build Your Personalized GATE Preparation Plan
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Get a tailored day-by-day study roadmap based on your exam date, daily hours, weak subjects, and preferred learning resources.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <div className="flex justify-between items-center max-w-3xl mx-auto">
            {[
              { num: 1, label: 'Exam & Target' },
              { num: 2, label: 'Availability' },
              { num: 3, label: 'Level & Pace' },
              { num: 4, label: 'Subjects' },
              { num: 5, label: 'Resources' },
              { num: 6, label: 'Review' }
            ].map((step) => (
              <div key={step.num} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    currentStep === step.num 
                      ? 'bg-blue-600 text-white shadow-md ring-4 ring-blue-100 dark:ring-blue-900' 
                      : currentStep > step.num 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {currentStep > step.num ? <CheckCircle className="w-5 h-5" /> : step.num}
                </div>
                <span className={`text-xs mt-2 font-medium hidden sm:block ${
                  currentStep === step.num ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
          {/* STEP 1: Branch & Exam Target */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Step 1: Exam Branch & Target Date
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    GATE Branch
                  </label>
                  <select
                    value={settings.branch}
                    onChange={(e) => setSettings({ ...settings, branch: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="CSE">Computer Science & IT (CS)</option>
                    <option value="DA">Data Science & AI (DA)</option>
                    <option value="ECE">Electronics & Communication (EC)</option>
                    <option value="EE">Electrical Engineering (EE)</option>
                    <option value="ME">Mechanical Engineering (ME)</option>
                    <option value="CE">Civil Engineering (CE)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Target Exam Date
                  </label>
                  <input
                    type="date"
                    value={settings.examDate}
                    onChange={(e) => setSettings({ ...settings, examDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Countdown Preview Card */}
              <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl p-5 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-600 text-white rounded-xl">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Days Remaining for GATE</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Target Date: {settings.examDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-blue-600 dark:text-blue-400">{daysLeft}</span>
                  <span className="text-xs block text-slate-500 font-medium">Days Left</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Time Availability */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Step 2: Study Availability (Hours per Day)
                </h2>
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => applyPresetSchedule('student')} 
                    className="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md font-medium text-slate-700 dark:text-slate-300"
                  >
                    Full-Time Student (6-8h)
                  </button>
                  <button 
                    type="button" 
                    onClick={() => applyPresetSchedule('pro')} 
                    className="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md font-medium text-slate-700 dark:text-slate-300"
                  >
                    Working Pro (3-7h)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as (keyof WeeklyAvailability)[]).map((day) => (
                  <div key={day} className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                    <span className="block text-xs font-bold text-slate-600 dark:text-slate-400 capitalize mb-1">
                      {day.slice(0, 3)}
                    </span>
                    <input
                      type="number"
                      min="0"
                      max="16"
                      value={settings.weeklyHours[day]}
                      onChange={(e) => setSettings({
                        ...settings,
                        weeklyHours: { ...settings.weeklyHours, [day]: Math.max(0, parseInt(e.target.value) || 0) }
                      })}
                      className="w-full text-center py-1.5 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">hrs</span>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Preferred Study Windows
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Morning (6 AM - 10 AM)', 'Afternoon (12 PM - 4 PM)', 'Evening (5 PM - 9 PM)', 'Night (9 PM - 1 AM)'].map((slot) => {
                    const slotName = slot.split(' ')[0];
                    const selected = settings.studySessions.includes(slotName);
                    return (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => {
                          const updated = selected 
                            ? settings.studySessions.filter(s => s !== slotName)
                            : [...settings.studySessions, slotName];
                          setSettings({ ...settings, studySessions: updated });
                        }}
                        className={`p-3 text-xs rounded-xl border font-medium text-left transition-all ${
                          selected
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Level & Intensity */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-blue-600" />
                Step 3: Current Level & Preferred Pace
              </h2>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  What is your current GATE preparation status?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Starting from zero',
                    'Beginner (1-2 subjects done)',
                    'Basic concepts completed',
                    'Syllabus partially completed (50%+)',
                    'Mostly revision & PYQs',
                    'Mock-test phase'
                  ].map((level) => (
                    <button
                      type="button"
                      key={level}
                      onClick={() => setSettings({ ...settings, currentLevel: level as any })}
                      className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                        settings.currentLevel === level
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Target Study Intensity
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { title: 'Balanced', desc: 'Steady coverage with periodic revision days.', icon: BookOpen },
                    { title: 'Intensive', desc: 'High topic velocity with heavy PYQ drill.', icon: Flame },
                    { title: 'Sprint', desc: 'Fast-track emergency schedule focusing on high-weightage topics.', icon: Zap }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        type="button"
                        key={item.title}
                        onClick={() => setSettings({ ...settings, targetIntensity: item.title as any })}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          settings.targetIntensity === item.title
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500'
                            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold mb-1">
                          <Icon className="w-4 h-4 text-blue-600" />
                          <span>{item.title} Mode</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Subject Assessment */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-blue-600" />
                  Step 4: Subject Self-Assessment
                </h2>
                <span className="text-xs text-slate-500">Rate your current confidence per subject</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
                {GATE_CSE_SUBJECTS.map((subj) => {
                  const status = settings.subjectStatus[subj.id] || 'Not Started';
                  return (
                    <div key={subj.id} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{subj.name}</h4>
                        <span className="text-[10px] text-blue-600 font-semibold">{subj.marksWeightage}</span>
                      </div>
                      <select
                        value={status}
                        onChange={(e) => setSettings({
                          ...settings,
                          subjectStatus: { ...settings.subjectStatus, [subj.id]: e.target.value as any }
                        })}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium ${
                          status === 'Weak' ? 'border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' :
                          status === 'Strong' ? 'border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
                          status === 'Completed' ? 'border-blue-400 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                          'border-slate-300 bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="Weak">Weak (Needs Focus)</option>
                        <option value="Average">Average</option>
                        <option value="Strong">Strong</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Resource Preferences */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-blue-600" />
                Step 5: Resource Preferences
              </h2>

              <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Free Verified Resources Only</h3>
                    <p className="text-xs text-slate-500">Include free NPTEL lectures, Gate Smashers, and YouTube playlists.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.freeOnly === 'Yes'}
                    onChange={(e) => setSettings({ ...settings, freeOnly: e.target.checked ? 'Yes' : 'Both' })}
                    className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Preferred Learning Formats
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Video Lectures', 'Official PYQs', 'Short Notes & Formulas', 'Standard Books'].map((style) => {
                    const isSelected = settings.learningStyles.includes(style);
                    return (
                      <button
                        type="button"
                        key={style}
                        onClick={() => {
                          const updated = isSelected 
                            ? settings.learningStyles.filter(s => s !== style)
                            : [...settings.learningStyles, style];
                          setSettings({ ...settings, learningStyles: updated });
                        }}
                        className={`p-3 text-xs rounded-xl border font-medium text-center transition-all ${
                          isSelected 
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold' 
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {style}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Review & Generate */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Step 6: Plan Review & Strategy Summary
              </h2>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center border-b border-slate-700 pb-4">
                  <div>
                    <span className="text-xs text-slate-400 block">GATE Branch</span>
                    <span className="font-bold text-lg text-blue-400">{settings.branch}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Days Left</span>
                    <span className="font-bold text-lg text-amber-400">{daysLeft} Days</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Pace</span>
                    <span className="font-bold text-lg text-emerald-400">{settings.targetIntensity}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Free Resources</span>
                    <span className="font-bold text-lg text-purple-400">{settings.freeOnly}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 space-y-2">
                  <p className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dynamic schedule algorithm will balance <strong>35% Concept</strong>, <strong>35% PYQ Solving</strong>, <strong>20% Practice</strong>, and <strong>10% Revision</strong>.</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Every daily topic includes direct links to verified NPTEL/Gate Smashers video lectures and official GATEHub PYQs.</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGeneratePlan}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 text-lg"
              >
                <Sparkles className="w-6 h-6" />
                <span>Generate My GATE 2026 Strategy Plan</span>
              </button>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            ) : <div />}

            {currentStep < 6 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 text-sm shadow-md"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render GENERATED PLAN DASHBOARD when plan exists
  const todayItem = plan.items[0] || null;
  const isTodayCompleted = todayItem ? completedItems[todayItem.date] || false : false;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Top Banner Stats */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-indigo-900/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{plan.currentPhase}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              GATE 2026 Master Preparation Dashboard
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Branch: <strong className="text-white">{plan.settings.branch}</strong> | Planned Study: <strong className="text-emerald-400">{plan.totalPlannedHours} Hours</strong> across {plan.daysRemaining} days
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Plan</span>
            </button>

            <button
              onClick={handleResetPlan}
              className="px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-300 border border-red-800/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Recalculate Plan</span>
            </button>
          </div>
        </div>

        {/* Dynamic Metric Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
            <span className="text-xs text-slate-400 block">Countdown</span>
            <span className="text-2xl font-black text-amber-400">{plan.daysRemaining} Days</span>
          </div>

          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
            <span className="text-xs text-slate-400 block">Weeks Left</span>
            <span className="text-2xl font-black text-blue-400">{plan.weeksRemaining} Weeks</span>
          </div>

          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
            <span className="text-xs text-slate-400 block">Total Hours</span>
            <span className="text-2xl font-black text-emerald-400">{plan.totalPlannedHours} hrs</span>
          </div>

          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
            <span className="text-xs text-slate-400 block">Weak Subjects</span>
            <span className="text-2xl font-black text-rose-400">{plan.weakTopicsDetected.length} Areas</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
        {[
          { id: 'today', label: "Today's Action Plan", icon: Calendar },
          { id: 'week', label: '7-Day Timeline', icon: Clock },
          { id: 'subjects', label: 'Subject Progress', icon: Layers },
          { id: 'weak', label: 'Weak Topic Repair', icon: AlertTriangle },
          { id: 'revision', label: 'Spaced Revision', icon: RefreshCw }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: TODAY'S ACTION PLAN */}
      {activeTab === 'today' && todayItem && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Daily Target • {todayItem.dayOfWeek}, {todayItem.date}</span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1 flex items-center gap-2">
                  <span>{todayItem.subjectName}</span>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-md font-semibold">
                    {todayItem.availableHours} Hours Today
                  </span>
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Focus Topic: <strong>{todayItem.topicName}</strong> ({todayItem.subtopicName})
                </p>
              </div>

              <button
                onClick={() => toggleTaskCompletion(todayItem.date)}
                className={`mt-4 sm:mt-0 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                  isTodayCompleted
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-slate-900 hover:bg-slate-800 text-white shadow-md'
                }`}
              >
                <CheckCircle className="w-5 h-5" />
                <span>{isTodayCompleted ? 'Day Marked Completed!' : 'Mark Today as Completed'}</span>
              </button>
            </div>

            {/* Daily Time Split Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/40">
                <span className="text-xs text-blue-600 font-bold block">1. Concept Mastery</span>
                <span className="text-xl font-black text-slate-900 dark:text-white">{todayItem.conceptMins} Mins</span>
                <p className="text-xs text-slate-500 mt-1">Study standard textbook / watch video notes.</p>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900/40">
                <span className="text-xs text-emerald-600 font-bold block">2. Official PYQs</span>
                <span className="text-xl font-black text-slate-900 dark:text-white">{todayItem.pyqMins} Mins</span>
                <p className="text-xs text-slate-500 mt-1">Solve GATE 2007–2025 past questions.</p>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/40">
                <span className="text-xs text-amber-600 font-bold block">3. Practice Questions</span>
                <span className="text-xl font-black text-slate-900 dark:text-white">{todayItem.practiceMins} Mins</span>
                <p className="text-xs text-slate-500 mt-1">Timed numerical problem practice.</p>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-900/40">
                <span className="text-xs text-purple-600 font-bold block">4. Formula & Notes Revision</span>
                <span className="text-xl font-black text-slate-900 dark:text-white">{todayItem.revisionMins} Mins</span>
                <p className="text-xs text-slate-500 mt-1">Active recall & formula sheet check.</p>
              </div>
            </div>

            {/* Verified Video & Resource Links */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-red-600 text-white rounded-xl">
                  <PlayCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Recommended Verified Video Lecture</h4>
                  <p className="text-xs text-slate-500">
                    {todayItem.videoResource ? `${todayItem.videoResource.channel} • ${todayItem.videoResource.title}` : `NPTEL & Gate Smashers: ${todayItem.topicName}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {todayItem.videoResource && (
                  <a
                    href={todayItem.videoResource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Watch Lecture</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <a
                  href={`#${todayItem.pyqRoute}`}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <span>Solve PYQs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WEEKLY TIMELINE */}
      {activeTab === 'week' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            7-Day Preparation Schedule
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plan.items.slice(0, 7).map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700/60 pb-3">
                  <div>
                    <span className="text-xs font-extrabold text-blue-600 uppercase">{item.dayOfWeek} • Day {item.dayNumber}</span>
                    <h4 className="font-black text-slate-900 dark:text-white text-base">{item.subjectName}</h4>
                  </div>
                  <span className="text-xs bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full text-slate-700 dark:text-slate-300 font-bold">
                    {item.availableHours} Hours
                  </span>
                </div>

                <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                  <p><strong>Topic:</strong> {item.topicName}</p>
                  <p className="text-slate-500"><strong>Subtopic:</strong> {item.subtopicName}</p>
                </div>

                <div className="pt-2 flex justify-between items-center border-t border-slate-100 dark:border-slate-700/60">
                  <span className="text-[11px] font-semibold text-slate-500">{item.phaseName}</span>
                  <a href={`#${item.pyqRoute}`} className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    <span>Solve PYQs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SUBJECT PROGRESS */}
      {activeTab === 'subjects' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Subject Mastery Status</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {GATE_CSE_SUBJECTS.map((subj) => {
              const status = plan.settings.subjectStatus[subj.id] || 'Not Started';
              return (
                <div key={subj.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{subj.name}</h4>
                      <span className="text-xs text-blue-600 font-semibold">{subj.marksWeightage}</span>
                    </div>
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold ${
                      status === 'Weak' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' :
                      status === 'Strong' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' :
                      status === 'Completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' :
                      'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                    }`}>
                      {status}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-500">
                    <p>Topics: {subj.topics.length} Key Modules</p>
                    <p>Recommended: {subj.recommendedHours} Study Hours</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                    <a
                      href={`#/pyqs?subject=${subj.id}`}
                      className="w-full py-1.5 text-center text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 rounded-lg block hover:bg-blue-100"
                    >
                      Practice {subj.name} PYQs
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: WEAK TOPICS */}
      {activeTab === 'weak' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Weak Subject Repair Center
          </h3>

          {plan.weakTopicsDetected.length === 0 ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-8 rounded-2xl text-center border border-emerald-200">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
              <h4 className="font-bold text-slate-900 dark:text-white">No Weak Subjects Flagged!</h4>
              <p className="text-xs text-slate-600 mt-1">Keep executing your daily PYQs and mock tests to stay on top.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plan.weakTopicsDetected.map((item, idx) => {
                const subj = GATE_CSE_SUBJECTS.find(s => s.id === item.subjectId);
                const videos = VERIFIED_VIDEO_RESOURCES.filter(v => v.subjectId === item.subjectId);
                return (
                  <div key={idx} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-amber-200 dark:border-amber-900/50 shadow-sm space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">{subj?.name || item.subjectId}</h4>
                      <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 font-bold px-2.5 py-0.5 rounded-full">
                        Needs Focus
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      High priority for GATE CSE. Dedicated concept review and PYQ drills recommended before phase 3.
                    </p>

                    {videos.length > 0 && (
                      <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">Verified NPTEL Lecture Link:</span>
                        <a
                          href={videos[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1"
                        >
                          <Play className="w-3 h-3 text-red-600 fill-current" />
                          <span>{videos[0].title} ({videos[0].channel})</span>
                        </a>
                      </div>
                    )}

                    <a
                      href={`#/pyqs?subject=${item.subjectId}`}
                      className="w-full py-2 text-center text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl block shadow-sm"
                    >
                      Solve Weak Subject PYQs
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: SPACED REVISION */}
      {activeTab === 'revision' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-purple-600" />
            Spaced Repetition Schedule (1-3-7-21 Day Algorithm)
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            To prevent memory decay, GATEHub automatically queues topics for quick revision on Day 1, Day 3, Day 7, and Day 21 after completion.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-900/40">
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 block">Today's Quick Formula Check</span>
              <span className="text-sm font-black text-slate-900 dark:text-white mt-1 block">Graph Theory & Asymptotic Notations</span>
              <span className="text-[10px] text-slate-500 block mt-1">15 Mins Active Recall</span>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-900/40">
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 block">3-Day Revision Queue</span>
              <span className="text-sm font-black text-slate-900 dark:text-white mt-1 block">Process Synchronization & Semaphores</span>
              <span className="text-[10px] text-slate-500 block mt-1">20 Mins PYQ Recap</span>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-900/40">
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 block">7-Day Revision Queue</span>
              <span className="text-sm font-black text-slate-900 dark:text-white mt-1 block">SQL Queries & Normalization</span>
              <span className="text-[10px] text-slate-500 block mt-1">30 Mins Concept Test</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
