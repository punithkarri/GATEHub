import { GATE_CSE_SUBJECTS } from '../data/syllabus';
import { VERIFIED_VIDEO_RESOURCES, VideoResource } from '../data/videoResources';

export interface WeeklyAvailability {
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
}

export interface OnboardingSettings {
  branch: string;
  examDate: string; // YYYY-MM-DD
  dailyHours: number;
  weeklyHours: WeeklyAvailability;
  studySessions: string[]; // ['Morning', 'Evening']
  currentLevel: 'Starting from zero' | 'Beginner' | 'Basic concepts completed' | 'Syllabus partially completed' | 'Mostly revision' | 'PYQ-focused' | 'Mock-test phase';
  subjectStatus: Record<string, 'Not Started' | 'Weak' | 'Average' | 'Strong' | 'Completed'>;
  learningStyles: string[]; // ['Video', 'PYQs', 'Notes']
  freeOnly: 'Yes' | 'No' | 'Both';
  targetIntensity: 'Balanced' | 'Intensive' | 'Sprint';
}

export interface DailyScheduleItem {
  dayNumber: number;
  date: string; // YYYY-MM-DD
  dayOfWeek: string;
  availableHours: number;
  subjectId: string;
  subjectName: string;
  topicName: string;
  subtopicName: string;
  phaseName: string;
  conceptMins: number;
  pyqMins: number;
  practiceMins: number;
  revisionMins: number;
  videoResource?: VideoResource;
  pyqRoute: string;
  practiceRoute: string;
  completed: boolean;
  skipped: boolean;
  rescheduledFromDate?: string;
  actualHoursSpent?: number;
}

export interface GeneratedPlan {
  settings: OnboardingSettings;
  createdAt: string;
  daysRemaining: number;
  weeksRemaining: number;
  monthsRemaining: number;
  totalPlannedHours: number;
  currentPhase: string;
  items: DailyScheduleItem[];
  weakTopicsDetected: { topic: string; subjectId: string; accuracy: number }[];
}

export function generatePersonalizedPlan(settings: OnboardingSettings): GeneratedPlan {
  const today = new Date();
  const targetDate = new Date(settings.examDate);

  const diffTime = targetDate.getTime() - today.getTime();
  const daysRemaining = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const weeksRemaining = Math.max(1, Math.ceil(daysRemaining / 7));
  const monthsRemaining = Math.max(0.5, Math.round((daysRemaining / 30) * 10) / 10);

  // Day of week hours lookup map
  const dayNameMap: Record<number, keyof WeeklyAvailability> = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday'
  };

  // Flatten all CSE topics in order of priority (Weak / Not Started subjects first)
  const prioritizedSubjects = [...GATE_CSE_SUBJECTS].sort((a, b) => {
    const statusA = settings.subjectStatus[a.id] || 'Not Started';
    const statusB = settings.subjectStatus[b.id] || 'Not Started';
    const weight: Record<string, number> = { 'Weak': 1, 'Not Started': 2, 'Average': 3, 'Strong': 4, 'Completed': 5 };
    return weight[statusA] - weight[statusB];
  });

  const topicPool: { subjectId: string; subjectName: string; topicName: string; subtopic: string }[] = [];
  prioritizedSubjects.forEach((subj) => {
    subj.topics.forEach((t) => {
      topicPool.push({
        subjectId: subj.id,
        subjectName: subj.name,
        topicName: t.name,
        subtopic: t.subtopics[0] || t.name
      });
    });
  });

  let totalPlannedHours = 0;
  const items: DailyScheduleItem[] = [];
  let topicCursor = 0;

  // Generate daily schedule items for each day until exam
  for (let i = 0; i < daysRemaining; i++) {
    const itemDate = new Date(today);
    itemDate.setDate(today.getDate() + i);

    const dateStr = itemDate.toISOString().split('T')[0];
    const dayOfWeekIndex = itemDate.getDay();
    const dayKey = dayNameMap[dayOfWeekIndex];
    const dayHours = settings.weeklyHours[dayKey] ?? settings.dailyHours ?? 3;

    if (dayHours === 0) continue; // Rest day

    totalPlannedHours += dayHours;

    // Determine current phase based on remaining time percentage
    let phaseName = 'Phase 1: Concept Mastery';
    if (i > daysRemaining * 0.7) {
      phaseName = 'Phase 4: Full Mock Tests & Final Revision';
    } else if (i > daysRemaining * 0.4) {
      phaseName = 'Phase 3: PYQ Sprint & Weak Area Repair';
    } else if (i > daysRemaining * 0.2) {
      phaseName = 'Phase 2: Syllabus Completion';
    }

    const currentTopic = topicPool[topicCursor % topicPool.length];
    topicCursor++;

    // Time allocation calculation (mins)
    const totalMins = dayHours * 60;
    let conceptMins = Math.round(totalMins * 0.35);
    let pyqMins = Math.round(totalMins * 0.35);
    let practiceMins = Math.round(totalMins * 0.20);
    let revisionMins = Math.round(totalMins * 0.10);

    // Adjust for emergency/sprint modes
    if (daysRemaining <= 14) {
      phaseName = 'Final Revision & PYQ Emergency Sprint';
      conceptMins = Math.round(totalMins * 0.10);
      pyqMins = Math.round(totalMins * 0.50);
      practiceMins = Math.round(totalMins * 0.20);
      revisionMins = Math.round(totalMins * 0.20);
    }

    // Match verified video resource
    const matchingVideos = VERIFIED_VIDEO_RESOURCES.filter(v => v.subjectId === currentTopic.subjectId);
    const videoResource = matchingVideos.length > 0 ? matchingVideos[0] : undefined;

    const dayNameCapital = dayKey.charAt(0).toUpperCase() + dayKey.slice(1);

    items.push({
      dayNumber: i + 1,
      date: dateStr,
      dayOfWeek: dayNameCapital,
      availableHours: dayHours,
      subjectId: currentTopic.subjectId,
      subjectName: currentTopic.subjectName,
      topicName: currentTopic.topicName,
      subtopicName: currentTopic.subtopic,
      phaseName,
      conceptMins,
      pyqMins,
      practiceMins,
      revisionMins,
      videoResource,
      pyqRoute: `/pyqs?subject=${currentTopic.subjectId}`,
      practiceRoute: `/practice`,
      completed: false,
      skipped: false
    });
  }

  // Detect weak topics based on user inputs
  const weakTopicsDetected = Object.entries(settings.subjectStatus)
    .filter(([_, status]) => status === 'Weak' || status === 'Not Started')
    .map(([subjId, status]) => {
      const subj = GATE_CSE_SUBJECTS.find(s => s.id === subjId);
      return {
        topic: subj ? subj.topics[0]?.name || subj.name : subjId,
        subjectId: subjId,
        accuracy: status === 'Weak' ? 48 : 0
      };
    });

  return {
    settings,
    createdAt: new Date().toISOString(),
    daysRemaining,
    weeksRemaining,
    monthsRemaining,
    totalPlannedHours: Math.round(totalPlannedHours),
    currentPhase: items[0]?.phaseName || 'Phase 1: Concept Mastery',
    items,
    weakTopicsDetected
  };
}
