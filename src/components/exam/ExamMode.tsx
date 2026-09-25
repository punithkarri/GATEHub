import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, ShieldAlert, Award, Play, CheckCircle2, XCircle, HelpCircle, 
  ArrowLeft, ArrowRight, Maximize, Minimize, AlertTriangle, RefreshCw, 
  CheckSquare, Filter, FileText, ChevronRight, BarChart2, Sparkles, BookOpen,
  Calculator, RotateCcw, Eye, Target
} from 'lucide-react';
import { Question } from '../../types';
import { VirtualCalculator } from '../VirtualCalculator';

export interface ExamAttemptRecord {
  id: string;
  paperTitle: string;
  date: string;
  score: number;
  totalMarks: number;
  attempted: number;
  totalQuestions: number;
  correct: number;
  incorrect: number;
  accuracy: number;
  timeSpentSeconds: number;
  focusLossCount: number;
  focusLossSeconds: number;
  subjectBreakdown: Record<string, { attempted: number; correct: number; total: number; score: number; name: string }>;
  topicBreakdown: Record<string, { attempted: number; correct: number; total: number }>;
}

export interface ExamFocusEvent {
  type: 'focus_lost' | 'focus_returned' | 'fullscreen_exit' | 'fullscreen_enter';
  timestamp: string;
  detail?: string;
}

interface ExamModeProps {
  paperTitle: string;
  paperType: 'official' | 'generated';
  questions: Question[];
  isPartialPaper?: boolean;
  availableCount?: number;
  onExit: () => void;
  onNavigate?: (route: string) => void;
  onExamModeChange?: (isActive: boolean) => void;
}

