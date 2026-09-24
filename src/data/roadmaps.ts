import { StudyRoadmap } from '../types';

export const GATE_ROADMAPS: StudyRoadmap[] = [
  {
    id: '6-month-plan',
    title: '6-Month Comprehensive Preparation Master Plan',
    duration: '6 Months (24 Weeks)',
    description: 'Ideal starting strategy for 3rd year or 4th year students with ample time to master concepts from scratch, solve 15+ years of PYQs, and complete 20 full mock tests.',
    targetAudience: 'Beginners & 3rd/4th Year Students starting 6+ months before exam',
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: Math & Fundamental Core (Weeks 1 - 6)',
        durationWeeks: '6 Weeks',
        focusSubjects: ['Engineering Mathematics', 'Digital Logic', 'C Programming & Data Structures'],
        actionItems: [
          'Master Propositional Logic, Quantifiers, and Graph Theory properties.',
          'Solve all K-Map, MUX, and Sequential Circuit problems.',
          'Practice recursion tracing and tree traversals in C.',
          'Solve last 10 years PYQs for Math, DL, and PDS.'
        ],
        goals: ['Cover 35% of total GATE marks weightage.', 'Build strong mathematical intuition.']
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Heavyweight Systems & Theory (Weeks 7 - 14)',
        durationWeeks: '8 Weeks',
        focusSubjects: ['Algorithms', 'Theory of Computation', 'Operating Systems', 'COA'],
        actionItems: [
          'Master Master Theorem, Dijkstra, and DP formulations in Algorithms.',
          'Practice DFA minimization and Language closure tables in TOC.',
          'Solve Process Synchronization, Banker\'s Algorithm, and Page Table NATs in OS.',
          'Understand Pipelining hazards and Cache Tag/Index calculations in COA.'
        ],
        goals: ['Complete 4 core high-yield subjects (30+ marks).', 'Maintain 80%+ accuracy in subject-wise quizzes.']
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Database, Networks & Compiler (Weeks 15 - 19)',
        durationWeeks: '5 Weeks',
        focusSubjects: ['DBMS', 'Computer Networks', 'Compiler Design', 'General Aptitude'],
        actionItems: [
          'Practice BCNF decomposition and B+ Tree order calculations.',
          'Solve Sliding Window efficiency and IPv4 Subnetting NATs.',
          'Master FIRST & FOLLOW sets in Compiler Design.',
          'Spend 30 minutes daily on General Aptitude.'
        ],
        goals: ['Finish entire GATE CSE syllabus coverage.', 'Complete first full PYQ pass (2010 - 2025).']
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Revision & Full-Length Mock Tests (Weeks 20 - 24)',
        durationWeeks: '5 Weeks',
        focusSubjects: ['All 11 Subjects'],
        actionItems: [
          'Take 15 to 20 Full-Length Mock Tests in exam condition (3 hrs).',
          'Analyze every test: catalog mistake types (calculation error vs conceptual gap).',
          'Revise short notes & formula cards daily.',
          'Re-attempt top 100 trickiest GATE PYQs.'
        ],
        goals: ['Achieve 65+ marks consistently in full mock tests.', 'Zero calculation mistakes on NAT questions.']
      }
    ]
  },
  {
    id: '3-month-plan',
    title: '3-Month High-Yield Power Sprint',
    duration: '3 Months (12 Weeks)',
    description: 'Fast-paced, PYQ-driven roadmap for students who have basic subject familiarity and need to maximize their GATE score rapidly.',
    targetAudience: 'Repeaters or students with basic background starting 3 months prior',
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: High-Weightage Core Rapid Pass (Weeks 1 - 5)',
        durationWeeks: '5 Weeks',
        focusSubjects: ['Algorithms', 'Data Structures', 'OS', 'DBMS', 'Discrete Math'],
        actionItems: [
          'Study concepts strictly alongside PYQ pattern analysis.',
          'Solve 2015-2025 PYQs for all 5 focus subjects.',
          'Prepare concise single-page formula cheatsheets per subject.'
        ],
        goals: ['Secure ~50 marks coverage in first 5 weeks.']
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: System Subjects & Aptitude (Weeks 6 - 9)',
        durationWeeks: '4 Weeks',
        focusSubjects: ['CN', 'COA', 'TOC', 'Digital Logic', 'General Aptitude'],
        actionItems: [
          'Focus on subnetting, cache memory, DFA states, and aptitude.',
          'Take subject-wise timed tests.'
        ],
        goals: ['Complete 90%+ syllabus weightage.']
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Mock Strategy & Last Mile (Weeks 10 - 12)',
        durationWeeks: '3 Weeks',
        focusSubjects: ['Full Revision & Mocks'],
        actionItems: [
          'Attempt 10 full length mock tests.',
          'Revise weak area cards daily.'
        ],
        goals: ['Build 3-hour exam stamina and test strategy.']
      }
    ]
  },
  {
    id: '7-day-last-minute',
    title: 'Last 7-Day Final Revision Checklist',
    duration: '7 Days',
    description: 'Strict protocol for the final week before the GATE examination. No new topics — focus purely on formulas, common mistakes, NAT precision, and mock review.',
    targetAudience: 'All GATE candidates in final 7 days before exam',
    phases: [
      {
        phaseNumber: 1,
        title: 'Day 1 & 2: Systems & Math Formulas',
        durationWeeks: '2 Days',
        focusSubjects: ['Discrete Math', 'COA', 'OS', 'CN'],
        actionItems: [
          'Review Cache Tag/Index equations and Page Table access times.',
          'Review Sliding Window efficiency formula η = W/(1+2a).',
          'Review Graph Theory handshaking & planar graph theorems.'
        ],
        goals: ['Memorize all numerical formulas accurately.']
      },
      {
        phaseNumber: 2,
        title: 'Day 3 & 4: Theory, Algos & DBMS',
        durationWeeks: '2 Days',
        focusSubjects: ['Algorithms', 'TOC', 'Compiler', 'DBMS'],
        actionItems: [
          'Review Chomsky hierarchy inclusion table & closure properties.',
          'Review 3NF vs BCNF rules and B+ tree node capacity.',
          'Review Master Theorem cases.'
        ],
        goals: ['Solidify theoretical closure properties.']
      },
      {
        phaseNumber: 3,
        title: 'Day 5 & 6: Formula Flashcards & GATE 2025 PYQ Review',
        durationWeeks: '2 Days',
        focusSubjects: ['GATE 2025 CS-1 & CS-2 Papers'],
        actionItems: [
          'Re-verify recent GATE 2025 paper questions and trick points.',
          'Double check virtual calculator operation tips.'
        ],
        goals: ['Eliminate common NAT trap habits.']
      },
      {
        phaseNumber: 4,
        title: 'Day 7: Relax, Exam Strategy & Admit Card',
        durationWeeks: '1 Day',
        focusSubjects: ['Mindset & Logistics'],
        actionItems: [
          'Print GATE Admit Card and ID proof.',
          'Get 8 hours of sleep. No late night studying.'
        ],
        goals: ['Peak mental performance on exam day.']
      }
    ]
  }
];
