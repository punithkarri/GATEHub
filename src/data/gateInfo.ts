export interface GateInfoSection {
  title: string;
  summary: string;
  officialSource: string;
  officialLink: string;
  details: { label: string; value: string }[];
}

export const GATE_OFFICIAL_SOURCE = {
  name: "GATE 2025 Official Portal (IIT Roorkee)",
  url: "https://gate2025.iitr.ac.in",
  futurePortal: "https://gate2026.iitg.ac.in"
};

export const GATE_EXAM_INFO = {
  overview: {
    title: "What is GATE?",
    description: "The Graduate Aptitude Test in Engineering (GATE) is a national-level examination conducted jointly by the Indian Institute of Science (IISc) Bangalore and seven Indian Institutes of Technology (IITs) on behalf of the National Coordination Board (NCB)-GATE, Department of Higher Education, Ministry of Education (MoE), Government of India.",
    purpose: [
      "Direct admission to Master's programs (M.Tech / M.E / M.S / Ph.D) in IITs, NITs, IIITs, and IISc with MoE scholarship (₹12,400/month stipend).",
      "Recruitment into top Public Sector Undertakings (PSUs) like IOCL, NTPC, ONGC, HPCL, BHARAT PETROLEUM, BARC, DRDO, ISRO, NIC.",
      "Admission to foreign universities like NUS (National University of Singapore), NTU, and TU Munich.",
      "Direct entry to Ph.D. programs directly after B.Tech."
    ]
  },
  eligibility: {
    title: "Eligibility Criteria",
    description: "A candidate who is currently studying in the 3rd or higher years of any undergraduate degree program OR has already completed any government-approved degree program in Engineering / Technology / Architecture / Science / Commerce / Arts is eligible.",
    keyPoints: [
      "No age limit for appearing in the GATE examination.",
      "No minimum percentage or CPI requirement to appear for GATE (individual institutes may require minimum CPI for admission).",
      "Candidates from 3rd year B.Tech/B.E/B.Sc (Research)/B.S are fully eligible to write GATE."
    ]
  },
  examPattern: {
    title: "GATE CSE Exam Pattern & Structure",
    duration: "3 Hours (180 Minutes)",
    mode: "Computer Based Test (CBT)",
    totalQuestions: 65,
    totalMarks: 100,
    sections: [
      {
        name: "General Aptitude (GA)",
        questions: "10 Questions (5 of 1-mark + 5 of 2-marks)",
        marks: "15 Marks (15% of total score)",
        topics: "Verbal Aptitude, Quantitative Aptitude, Analytical Aptitude, Spatial Aptitude"
      },
      {
        name: "Engineering Mathematics & Core CS",
        questions: "55 Questions (25 of 1-mark + 30 of 2-marks)",
        marks: "85 Marks (85% of total score)",
        topics: "Discrete Math, Linear Algebra, Calculus, Digital Logic, COA, Programming & Data Structures, Algorithms, TOC, Compiler Design, OS, DBMS, Computer Networks"
      }
    ],
    questionTypes: [
      {
        type: "Multiple Choice Questions (MCQ)",
        description: "Contains 4 options with only 1 correct choice. Negative marking applies.",
        marking: "1-mark MCQ: -1/3 mark for wrong answer. 2-mark MCQ: -2/3 mark for wrong answer."
      },
      {
        type: "Multiple Select Questions (MSQ)",
        description: "Contains 4 options where 1 or more options can be correct. NO negative marking.",
        marking: "Full marks only if ALL correct options are selected and NO incorrect options are selected. No partial credit."
      },
      {
        type: "Numerical Answer Type (NAT)",
        description: "No options provided. Answer must be entered using virtual numeric keypad. NO negative marking.",
        marking: "Answer must fall within the specified numerical range given in the official key."
      }
    ]
  },
  markingSchemeTable: [
    { type: "1-Mark MCQ", correct: "+1", incorrect: "-0.33 (-1/3)", unattempted: "0" },
    { type: "2-Mark MCQ", correct: "+2", incorrect: "-0.67 (-2/3)", unattempted: "0" },
    { type: "1-Mark MSQ / NAT", correct: "+1", incorrect: "0 (No Negative)", unattempted: "0" },
    { type: "2-Mark MSQ / NAT", correct: "+2", incorrect: "0 (No Negative)", unattempted: "0" }
  ],
  validityAndCutoffs: {
    scoreValidity: "GATE Score is valid for THREE (3) YEARS from the date of announcement of results.",
    typicalCutoffsCSE: [
      { category: "General (UR)", cutoffRange: "25.0 - 28.5 Marks", qualifyingStatus: "Top ~15-18% of candidates" },
      { category: "OBC-NCL / EWS", cutoffRange: "22.5 - 25.5 Marks", qualifyingStatus: "90% of UR cutoff" },
      { category: "SC / ST / PwD", cutoffRange: "16.5 - 19.0 Marks", qualifyingStatus: "66.6% of UR cutoff" }
    ]
  },
  opportunities: [
    { title: "M.Tech in IITs & IISc", detail: "Stipend of ₹12,400 per month. Top specializations include AI, Data Science, Systems, Cyber Security, Theoretical CS." },
    { title: "PSU Jobs (Public Sector)", detail: "Direct recruitment for Engineer Trainee / Scientist B at IOCL, NTPC, ONGC, HPCL, BARC, DRDO, NIC with starting CTC ₹12-24 LPA." },
    { title: "Direct Ph.D. After B.Tech", detail: "Prime Minister's Research Fellowship (PMRF) offers ₹70,000 to ₹80,000/month stipend in top IITs." },
    { title: "MS in Top Global Universities", detail: "NUS and NTU Singapore, TU Munich and RWTH Aachen Germany accept GATE scores for Master's admissions." }
  ]
};
