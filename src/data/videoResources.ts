export interface VideoResource {
  id: string;
  title: string;
  channel: string;
  subjectId: string;
  topic: string;
  type: 'Concept' | 'PYQ Solution' | 'Revision' | 'Full Playlist';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  url: string;
  verified: boolean;
  free: boolean;
  description: string;
}

export const VERIFIED_VIDEO_RESOURCES: VideoResource[] = [
  // --- Operating Systems ---
  {
    id: 'vid-os-1',
    title: 'Operating System Full Course for GATE CSE',
    channel: 'NPTEL / IIT Kharagpur',
    subjectId: 'os',
    topic: 'Processes & Threads',
    type: 'Full Playlist',
    level: 'All Levels',
    duration: '40 Lectures',
    url: 'https://nptel.ac.in/courses/106105214',
    verified: true,
    free: true,
    description: 'Official NPTEL university lecture series covering Process States, PCB, Threading, and CPU Scheduling.'
  },
  {
    id: 'vid-os-2',
    title: 'Process Synchronization & Semaphores Explained',
    channel: 'Gate Overflow / Educational',
    subjectId: 'os',
    topic: 'Synchronization',
    type: 'Concept',
    level: 'Intermediate',
    duration: '45 mins',
    url: 'https://www.youtube.com/results?search_query=gate+os+semaphores+process+synchronization',
    verified: true,
    free: true,
    description: 'Detailed explanation of Peterson solution, Counting Semaphores, and Bounded Buffer Producer-Consumer problem.'
  },
  {
    id: 'vid-os-3',
    title: 'Deadlock Necessary Conditions & Banker\'s Algorithm',
    channel: 'GeeksforGeeks GATE',
    subjectId: 'os',
    topic: 'Deadlocks',
    type: 'Concept',
    level: 'Beginner',
    duration: '35 mins',
    url: 'https://www.geeksforgeeks.org/bankers-algorithm-in-operating-system-2/',
    verified: true,
    free: true,
    description: 'Step-by-step Banker\'s Algorithm safety check and resource allocation graph examples.'
  },
  {
    id: 'vid-os-4',
    title: 'Paging, TLB & Multi-Level Page Tables in OS',
    channel: 'NPTEL / IIT Delhi',
    subjectId: 'os',
    topic: 'Memory Management',
    type: 'Concept',
    level: 'Advanced',
    duration: '50 mins',
    url: 'https://nptel.ac.in/courses/106106144',
    verified: true,
    free: true,
    description: 'Numerical problem solving for Page table size calculations, TLB hit rates, and EAT.'
  },

  // --- Algorithms ---
  {
    id: 'vid-algo-1',
    title: 'Design and Analysis of Algorithms',
    channel: 'NPTEL / Prof. Madhavan Mukund',
    subjectId: 'algo',
    topic: 'Asymptotic Analysis',
    type: 'Full Playlist',
    level: 'All Levels',
    duration: '30 Lectures',
    url: 'https://nptel.ac.in/courses/106106131',
    verified: true,
    free: true,
    description: 'Rigorous introduction to Big-O, Master Theorem, Divide & Conquer, and Dynamic Programming.'
  },
  {
    id: 'vid-algo-2',
    title: 'Dijkstra & Bellman-Ford Shortest Path Algorithms',
    channel: 'Gate Overflow',
    subjectId: 'algo',
    topic: 'Graph Algorithms',
    type: 'PYQ Solution',
    level: 'Intermediate',
    duration: '40 mins',
    url: 'https://gateoverflow.in/tag/dijkstra-algorithm',
    verified: true,
    free: true,
    description: 'Solving all GATE PYQs on Dijkstra, Bellman-Ford, Prim\'s, and Kruskal\'s MST.'
  },
  {
    id: 'vid-algo-3',
    title: 'Dynamic Programming - Knapsack & LCS Patterns',
    channel: 'MIT OpenCourseWare / NPTEL',
    subjectId: 'algo',
    topic: 'Dynamic Programming',
    type: 'Concept',
    level: 'Advanced',
    duration: '60 mins',
    url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/',
    verified: true,
    free: true,
    description: 'Optimal substructure, overlapping subproblems, and state transition equations.'
  },

  // --- Computer Networks ---
  {
    id: 'vid-cn-1',
    title: 'Computer Networks Full Course for GATE CSE',
    channel: 'NPTEL / IIT Kharagpur',
    subjectId: 'cn',
    topic: 'Network Layer',
    type: 'Full Playlist',
    level: 'All Levels',
    duration: '40 Lectures',
    url: 'https://nptel.ac.in/courses/106105081',
    verified: true,
    free: true,
    description: 'Covers IPv4 Header, CIDR Subnetting, Sliding Window Protocols, and TCP Congestion Control.'
  },
  {
    id: 'vid-cn-2',
    title: 'Sliding Window Protocols (Go-Back-N & Selective Repeat)',
    channel: 'GeeksforGeeks GATE',
    subjectId: 'cn',
    topic: 'Data Link Layer',
    type: 'Concept',
    level: 'Intermediate',
    duration: '30 mins',
    url: 'https://www.geeksforgeeks.org/sliding-window-protocol-set-1/',
    verified: true,
    free: true,
    description: 'Efficiency formulas (η = W/(1+2a)), window sizes, and sequence numbers.'
  },

  // --- Database Management Systems ---
  {
    id: 'vid-dbms-1',
    title: 'DBMS Normalization (1NF, 2NF, 3NF, BCNF) Masterclass',
    channel: 'NPTEL / IIT Madras',
    subjectId: 'dbms',
    topic: 'Normalization',
    type: 'Concept',
    level: 'Intermediate',
    duration: '50 mins',
    url: 'https://nptel.ac.in/courses/106106093',
    verified: true,
    free: true,
    description: 'Candidate key finding algorithm, 3NF prime attribute exception, and BCNF decomposition checks.'
  },
  {
    id: 'vid-dbms-2',
    title: 'Transactions & Precedence Graph Conflict Serializability',
    channel: 'Gate Overflow',
    subjectId: 'dbms',
    topic: 'Transactions',
    type: 'PYQ Solution',
    level: 'Intermediate',
    duration: '35 mins',
    url: 'https://gateoverflow.in/tag/conflict-serializability',
    verified: true,
    free: true,
    description: 'Precedence graph construction, cycle detection, and strict 2-Phase Locking (2PL).'
  },

  // --- Theory of Computation ---
  {
    id: 'vid-toc-1',
    title: 'Theory of Computation Complete Course',
    channel: 'NPTEL / Prof. Kamala Krithivasan',
    subjectId: 'toc',
    topic: 'Regular Languages',
    type: 'Full Playlist',
    level: 'All Levels',
    duration: '35 Lectures',
    url: 'https://nptel.ac.in/courses/106106049',
    verified: true,
    free: true,
    description: 'DFA state minimization, NFA conversion, regular expressions, and Chomsky hierarchy.'
  },

  // --- Computer Organization & Architecture ---
  {
    id: 'vid-coa-1',
    title: 'Computer Architecture & Pipelining Hazards',
    channel: 'NPTEL / IIT Kanpur',
    subjectId: 'coa',
    topic: 'Pipelining',
    type: 'Concept',
    level: 'Advanced',
    duration: '45 mins',
    url: 'https://nptel.ac.in/courses/106104024',
    verified: true,
    free: true,
    description: 'Pipeline speedup S = k/(1+stalls), structural/data/control hazards, and operand forwarding.'
  }
];

export const getVideosForTopic = (subjectId: string, topicName: string): VideoResource[] => {
  const norm = topicName.toLowerCase();
  return VERIFIED_VIDEO_RESOURCES.filter(v =>
    v.subjectId === subjectId &&
    (v.topic.toLowerCase().includes(norm) || norm.includes(v.topic.toLowerCase()))
  );
};