export const ExamMode: React.FC<ExamModeProps> = ({
  paperTitle,
  paperType,
  questions,
  isPartialPaper = false,
  availableCount,
  onExit,
  onNavigate,
  onExamModeChange
}) => {
  const [testStarted, setTestStarted] = useState<boolean>(false);
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(180 * 60); // 180 Mins (3 Hours)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [showFocusWarning, setShowFocusWarning] = useState<boolean>(false);
  const [showFullscreenExitModal, setShowFullscreenExitModal] = useState<boolean>(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect' | 'unattempted' | 'marked'>('all');
  const [savedActiveExamDetected, setSavedActiveExamDetected] = useState<boolean>(false);

  // Monitoring Metrics & Event Log
  const [focusLossCount, setFocusLossCount] = useState<number>(0);
  const [focusLossSeconds, setFocusLossSeconds] = useState<number>(0);
  const [fullscreenExitCount, setFullscreenExitCount] = useState<number>(0);
  const [auditEvents, setAuditEvents] = useState<ExamFocusEvent[]>([]);
  const focusLossStartRef = useRef<number | null>(null);

  // Question State Repository (0..questions.length-1)
  const [questionStates, setQuestionStates] = useState<Record<number, {
    status: 'not-visited' | 'not-answered' | 'answered' | 'marked' | 'answered-marked';
    selectedOptions: string[];
    natValue: string;
  }>>({});

  // Notify parent container to toggle website navbar/footer visibility
  useEffect(() => {
    if (onExamModeChange) {
      onExamModeChange(testStarted && !testSubmitted);
    }
  }, [testStarted, testSubmitted, onExamModeChange]);

  // Check for saved active exam session on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gatehub_active_exam');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.paperTitle === paperTitle && parsed.questionsLength === questions.length) {
          setSavedActiveExamDetected(true);
        }
      }
    } catch (e) {
      console.error('Failed to parse active exam recovery state', e);
    }
  }, [paperTitle, questions.length]);

  const resumeActiveExam = () => {
    try {
      const saved = localStorage.getItem('gatehub_active_exam');
      if (saved) {
        const parsed = JSON.parse(saved);
        setQuestionStates(parsed.questionStates || {});
        setCurrentQIndex(parsed.currentQIndex || 0);
        setTimeLeftSeconds(parsed.timeLeftSeconds ?? 180 * 60);
        setFocusLossCount(parsed.focusLossCount || 0);
        setFocusLossSeconds(parsed.focusLossSeconds || 0);
        setFullscreenExitCount(parsed.fullscreenExitCount || 0);
        setAuditEvents(parsed.auditEvents || []);
        setTestStarted(true);
        setSavedActiveExamDetected(false);
        // Attempt to request browser fullscreen
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
      }
    } catch (e) {
      console.error('Failed to restore active exam session', e);
    }
  };

  const discardSavedExam = () => {
    localStorage.removeItem('gatehub_active_exam');
    setSavedActiveExamDetected(false);
  };

  // Continuous localStorage auto-save for refresh recovery
  useEffect(() => {
    if (testStarted && !testSubmitted) {
      try {
        localStorage.setItem('gatehub_active_exam', JSON.stringify({
          paperTitle,
          questionsLength: questions.length,
          questionStates,
          currentQIndex,
          timeLeftSeconds,
          focusLossCount,
          focusLossSeconds,
          fullscreenExitCount,
          auditEvents,
          timestamp: new Date().toISOString()
        }));
      } catch (e) {
        console.error('Failed to save exam recovery state', e);
      }
    }
  }, [testStarted, testSubmitted, questionStates, currentQIndex, timeLeftSeconds, focusLossCount, focusLossSeconds, fullscreenExitCount, auditEvents, paperTitle, questions.length]);

  // Countdown Timer & Auto-Submit
  useEffect(() => {
    let timer: any;
    if (testStarted && !testSubmitted && timeLeftSeconds > 0) {
      timer = setInterval(() => {
        setTimeLeftSeconds(prev => {
          if (prev <= 1) {
            handleFinalSubmit(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testStarted, testSubmitted, timeLeftSeconds]);

  // Event Listeners: Fullscreen API, Focus Monitoring & BeforeUnload
  useEffect(() => {
    if (!testStarted || testSubmitted) return;

    const handleFullscreenChange = () => {
      const activeFS = !!document.fullscreenElement;
      setIsFullscreen(activeFS);

      if (!activeFS && testStarted && !testSubmitted) {
        setFullscreenExitCount(prev => prev + 1);
        setShowFullscreenExitModal(true);
        setAuditEvents(prev => [
          ...prev, 
          { type: 'fullscreen_exit', timestamp: new Date().toLocaleTimeString() }
        ]);
      } else if (activeFS) {
        setShowFullscreenExitModal(false);
        setAuditEvents(prev => [
          ...prev, 
          { type: 'fullscreen_enter', timestamp: new Date().toLocaleTimeString() }
        ]);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setFocusLossCount(prev => prev + 1);
        focusLossStartRef.current = Date.now();
        setShowFocusWarning(true);
        setAuditEvents(prev => [
          ...prev, 
          { type: 'focus_lost', timestamp: new Date().toLocaleTimeString() }
        ]);
      } else {
        if (focusLossStartRef.current) {
          const elapsed = Math.round((Date.now() - focusLossStartRef.current) / 1000);
          setFocusLossSeconds(prev => prev + elapsed);
          focusLossStartRef.current = null;
        }
        setAuditEvents(prev => [
          ...prev, 
          { type: 'focus_returned', timestamp: new Date().toLocaleTimeString() }
        ]);
      }
    };

    const handleWindowBlur = () => {
      if (!document.hidden) {
        setFocusLossCount(prev => prev + 1);
        setShowFocusWarning(true);
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'Your examination is currently in progress. Your progress is saved, but are you sure you want to exit?';
      return e.returnValue;
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('fullscreenerror', (e) => console.warn('Fullscreen error:', e));
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [testStarted, testSubmitted]);

  // Keyboard Navigation & Shortcuts
  useEffect(() => {
    if (!testStarted || testSubmitted || showSubmitModal || showFullscreenExitModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === 'input' || targetTag === 'textarea') return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigatePrevious();
      } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'n') {
        e.preventDefault();
        saveAndNext();
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        markForReview();
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const optIndex = parseInt(e.key) - 1;
        const currentQ = questions[currentQIndex];
        if (currentQ && currentQ.options && currentQ.options[optIndex]) {
          handleOptionClick(currentQ.options[optIndex].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [testStarted, testSubmitted, showSubmitModal, showFullscreenExitModal, currentQIndex, questions, questionStates]);

  const requestBrowserFullscreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.warn('Browser denied automatic fullscreen request:', err);
    }
  };

  const startExam = async () => {
    const initStates: any = {};
    questions.forEach((_, idx) => {
      initStates[idx] = {
        status: idx === 0 ? 'not-answered' : 'not-visited',
        selectedOptions: [],
        natValue: ''
      };
    });
    setQuestionStates(initStates);
    setCurrentQIndex(0);
    setTimeLeftSeconds(180 * 60);
    setTestStarted(true);
    setTestSubmitted(false);
    setShowSubmitModal(false);
    setShowFullscreenExitModal(false);
    setFocusLossCount(0);
    setFocusLossSeconds(0);
    setFullscreenExitCount(0);
    setAuditEvents([]);

    // 1. Enter Fullscreen
    await requestBrowserFullscreen();
  };

  const handleOptionClick = (optId: string) => {
    const q = questions[currentQIndex];
    const currentState = questionStates[currentQIndex] || { status: 'not-answered', selectedOptions: [], natValue: '' };

    let newOpts: string[] = [];
    if (q.type === 'MCQ') {
      newOpts = [optId];
    } else if (q.type === 'MSQ') {
      newOpts = currentState.selectedOptions.includes(optId)
        ? currentState.selectedOptions.filter(id => id !== optId)
        : [...currentState.selectedOptions, optId];
    }

    const hasAnswer = newOpts.length > 0;
    const isMarked = currentState.status === 'marked' || currentState.status === 'answered-marked';

    setQuestionStates(prev => ({
      ...prev,
      [currentQIndex]: {
        ...currentState,
        selectedOptions: newOpts,
        status: hasAnswer ? (isMarked ? 'answered-marked' : 'answered') : 'not-answered'
      }
    }));
  };

  const handleNatChange = (val: string) => {
    const currentState = questionStates[currentQIndex] || { status: 'not-answered', selectedOptions: [], natValue: '' };
    const hasAnswer = val.trim().length > 0;
    const isMarked = currentState.status === 'marked' || currentState.status === 'answered-marked';

    setQuestionStates(prev => ({
      ...prev,
      [currentQIndex]: {
        ...currentState,
        natValue: val,
        status: hasAnswer ? (isMarked ? 'answered-marked' : 'answered') : 'not-answered'
      }
    }));
  };

  const clearResponse = () => {
    setQuestionStates(prev => ({
      ...prev,
      [currentQIndex]: {
        status: 'not-answered',
        selectedOptions: [],
        natValue: ''
      }
    }));
  };

  const markForReview = () => {
    const currentState = questionStates[currentQIndex] || { status: 'not-answered', selectedOptions: [], natValue: '' };
    const hasAnswer = currentState.selectedOptions.length > 0 || currentState.natValue.trim().length > 0;
    const newStatus = hasAnswer ? 'answered-marked' : 'marked';

    setQuestionStates(prev => ({
      ...prev,
      [currentQIndex]: { ...currentState, status: newStatus }
    }));
    navigateNext();
  };

  const saveAndNext = () => {
    const currentState = questionStates[currentQIndex] || { status: 'not-answered', selectedOptions: [], natValue: '' };
    const hasAnswer = currentState.selectedOptions.length > 0 || currentState.natValue.trim().length > 0;
    if (hasAnswer && currentState.status !== 'answered-marked') {
      setQuestionStates(prev => ({
        ...prev,
        [currentQIndex]: { ...currentState, status: 'answered' }
      }));
    }
    navigateNext();
  };

  const navigatePrevious = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
    }
  };

  const navigateNext = () => {
    if (currentQIndex < questions.length - 1) {
      const nextIdx = currentQIndex + 1;
      if (questionStates[nextIdx]?.status === 'not-visited') {
        setQuestionStates(prev => ({
          ...prev,
          [nextIdx]: { ...prev[nextIdx], status: 'not-answered' }
        }));
      }
      setCurrentQIndex(nextIdx);
    }
  };

  const handleFinalSubmit = (auto: boolean = false) => {
    setTestSubmitted(true);
    setShowSubmitModal(false);
    setShowFullscreenExitModal(false);
    localStorage.removeItem('gatehub_active_exam');

    if (auto) {
      alert('Examination timer reached 00:00:00. Your responses have been submitted automatically.');
    }

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    // Persist attempt record
    try {
      const metrics = calculateMetrics();
      const newRecord: ExamAttemptRecord = {
        id: `attempt-${Date.now()}`,
        paperTitle,
        date: new Date().toLocaleDateString(),
        score: metrics.totalScore,
        totalMarks: metrics.totalMaxMarks,
        attempted: metrics.attemptedCount,
        totalQuestions: questions.length,
        correct: metrics.correctCount,
        incorrect: metrics.incorrectCount,
        accuracy: metrics.accuracy,
        timeSpentSeconds: 180 * 60 - timeLeftSeconds,
        focusLossCount,
        focusLossSeconds,
        subjectBreakdown: metrics.subjectStats,
        topicBreakdown: metrics.topicStats
      };

      const historyStr = localStorage.getItem('gatehub_exam_history');
      const history = historyStr ? JSON.parse(historyStr) : [];
      localStorage.setItem('gatehub_exam_history', JSON.stringify([newRecord, ...history]));

      // Identify weak subjects (< 60% accuracy) for Personalized Plan integration
      const weakSubjIds = Object.entries(metrics.subjectStats)
        .filter(([_, stats]) => stats.attempted > 0 && (stats.correct / stats.attempted) < 0.6)
        .map(([id]) => id);

      if (weakSubjIds.length > 0) {
        localStorage.setItem('gatehub_planner_recommendation_weak', JSON.stringify({
          sourcePaper: paperTitle,
          weakSubjectIds: weakSubjIds,
          timestamp: new Date().toISOString()
        }));
      }
    } catch (e) {
      console.error('Failed to save exam attempt history', e);
    }
  };

  // Metric Calculation Engine
  const calculateMetrics = () => {
    let totalScore = 0;
    let totalMaxMarks = 0;
    let attemptedCount = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    let markedCount = 0;
    let negativeMarksLost = 0;

    const subjectStats: Record<string, { attempted: number; correct: number; total: number; score: number; name: string }> = {};
    const topicStats: Record<string, { attempted: number; correct: number; total: number }> = {};

    questions.forEach((q, idx) => {
      totalMaxMarks += q.marks;

      if (!subjectStats[q.subjectId]) {
        subjectStats[q.subjectId] = { attempted: 0, correct: 0, total: 0, score: 0, name: q.subjectName };
      }
      subjectStats[q.subjectId].total += 1;

      if (!topicStats[q.topic]) {
        topicStats[q.topic] = { attempted: 0, correct: 0, total: 0 };
      }
      topicStats[q.topic].total += 1;

      const state = questionStates[idx];
      if (!state) {
        unattemptedCount++;
        return;
      }

      if (state.status === 'marked' || state.status === 'answered-marked') {
        markedCount++;
      }

      const isAttempted = state.selectedOptions.length > 0 || state.natValue.trim().length > 0;
      if (!isAttempted) {
        unattemptedCount++;
        return;
      }

      attemptedCount++;
      subjectStats[q.subjectId].attempted += 1;
      topicStats[q.topic].attempted += 1;

      let isCorrect = false;
      if (q.type === 'MCQ') {
        isCorrect = state.selectedOptions[0] === q.correctAnswer;
      } else if (q.type === 'MSQ') {
        const correctSet = q.correctAnswer.split(',').map(s => s.trim());
        isCorrect = state.selectedOptions.length === correctSet.length && state.selectedOptions.every(opt => correctSet.includes(opt));
      } else if (q.type === 'NAT') {
        const userVal = parseFloat(state.natValue);
        if (!isNaN(userVal)) {
          if (q.correctAnswer.includes('to')) {
            const [min, max] = q.correctAnswer.split('to').map(v => parseFloat(v.trim()));
            isCorrect = userVal >= min && userVal <= max;
          } else {
            isCorrect = Math.abs(userVal - parseFloat(q.correctAnswer)) < 0.05;
          }
        }
      }

      if (isCorrect) {
        correctCount++;
        totalScore += q.marks;
        subjectStats[q.subjectId].correct += 1;
        subjectStats[q.subjectId].score += q.marks;
        topicStats[q.topic].correct += 1;
      } else {
        incorrectCount++;
        if (q.type === 'MCQ') {
          const neg = q.marks === 1 ? (1 / 3) : (2 / 3);
          totalScore -= neg;
          negativeMarksLost += neg;
          subjectStats[q.subjectId].score -= neg;
        }
      }
    });

    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const timeSpent = 180 * 60 - timeLeftSeconds;
    const avgTimePerQ = attemptedCount > 0 ? Math.round(timeSpent / attemptedCount) : 0;

    return {
      totalScore: Math.max(0, Math.round(totalScore * 100) / 100),
      totalMaxMarks,
      attemptedCount,
      correctCount,
      incorrectCount,
      unattemptedCount,
      markedCount,
      accuracy,
      negativeMarksLost: Math.round(negativeMarksLost * 100) / 100,
      timeSpentSeconds: timeSpent,
      avgTimePerQ,
      subjectStats,
      topicStats
    };
  };

  const formatTimer = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isPaperComplete = questions.length >= 65;

  // Add incorrect questions to revision queue helper
  const addIncorrectToRevisionQueue = () => {
    try {
      const incorrectQuestions = questions.filter((q, idx) => {
        const state = questionStates[idx];
        if (!state) return false;
        const isAttempted = state.selectedOptions.length > 0 || state.natValue.trim().length > 0;
        if (!isAttempted) return false;
        if (q.type === 'MCQ') return state.selectedOptions[0] !== q.correctAnswer;
        if (q.type === 'MSQ') {
          const correctSet = q.correctAnswer.split(',').map(s => s.trim());
          return !(state.selectedOptions.length === correctSet.length && state.selectedOptions.every(opt => correctSet.includes(opt)));
        }
        return state.natValue.trim() !== q.correctAnswer.trim();
      });

      const existingStr = localStorage.getItem('gatehub_revision_queue');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      const newItems = incorrectQuestions.map(q => ({
        id: `rev-${q.id}`,
        questionId: q.id,
        subjectId: q.subjectId,
        subjectName: q.subjectName,
        topic: q.topic,
        questionText: q.questionText,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        addedDate: new Date().toLocaleDateString()
      }));

      localStorage.setItem('gatehub_revision_queue', JSON.stringify([...newItems, ...existing]));
      alert(`${incorrectQuestions.length} incorrect question(s) successfully added to your Revision Queue!`);
    } catch (e) {
      console.error('Failed to add to revision queue', e);
    }
  };

  // 1. PRE-EXAM INSTRUCTIONS SCREEN
  if (!testStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Saved Active Exam Detection Alert Banner */}
        {savedActiveExamDetected && (
          <div className="bg-amber-950/80 border border-amber-500 rounded-3xl p-5 text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl animate-fadeIn">
            <div className="flex items-center space-x-3">
              <RefreshCw className="w-6 h-6 text-amber-400 shrink-0 animate-spin" />
              <div>
                <h4 className="font-bold text-white text-sm">Resume Active Examination Session?</h4>
                <p className="text-xs text-amber-300">An active session for "{paperTitle}" was saved from your previous attempt.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resumeActiveExam}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md"
              >
                Resume Examination
              </button>
              <button
                onClick={discardSavedExam}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700"
              >
                Start Fresh
              </button>
            </div>
          </div>
        )}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-slate-100">
          <button
            onClick={onExit}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:text-white border border-slate-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to GATEHub
          </button>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                paperType === 'official' 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                  : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
              }`}>
                {paperType === 'official' ? 'Official GATE Previous Year Paper' : 'GATEHub Full Practice Paper'}
              </span>

              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                isPaperComplete ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {isPaperComplete 
                  ? `Full Official Paper (65/65 Questions)` 
                  : `Partial Paper — ${questions.length}/65 questions available`}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {paperTitle}
            </h1>
            <p className="text-xs text-slate-400">
              Duration: 180 Minutes (3 Hours) • Total Questions: {questions.length} • Maximum Marks: 100 • Pattern: GATE CBT
            </p>
          </div>

          <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3 text-xs text-slate-300">
            <h3 className="font-bold text-blue-400 text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-blue-400" />
              Official GATE CBT Instructions & Rules
            </h3>
            <ul className="space-y-2 list-disc pl-4 text-slate-400 leading-relaxed">
              <li><strong>Fullscreen Mode Required:</strong> Clicking the start button will request browser fullscreen mode.</li>
              <li>The exam clock counts down from <strong>180:00 minutes</strong>. The timer starts AFTER entering fullscreen.</li>
              <li>When the clock reaches zero, your examination will automatically submit.</li>
              <li>Use <strong>Save & Next</strong> to submit your response and advance to the next question.</li>
              <li>Use <strong>Mark for Review & Next</strong> to flag questions for subsequent review.</li>
              <li><strong className="text-emerald-400">Green:</strong> Answered. <strong className="text-rose-400">Red:</strong> Not Answered. <strong className="text-purple-400">Purple:</strong> Marked for Review.</li>
              <li><strong>Marking Scheme:</strong> 1-mark MCQs deduct 0.33 marks for wrong answers; 2-mark MCQs deduct 0.67 marks. MSQ and NAT questions carry NO negative marking.</li>
              <li>Keyboard Shortcuts: <kbd className="px-1.5 py-0.5 bg-slate-800 border rounded font-mono">←</kbd> Previous, <kbd className="px-1.5 py-0.5 bg-slate-800 border rounded font-mono">→</kbd> Next, <kbd className="px-1.5 py-0.5 bg-slate-800 border rounded font-mono">1-4</kbd> MCQ options, <kbd className="px-1.5 py-0.5 bg-slate-800 border rounded font-mono">M</kbd> Mark.</li>
            </ul>
          </div>

          <button
            onClick={startExam}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-black text-base shadow-xl flex items-center justify-center space-x-2 transform hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>ENTER FULLSCREEN & START EXAM</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. ACTIVE EXAM CONSOLE (Full-Screen CBT Viewport)
  if (testStarted && !testSubmitted && questions.length > 0) {
    const currentQ = questions[currentQIndex];
    const currentState = questionStates[currentQIndex] || { status: 'not-answered', selectedOptions: [], natValue: '' };

    const isGASection = currentQ.subjectId === 'ga' || currentQ.questionNo <= 10;
    const sectionTitle = isGASection ? 'General Aptitude (Q1 - Q10)' : 'Computer Science & Engineering (Q11 - Q65)';

    // Timer Warning States (30m, 15m, 5m)
    const isTimerWarning30 = timeLeftSeconds <= 30 * 60 && timeLeftSeconds > 15 * 60;
    const isTimerWarning15 = timeLeftSeconds <= 15 * 60 && timeLeftSeconds > 5 * 60;
    const isTimerUrgent5 = timeLeftSeconds <= 5 * 60;

    return (
      <div className="fixed inset-0 z-50 bg-[#070a12] text-slate-100 flex flex-col font-sans select-none overflow-hidden">
        {/* EXAM HEADER BAR */}
        <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="px-2.5 py-1 bg-blue-600 text-white font-black text-xs rounded-lg uppercase tracking-wider">
              GATEHub CBT
            </div>
            <div>
              <h2 className="text-xs font-bold text-white truncate max-w-xs sm:max-w-md">{paperTitle}</h2>
              <span className="text-[10px] text-slate-400 block -mt-0.5 font-medium">{sectionTitle}</span>
            </div>
          </div>

          {/* Section Selector Tabs */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                const gaIdx = questions.findIndex(q => q.subjectId === 'ga' || q.questionNo <= 10);
                if (gaIdx !== -1) setCurrentQIndex(gaIdx);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                isGASection ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              General Aptitude
            </button>
            <button
              onClick={() => {
                const csIdx = questions.findIndex(q => q.subjectId !== 'ga' && q.questionNo > 10);
                if (csIdx !== -1) setCurrentQIndex(csIdx);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                !isGASection ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Core CS & Engineering
            </button>
          </div>

          {/* Right Header Controls & Countdown Timer */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 flex items-center gap-1"
              title="Virtual Calculator"
            >
              <Calculator className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[11px] font-semibold hidden sm:inline">Calculator</span>
            </button>

            <button
              onClick={async () => {
                if (!document.fullscreenElement) {
                  await requestBrowserFullscreen();
                } else {
                  document.exitFullscreen().catch(() => {});
                }
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 hidden sm:flex items-center gap-1"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
              <span className="text-[11px] font-semibold">{isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}</span>
            </button>

            {/* Focus Loss Counter */}
            {focusLossCount > 0 && (
              <div className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold hidden sm:block">
                Focus Lost: {focusLossCount}x
              </div>
            )}

            {/* Countdown Timer Display */}
            <div className={`px-3.5 py-1.5 rounded-xl font-mono font-black text-sm flex items-center gap-2 border transition-all ${
              isTimerUrgent5 
                ? 'bg-red-600 text-white border-red-500 animate-pulse' 
                : isTimerWarning15 
                  ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                  : isTimerWarning30
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                    : 'bg-slate-950 text-emerald-400 border-slate-800'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTimer(timeLeftSeconds)}</span>
            </div>
          </div>
        </header>

        {/* 30m / 15m / 5m Timer Warning Toast Banners */}
        {isTimerUrgent5 && (
          <div className="bg-red-600 text-white text-center py-1 text-xs font-black tracking-wide shrink-0">
            ⚠️ WARNING: Less than 5 minutes remaining! Your examination will auto-submit at 00:00:00.
          </div>
        )}
        {isTimerWarning15 && (
          <div className="bg-orange-600 text-white text-center py-1 text-xs font-bold tracking-wide shrink-0">
            ⏱️ WARNING: 15 minutes remaining in your examination.
          </div>
        )}

        {/* MAIN WORKSPACE & QUESTION PALETTE GRID */}
        <div className="flex-1 flex overflow-hidden">
          {/* QUESTION WORKSPACE (LEFT COLUMN) */}
          <div className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* Question Header Status */}
            <div className="flex justify-between items-center bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-blue-400 text-sm">Question {currentQ.questionNo || (currentQIndex + 1)}</span>
                <span className="text-slate-500">•</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold border border-slate-700">
                  {currentQ.type}
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-bold border border-blue-800">
                  {currentQ.marks} {currentQ.marks === 1 ? 'Mark' : 'Marks'}
                </span>
                <span className="text-[10px] text-slate-400">
                  {currentQ.type === 'MCQ' ? `(-${currentQ.marks === 1 ? '0.33' : '0.67'} wrong)` : '(No Negative)'}
                </span>
              </div>
              <span className="text-slate-400 font-semibold">{currentQ.subjectName}</span>
            </div>

            {/* Question Content Box */}
            <div className="flex-1 bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4 overflow-y-auto">
              <p className="text-sm sm:text-base leading-relaxed font-normal text-slate-100 whitespace-pre-line">
                {currentQ.questionText}
              </p>

              {currentQ.codeSnippet && (
                <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <code>{currentQ.codeSnippet}</code>
                </pre>
              )}

              {/* Options selection for MCQ / MSQ */}
              {(currentQ.type === 'MCQ' || currentQ.type === 'MSQ') && (
                <div className="space-y-2.5 pt-2">
                  {currentQ.options?.map((opt) => {
                    const isSelected = currentState.selectedOptions.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleOptionClick(opt.id)}
                        className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600/20 border-blue-500 text-blue-200 ring-1 ring-blue-500 font-semibold'
                            : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold font-mono text-xs shrink-0 ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          {opt.id}
                        </span>
                        <span className="pt-0.5">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* NAT Numerical Input Box */}
              {currentQ.type === 'NAT' && (
                <div className="pt-3 space-y-3">
                  <label className="block text-xs font-bold text-slate-300">
                    Virtual Keypad Numeric Answer:
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={currentState.natValue}
                      onChange={(e) => handleNatChange(e.target.value)}
                      placeholder="Enter value (e.g. 12 or 12.5)"
                      className="px-4 py-3 rounded-xl bg-slate-950 border border-blue-500/50 text-white font-mono text-base font-bold w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => handleNatChange('')}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700"
                    >
                      Clear Input
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* BOTTOM EXAM ACTION CONTROLS */}
            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={navigatePrevious}
                  disabled={currentQIndex === 0}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 disabled:opacity-40"
                >
                  ← Previous
                </button>
                <button
                  onClick={clearResponse}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700"
                >
                  Clear Response
                </button>
                <button
                  onClick={markForReview}
                  className="px-4 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/40 text-purple-300 border border-purple-500/50 text-xs font-bold"
                >
                  Mark for Review & Next
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={saveAndNext}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20"
                >
                  Save & Next →
                </button>
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-lg shadow-emerald-600/20"
                >
                  Submit Examination
                </button>
              </div>
            </div>
          </div>

          {/* QUESTION PALETTE SIDEBAR (RIGHT COLUMN) */}
          <aside className="w-80 bg-slate-900 border-l border-slate-800 p-4 flex flex-col justify-between hidden lg:flex shrink-0">
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                <h3 className="font-extrabold text-xs text-white uppercase tracking-wider">Question Palette</h3>
                <span className="text-[11px] text-blue-400 font-bold">{questions.length} Questions</span>
              </div>

              {/* Status Legend */}
              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-600 inline-block"></span> Answered</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-600 inline-block"></span> Not Answered</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-purple-600 inline-block"></span> Marked</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-800 inline-block"></span> Not Visited</div>
              </div>

              {/* Palette Buttons Grid (1 to 65) */}
              <div className="grid grid-cols-5 gap-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
                {questions.map((q, idx) => {
                  const state = questionStates[idx]?.status || 'not-visited';
                  let btnStyle = 'bg-slate-800 text-slate-400 border-slate-700';

                  if (state === 'answered') btnStyle = 'bg-emerald-600 text-white font-bold border-emerald-500';
                  else if (state === 'not-answered') btnStyle = 'bg-rose-600 text-white font-bold border-rose-500';
                  else if (state === 'marked' || state === 'answered-marked') btnStyle = 'bg-purple-600 text-white font-bold border-purple-500';

                  if (currentQIndex === idx) btnStyle += ' ring-2 ring-blue-400 scale-105 z-10';

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`h-9 rounded-lg border text-xs font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${btnStyle}`}
                    >
                      {q.questionNo || (idx + 1)}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-lg transition-all"
            >
              Submit Final Test
            </button>
          </aside>
        </div>

        {/* VIRTUAL CALCULATOR POPUP */}
        <VirtualCalculator
          isOpen={isCalculatorOpen}
          onClose={() => setIsCalculatorOpen(false)}
        />

        {/* SUBMISSION CONFIRMATION MODAL */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 text-slate-100 shadow-2xl animate-fadeIn">
              <div className="space-y-2 text-center">
                <ShieldAlert className="w-12 h-12 text-amber-400 mx-auto" />
                <h3 className="text-2xl font-black text-white">Submit Examination?</h3>
                <p className="text-xs text-slate-400">Please review your examination summary before final submission.</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>Answered: <strong className="text-emerald-400 text-sm block">{Object.values(questionStates).filter(s => s.status === 'answered' || s.status === 'answered-marked').length}</strong></div>
                <div>Unanswered: <strong className="text-rose-400 text-sm block">{Object.values(questionStates).filter(s => s.status === 'not-answered' || s.status === 'not-visited').length}</strong></div>
                <div>Marked Review: <strong className="text-purple-400 text-sm block">{Object.values(questionStates).filter(s => s.status === 'marked' || s.status === 'answered-marked').length}</strong></div>
                <div>Time Left: <strong className="text-amber-400 text-sm block">{formatTimer(timeLeftSeconds)}</strong></div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700"
                >
                  Continue Exam
                </button>
                <button
                  onClick={() => handleFinalSubmit(false)}
                  className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-lg"
                >
                  Submit Final
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FULLSCREEN EXITED MODAL */}
        {showFullscreenExitModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-amber-500/50 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 text-slate-100 shadow-2xl animate-fadeIn">
              <div className="space-y-2 text-center">
                <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto" />
                <h3 className="text-2xl font-black text-white">Exam Mode Exited</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Browser fullscreen was exited. Your examination responses and remaining time have been saved.
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
                <p>Recorded Exit Events: <strong>{fullscreenExitCount}</strong></p>
                <p>Exam Focus Loss Count: <strong>{focusLossCount}</strong></p>
              </div>

              <div className="flex flex-col gap-2.5">
                <button
                  onClick={async () => {
                    setShowFullscreenExitModal(false);
                    await requestBrowserFullscreen();
                  }}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold shadow-lg"
                >
                  Return to Fullscreen Exam
                </button>

                <button
                  onClick={() => setShowFullscreenExitModal(false)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700"
                >
                  Continue in Normal Window
                </button>

                <button
                  onClick={() => handleFinalSubmit(false)}
                  className="w-full py-2.5 rounded-xl bg-red-900/40 hover:bg-red-900/60 text-red-300 text-xs font-bold border border-red-800/50"
                >
                  Submit Exam Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FOCUS LOSS WARNING TOAST */}
        {showFocusWarning && (
          <div className="fixed top-4 right-4 z-50 bg-amber-950/90 border border-amber-500 text-amber-200 px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between space-x-3 text-xs animate-bounce">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <span><strong>Exam Focus Monitoring:</strong> Window lost focus ({focusLossCount} event(s)).</span>
            </div>
            <button
              onClick={() => setShowFocusWarning(false)}
              className="px-2 py-1 bg-amber-900 hover:bg-amber-800 rounded font-bold text-[10px]"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    );
  }

  // 3. EXAM RESULT SCORECARD & PERFORMANCE ANALYTICS
  const metrics = calculateMetrics();

  const filteredQuestions = questions.filter((q, idx) => {
    const state = questionStates[idx];
    if (reviewFilter === 'correct') {
      if (!state) return false;
      if (q.type === 'MCQ') return state.selectedOptions[0] === q.correctAnswer;
      if (q.type === 'MSQ') {
        const correctSet = q.correctAnswer.split(',').map(s => s.trim());
        return state.selectedOptions.length === correctSet.length && state.selectedOptions.every(opt => correctSet.includes(opt));
      }
      return Math.abs(parseFloat(state.natValue || '0') - parseFloat(q.correctAnswer)) < 0.05;
    }
    if (reviewFilter === 'incorrect') {
      if (!state) return false;
      const isAttempted = state.selectedOptions.length > 0 || state.natValue.trim().length > 0;
      if (!isAttempted) return false;
      if (q.type === 'MCQ') return state.selectedOptions[0] !== q.correctAnswer;
      if (q.type === 'MSQ') {
        const correctSet = q.correctAnswer.split(',').map(s => s.trim());
        return !(state.selectedOptions.length === correctSet.length && state.selectedOptions.every(opt => correctSet.includes(opt)));
      }
      return state.natValue.trim() !== q.correctAnswer.trim();
    }
    if (reviewFilter === 'unattempted') {
      return !state || (state.selectedOptions.length === 0 && !state.natValue.trim());
    }
    if (reviewFilter === 'marked') {
      return state?.status === 'marked' || state?.status === 'answered-marked';
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 text-slate-100">
      {/* Top Score Summary Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 border border-indigo-900/60 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              GATE CBT Examination Scorecard
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-2 tracking-tight">{paperTitle}</h1>
            <p className="text-xs text-slate-400 mt-1">Submitted on {new Date().toLocaleDateString()}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate('/personalized-plan');
                }
              }}
              className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> Update My Preparation Plan
            </button>

            <button
              onClick={startExam}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> Re-attempt Paper
            </button>

            <button
              onClick={onExit}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold cursor-pointer"
            >
              Return to GATEHub
            </button>
          </div>
        </div>

        {/* Scorecard Metric Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block">Final Score</span>
            <span className="text-2xl font-black text-blue-400">{metrics.totalScore} / {metrics.totalMaxMarks}</span>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block">Accuracy</span>
            <span className="text-2xl font-black text-emerald-400">{metrics.accuracy}%</span>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block">Attempted</span>
            <span className="text-2xl font-black text-slate-100">{metrics.attemptedCount} / {questions.length}</span>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block">Correct</span>
            <span className="text-2xl font-black text-emerald-400">{metrics.correctCount}</span>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block">Incorrect</span>
            <span className="text-2xl font-black text-rose-400">{metrics.incorrectCount}</span>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block">Negative Lost</span>
            <span className="text-2xl font-black text-rose-400">-{metrics.negativeMarksLost}</span>
          </div>
        </div>

        {/* Secondary Analytics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between text-slate-300">
            <span>Time Used: <strong className="text-white">{formatTimer(metrics.timeSpentSeconds)}</strong></span>
            <span>Avg/Q: <strong className="text-blue-400">{metrics.avgTimePerQ}s</strong></span>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between text-slate-300">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Exam Focus Monitoring:</span>
            </div>
            <strong className="text-amber-400">{focusLossCount} Focus Loss(es) ({focusLossSeconds}s)</strong>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between text-slate-300">
            <span>Fullscreen Exits:</span>
            <strong className="text-purple-400">{fullscreenExitCount} Exit Event(s)</strong>
          </div>
        </div>

        {/* Action Bar for PYQ Integration */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <span className="text-xs text-slate-400 font-semibold">Post-Exam Recommended Actions:</span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={addIncorrectToRevisionQueue}
              className="px-3.5 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/40 text-purple-300 border border-purple-500/50 text-xs font-bold transition-all cursor-pointer"
            >
              Add Incorrect Questions to Revision Queue
            </button>
            <button
              onClick={() => setReviewFilter('incorrect')}
              className="px-3.5 py-2 rounded-xl bg-rose-600/30 hover:bg-rose-600/40 text-rose-300 border border-rose-500/50 text-xs font-bold transition-all cursor-pointer"
            >
              Review Incorrect Questions
            </button>
          </div>
        </div>
      </div>

      {/* Subject-Wise Performance Breakdown */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-blue-500" /> Subject-Wise Score Breakdown
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(metrics.subjectStats).map(([subjId, stats]) => {
            const acc = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;
            return (
              <div key={subjId} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-xs text-white truncate">{stats.name}</h4>
                  <span className="text-xs font-black text-blue-400">{stats.score.toFixed(2)} pts</span>
                </div>
                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>Attempted: {stats.attempted}/{stats.total}</span>
                  <span>Accuracy: <strong className={acc >= 70 ? 'text-emerald-400' : acc >= 50 ? 'text-amber-400' : 'text-rose-400'}>{acc}%</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Topic-Wise Breakdown */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-500" /> Topic-Wise Accuracy Breakdown
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(metrics.topicStats).map(([topicName, stats]) => {
            const acc = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;
            return (
              <div key={topicName} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <span className="font-medium text-slate-300 truncate max-w-[180px]">{topicName}</span>
                <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                  acc >= 70 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                  acc >= 50 ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                  'bg-rose-950 text-rose-300 border border-rose-800'
                }`}>
                  {stats.correct}/{stats.attempted} ({acc}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* QUESTION REVIEW SECTION */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-extrabold text-white">Comprehensive Question Review</h3>
            <p className="text-xs text-slate-400">Step-by-step explanations, official keys, and concept notes.</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'correct', label: 'Correct' },
              { id: 'incorrect', label: 'Incorrect' },
              { id: 'unattempted', label: 'Unattempted' },
              { id: 'marked', label: 'Marked' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setReviewFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  reviewFilter === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Review Question Cards List */}
        <div className="space-y-6">
          {filteredQuestions.map((q) => {
            const originalIndex = questions.findIndex(orig => orig.id === q.id);
            const state = questionStates[originalIndex];
            const studentAns = state?.selectedOptions?.join(', ') || state?.natValue || 'Unattempted';
            const isCorrect = q.type === 'MCQ' 
              ? state?.selectedOptions[0] === q.correctAnswer
              : q.type === 'MSQ'
                ? state?.selectedOptions.length === q.correctAnswer.split(',').length && state?.selectedOptions.every(opt => q.correctAnswer.includes(opt))
                : Math.abs(parseFloat(state?.natValue || '0') - parseFloat(q.correctAnswer)) < 0.05;

            return (
              <div key={q.id} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-blue-400">Q{q.questionNo || (originalIndex + 1)}</span>
                    <span className="text-slate-500">•</span>
                    <span className="font-semibold text-slate-300">{q.subjectName}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{q.topic}</span>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    studentAns === 'Unattempted' 
                      ? 'bg-slate-800 text-slate-400' 
                      : isCorrect 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    {studentAns === 'Unattempted' ? 'Unattempted' : isCorrect ? 'Correct (+ ' + q.marks + ')' : 'Incorrect'}
                  </span>
                </div>

                <p className="text-sm text-slate-100 font-medium whitespace-pre-line">{q.questionText}</p>

                {q.codeSnippet && (
                  <pre className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                    <code>{q.codeSnippet}</code>
                  </pre>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block font-semibold">Your Answer:</span>
                    <span className={`font-mono font-bold text-sm ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {studentAns}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block font-semibold">Official Correct Answer:</span>
                    <span className="font-mono font-bold text-sm text-emerald-400">{q.correctAnswer}</span>
                  </div>
                </div>

                <div className="p-4 bg-blue-950/30 rounded-xl border border-blue-900/50 space-y-2 text-xs text-slate-300">
                  <span className="font-bold text-blue-400 block">Explanation & Concept Tested:</span>
                  <p className="leading-relaxed">{q.explanation}</p>
                  {q.conceptTested && (
                    <p className="text-slate-400 pt-1"><strong>Concept:</strong> {q.conceptTested}</p>
                  )}
                  {q.shortcutTrick && (
                    <p className="text-emerald-400 font-medium pt-0.5"><strong>Shortcut / Pro-Tip:</strong> {q.shortcutTrick}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
