import { Question } from '../../types';

export const PYQS_2023_CS: Question[] = [
  {
    id: 'gate2023-cs-q34',
    questionNo: 34,
    year: 2023,
    paper: 'CS',
    subjectId: 'em',
    subjectName: 'Engineering Mathematics',
    topic: 'Graph Theory',
    subtopic: 'Euler Planar Graph Formula',
    type: 'NAT',
    marks: 2,
    difficulty: 'Medium',
    questionText: 'Let G be a connected planar graph with 10 vertices and 15 edges. How many faces (regions) does G have when drawn in the plane without any edge crossings? (Answer in integer)',
    options: [],
    correctAnswer: '7',
    explanation: 'By Euler\'s formula for connected planar graphs:\nV - E + F = 2\nGiven V = 10, E = 15:\n10 - 15 + F = 2  =>  F = 7.\nThe graph divides the plane into 7 regions (6 bounded faces + 1 unbounded exterior face).',
    conceptTested: 'Euler\'s Planar Graph Formula (V - E + F = 2).',
    shortcutTrick: 'F = 2 + E - V = 2 + 15 - 10 = 7.',
    source: 'Official GATE 2023 CS Master Paper (IIT Kanpur)',
    officialSourceLink: 'https://gate2025.iitr.ac.in',
    tags: ['GATE 2023', 'CS', 'Discrete Math', 'Planar Graphs', 'NAT']
  },
  {
    id: 'gate2023-cs-q40',
    questionNo: 40,
    year: 2023,
    paper: 'CS',
    subjectId: 'os',
    subjectName: 'Operating Systems',
    topic: 'CPU Scheduling',
    subtopic: 'Round Robin Scheduling',
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    questionText: 'Which CPU scheduling algorithm exhibits performance that strongly degrades to First-Come First-Served (FCFS) when the time quantum becomes extremely large?',
    options: [
      { id: 'A', text: 'Shortest Remaining Time First (SRTF)' },
      { id: 'B', text: 'Round Robin (RR)' },
      { id: 'C', text: 'Priority Scheduling' },
      { id: 'D', text: 'Multilevel Feedback Queue' }
    ],
    correctAnswer: 'B',
    explanation: 'In Round Robin scheduling, if the time quantum q is greater than or equal to the maximum process burst time, no process is preempted before completing. Thus, processes execute strictly in arrival order, making RR identical to FCFS.',
    conceptTested: 'Round Robin time quantum behavior and asymptotic degeneration to FCFS.',
    shortcutTrick: 'Large time quantum q → ∞ in Round Robin eliminates preemption → degenerates to FCFS.',
    source: 'Official GATE 2023 CS Master Paper (IIT Kanpur)',
    officialSourceLink: 'https://gate2025.iitr.ac.in',
    tags: ['GATE 2023', 'CS', 'OS', 'Scheduling']
  }
];
