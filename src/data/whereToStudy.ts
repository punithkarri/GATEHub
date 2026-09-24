import { WhereToStudyOption } from '../types';

export const WHERE_TO_STUDY_DATA: WhereToStudyOption[] = [
  {
    id: 'zero-start',
    studentProfile: 'I am starting from absolute zero (Beginner)',
    timeline: '6+ Months available',
    budget: 'Free',
    recommendation: {
      strategy: 'Build rock-solid fundamentals using NPTEL lectures, standard textbooks for reference, and GeeksforGeeks for quick summaries. Practice PYQs side-by-side using Gate Overflow.',
      topResources: [
        'NPTEL Official Video Courses (IIT Faculty)',
        'Gate Overflow PYQ Portal (Free PDF & Interactive)',
        'GeeksforGeeks GATE CS Notes & Trackers',
        'Standard Textbooks (CLRS for Algos, Galvin for OS)'
      ],
      dailyRoutine: '4 Hours Daily: 2 hrs concept video/reading + 1 hr note making + 1 hr PYQ practice on Gate Overflow.',
      keyAdvice: 'Do not just watch videos passively! Write your own short formula notebook from Day 1.'
    }
  },
  {
    id: 'pyq-focused',
    studentProfile: 'I only need PYQ-focused preparation & problem practice',
    timeline: '3 - 4 Months available',
    budget: 'Any',
    recommendation: {
      strategy: 'Skip long lectures! Go directly to topic-wise PYQs. Whenever you get stuck on a question, read that specific topic concept notes.',
      topResources: [
        'Gate Overflow Volume 1 & 2 Book / Portal',
        'GATEHub Interactive PYQ Explorer & Mock Simulator',
        'GATE 2025 & 2024 Official Master Papers'
      ],
      dailyRoutine: '5 Hours Daily: 3.5 hrs solving 30+ PYQs + 1.5 hrs analyzing solutions and missed concepts.',
      keyAdvice: 'Solve every numerical NAT question using the virtual calculator to build speed and accuracy.'
    }
  },
  {
    id: 'last-minute-revision',
    studentProfile: 'I need last-minute revision & formula memory boost',
    timeline: '1 Month or 7 Days remaining',
    budget: 'Free',
    recommendation: {
      strategy: 'Focus 100% on Short Notes, Formula Cheatsheets, Gate Overflow test series, and re-solving tricky MSQ/NAT questions.',
      topResources: [
        'GATEHub Revision Center & Formula Sheets',
        'Made Easy / Ace Academy Short Revision Handbooks',
        'Gate Overflow Subject-wise Tests'
      ],
      dailyRoutine: '6 Hours Daily: 2 hrs formula review + 3 hrs full mock test + 1 hr error log analysis.',
      keyAdvice: 'Do not start any new topic in the last 30 days! Maximize marks in your strong subjects.'
    }
  }
];
