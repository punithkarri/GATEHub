export type Branch = 'CSE' | 'ECE' | 'EE' | 'ME' | 'CE' | 'DA';

export type QuestionType = 'MCQ' | 'MSQ' | 'NAT';

export type TopicStatus = 'Not Started' | 'Learning' | 'Practicing' | 'Strong' | 'Completed';

export interface Topic {
  id: string;
  name: string;
  subtopics: string[];
  importance: 'High' | 'Medium' | 'Low';
  weightageEstimate: string;
  importantConcepts: string[];
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  iconName: string;
  description: string;
  marksWeightage: string; // e.g. "8-10 Marks"
  recommendedHours: number;
  overview: string;
  topics: Topic[];
  notes?: string[];
  formulas?: { title: string; formula: string; explanation: string }[];
  commonMistakes?: string[];
}

export interface Question {
  id: string;
  questionNo: number;
  year: number;
  paper: 'CS-1' | 'CS-2' | 'CS';
  subjectId: string;
  subjectName: string;
  topic: string;
  subtopic?: string;
  type: QuestionType;
  marks: 1 | 2;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questionText: string;
  codeSnippet?: string;
  options?: { id: string; text: string }[];
  correctAnswer: string; // For MCQ: "A", MSQ: "A, C", NAT: "12" or "12.5 to 13.0"
  explanation: string;
  conceptTested: string;
  shortcutTrick?: string;
  source: string; // e.g. "Official GATE 2025 Paper (IIT Roorkee)" or "GATEHub Practice"
  officialSourceLink?: string;
  tags: string[];
}

export interface PaperInfo {
  id: string; // e.g. "2025-CS-1"
  year: number;
  paper: 'CS-1' | 'CS-2' | 'CS';
  title: string;
  organizingInstitute: string;
  questionCount: number;
  totalMarks: number;
  officialSourceUrl: string;
  isVerified: boolean;
}

export interface Resource {
  id: string;
  name: string;
  type: 'Book' | 'YouTube' | 'Course' | 'Website' | 'Notes' | 'Documentation' | 'Practice Platform' | 'Official';
  subjectId?: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  isFree: boolean;
  externalUrl: string;
  sourceName: string;
  rating: number;
  tags: string[];
  recommendedFor: string;
}

export interface StudyRoadmap {
  id: string;
  title: string;
  duration: string;
  description: string;
  targetAudience: string;
  phases: {
    phaseNumber: number;
    title: string;
    durationWeeks: string;
    focusSubjects: string[];
    actionItems: string[];
    goals: string[];
  }[];
}

export interface PlannerTask {
  id: string;
  title: string;
  subjectId: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
  durationMinutes: number;
  category: 'Learn' | 'PYQ' | 'Revision' | 'Mock';
}

export interface RevisionCard {
  id: string;
  subjectId: string;
  subjectName: string;
  topic: string;
  title: string;
  content: string;
  formula?: string;
  keyTakeaway: string;
  commonTrap?: string;
}

export interface WhereToStudyOption {
  id: string;
  studentProfile: string;
  timeline: string;
  budget: 'Free' | 'Paid' | 'Any';
  recommendation: {
    strategy: string;
    topResources: string[];
    dailyRoutine: string;
    keyAdvice: string;
  };
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'PYQ' | 'Mock' | 'Streak' | 'Syllabus';
  unlocked: boolean;
  progressText: string;
}

export interface StudyRecommendation {
  id: string;
  type: 'topic' | 'revision' | 'practice' | 'mock';
  title: string;
  reason: string;
  actionLabel: string;
  route: string;
  priority: 'High' | 'Medium' | 'Low';
}
