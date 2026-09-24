import { Subject } from '../types';

export const GATE_CSE_SUBJECTS: Subject[] = [
  {
    id: 'em',
    code: 'MATH',
    name: 'Engineering Mathematics',
    iconName: 'Calculator',
    description: 'Discrete Math, Linear Algebra, and Calculus fundamentals essential for Computer Science.',
    marksWeightage: '13-15 Marks',
    recommendedHours: 50,
    overview: 'Engineering Mathematics forms the logical backbone of Computer Science. Discrete Math (Propositional Logic, Combinatorics, Graph Theory) alone accounts for nearly 7-9 marks every year in GATE CSE.',
    topics: [
      {
        id: 'em-1',
        name: 'Discrete Mathematics - Mathematical Logic',
        subtopics: ['Propositional Logic', 'First-Order Logic (Predicates & Quantifiers)', 'Equivalences & Rules of Inference', 'Consistency & Validity'],
        importance: 'High',
        weightageEstimate: '3-4 Marks',
        importantConcepts: ['Implication Equivalences (P -> Q = ~P v Q)', 'Quantifier Negation', 'Validity of Arguments']
      },
      {
        id: 'em-2',
        name: 'Sets, Relations & Functions',
        subtopics: ['Set Operations & Venn Diagrams', 'Equivalence Relations & Equivalence Classes', 'Partial Orders & Lattices', 'Hasse Diagrams', 'Functions (Injective, Surjective, Bijective)'],
        importance: 'High',
        weightageEstimate: '2-3 Marks',
        importantConcepts: ['Reflexive, Symmetric, Transitive Closures', 'Distributive & Complemented Lattices', 'Counting Relations']
      },
      {
        id: 'em-3',
        name: 'Combinatorics & Graph Theory',
        subtopics: ['Counting Principles & Permutations/Combinations', 'Generating Functions & Recurrence Relations', 'Connectedness, Eulerian & Hamiltonian Graphs', 'Planar Graphs (Euler Formula)', 'Graph Coloring & Chromatic Number'],
        importance: 'High',
        weightageEstimate: '4-5 Marks',
        importantConcepts: ['Handshaking Lemma (sum of deg = 2|E|)', 'Euler Planar Formula V - E + F = 2', 'Degree sequence theorem']
      },
      {
        id: 'em-4',
        name: 'Linear Algebra',
        subtopics: ['Matrices & Determinants', 'Systems of Linear Equations (AX = B)', 'Eigenvalues & Eigenvectors', 'LU Decomposition', 'Cayley-Hamilton Theorem'],
        importance: 'Medium',
        weightageEstimate: '2-3 Marks',
        importantConcepts: ['Sum of Eigenvalues = Trace', 'Product of Eigenvalues = Determinant', 'Rank of Matrix']
      },
      {
        id: 'em-5',
        name: 'Calculus & Probability',
        subtopics: ['Limits, Continuity & Differentiability', 'Maxima & Minima', 'Mean Value Theorems', 'Conditional Probability & Bayes Theorem', 'Random Variables & Distributions (Uniform, Normal, Exponential, Poisson)'],
        importance: 'Medium',
        weightageEstimate: '2-3 Marks',
        importantConcepts: ['L\'Hopital\'s Rule', 'Bayes Theorem P(A|B) = P(B|A)P(A)/P(B)', 'Variance E[X^2] - (E[X])^2']
      }
    ],
    notes: [
      'Focus heavily on Graph Theory properties (planar graphs, degree sequences, Eulerian circuits).',
      'Master Quantifier logical equivalences and negations (e.g. ~(∀x P(x)) ≡ ∃x ~P(x)).'
    ],
    formulas: [
      { title: 'Handshaking Lemma', formula: '∑ deg(v) = 2 · |E|', explanation: 'Sum of degrees of all vertices equals twice the number of edges.' },
      { title: 'Euler\'s Planar Formula', formula: 'V - E + F = 2', explanation: 'For any connected planar graph with V vertices, E edges, and F faces.' },
      { title: 'Matrix Eigenvalue Properties', formula: 'Tr(A) = ∑ λ_i ,  det(A) = ∏ λ_i', explanation: 'Trace is the sum of diagonal elements and sum of eigenvalues. Determinant is product of eigenvalues.' }
    ],
    commonMistakes: [
      'Confusing Transitive property: (a,b) and (b,c) present requires (a,c). If (b,c) is absent, condition is vacuously TRUE!',
      'Ignoring disconnected graphs when computing Euler paths.'
    ]
  },
  {
    id: 'dl',
    code: 'DL',
    name: 'Digital Logic',
    iconName: 'Cpu',
    description: 'Boolean Algebra, Combinational Circuits, Sequential Circuits, and Number Representation.',
    marksWeightage: '4-6 Marks',
    recommendedHours: 30,
    overview: 'Digital Logic provides high-scoring questions in GATE. Key areas include Karnaugh Maps, Multiplexers, Counters, and IEEE 754 Floating Point Representation.',
    topics: [
      {
        id: 'dl-1',
        name: 'Boolean Algebra & Minimization',
        subtopics: ['Logic Gates & Truth Tables', 'De Morgan\'s Laws & Canonical Forms', 'Karnaugh Maps (K-Maps) & Don\'t Cares', 'Essential Prime Implicants (EPI)'],
        importance: 'High',
        weightageEstimate: '2 Marks',
        importantConcepts: ['Prime Implicant vs Essential Prime Implicant', 'NAND/NOR Universal Gate Implementations']
      },
      {
        id: 'dl-2',
        name: 'Combinational Circuits',
        subtopics: ['Multiplexers (MUX) & Demultiplexers', 'Decoders & Encoders', 'Adders, Subtractors & Carry Look-Ahead Adders', 'ALU Design'],
        importance: 'High',
        weightageEstimate: '2 Marks',
        importantConcepts: ['Implementing Boolean functions using 2^n:1 or smaller MUX', 'Propagation delay in ripple carry vs carry lookahead']
      },
      {
        id: 'dl-3',
        name: 'Sequential Circuits & Number Systems',
        subtopics: ['Latch & Flip-Flops (SR, JK, D, T)', 'Counters (Synchronous & Asynchronous / Ripple)', 'Shift Registers', 'Fixed-point & Floating-point Number Formats (IEEE 754)'],
        importance: 'High',
        weightageEstimate: '2 Marks',
        importantConcepts: ['Mod-N counter design using flip flops', 'Setup and Hold time violations', 'IEEE 754 32-bit float layout']
      }
    ],
    formulas: [
      { title: 'IEEE 754 Single Precision', formula: 'V = (-1)^s × 1.M × 2^(E - 127)', explanation: '1 sign bit, 8 exponent bits (bias 127), 23 mantissa bits.' },
      { title: 'Mod-N Counter Flip-Flops', formula: '2^(k-1) < N ≤ 2^k', explanation: 'Minimum k flip-flops required to build a Mod-N counter.' }
    ],
    commonMistakes: [
      'Forgetting that 2\'s complement range for n bits is -2^(n-1) to +2^(n-1) - 1.',
      'Miscounting mod of cascaded ripple counters.'
    ]
  },
  {
    id: 'coa',
    code: 'COA',
    name: 'Computer Organization & Architecture',
    iconName: 'Server',
    description: 'Machine Instructions, Addressing Modes, ALU, Pipelining, Memory Hierarchy (Cache), and I/O Interface.',
    marksWeightage: '6-8 Marks',
    recommendedHours: 45,
    overview: 'COA is highly numerical. Master Cache Memory mapping (Direct, Set-Associative), Instruction Pipelining hazards, and Main Memory hierarchy calculations.',
    topics: [
      {
        id: 'coa-1',
        name: 'Instruction Pipelining & CPU Control',
        subtopics: ['Pipeline Stages & Execution Time', 'Pipeline Speedup & Efficiency', 'Hazards (Structural, Data, Control)', 'Branch Prediction & Operand Forwarding'],
        importance: 'High',
        weightageEstimate: '3 Marks',
        importantConcepts: ['Speedup S = (k + n - 1) cycles vs k * n', 'CPI calculation with stall cycles']
      },
      {
        id: 'coa-2',
        name: 'Memory Hierarchy & Cache Memory',
        subtopics: ['Direct Mapping', 'Fully Associative Mapping', 'k-Way Set Associative Mapping', 'Cache Write Policies (Write-through vs Write-back)', 'Cache Hit Rate & Average Memory Access Time (AMAT)'],
        importance: 'High',
        weightageEstimate: '3-4 Marks',
        importantConcepts: ['Tag, Index, Offset bit division', 'AMAT = T_cache + (1 - H) * T_main']
      },
      {
        id: 'coa-3',
        name: 'Machine Instructions & I/O',
        subtopics: ['Addressing Modes (Immediate, Direct, Indirect, Indexed, Register)', 'Instruction Cycle & RISC vs CISC', 'Interrupts & DMA (Direct Memory Access)'],
        importance: 'Medium',
        weightageEstimate: '2 Marks',
        importantConcepts: ['Cycle stealing vs Burst mode DMA', 'Effective address calculations']
      }
    ],
    formulas: [
      { title: 'Pipeline Speedup (Ideal)', formula: 'Speedup S = k / (1 + Stalls per instruction)', explanation: 'Ratio of non-pipelined execution time to pipelined execution time.' },
      { title: 'Average Memory Access Time (AMAT)', formula: 'AMAT = t_c + (1 - h) · t_m', explanation: 't_c is cache hit time, h is hit ratio, t_m is main memory penalty time.' }
    ],
    commonMistakes: [
      'Confusing byte addressable vs word addressable memory when calculating tag/index bits.',
      'Forgetting that cache line size (block size) dictates the offset field size.'
    ]
  },
  {
    id: 'pds',
    code: 'PDS',
    name: 'Programming & Data Structures',
    iconName: 'Code',
    description: 'C Programming syntax, Recursion, Pointers, Arrays, Stacks, Queues, Linked Lists, Trees, Binary Search Trees, Heaps, Graphs.',
    marksWeightage: '10-12 Marks',
    recommendedHours: 50,
    overview: 'Programming in C and Data Structures carries significant weight. Master pointer arithmetic, recursion tree tracing, BST operations, and Heap construction.',
    topics: [
      {
        id: 'pds-1',
        name: 'C Programming & Recursion',
        subtopics: ['Pointers & Memory Layout', 'Array Pointers & Function Pointers', 'Structures & Parameter Passing (Call by Value vs Reference)', 'Recursion & Recurrence Trees'],
        importance: 'High',
        weightageEstimate: '4-5 Marks',
        importantConcepts: ['Pointer arithmetic (`*(arr + i)`)', 'Static variable persistence across recursive calls', 'Operator precedence']
      },
      {
        id: 'pds-2',
        name: 'Linear Data Structures',
        subtopics: ['Arrays & Matrices (Row-major vs Column-major)', 'Singly, Doubly & Circular Linked Lists', 'Stacks (Evaluation of Expression, Infix/Postfix)', 'Queues (Circular Queue, Priority Queue using Heaps)'],
        importance: 'High',
        weightageEstimate: '3-4 Marks',
        importantConcepts: ['Stack operations and overflow/underflow', 'Circular queue rear and front index wrap-around formula']
      },
      {
        id: 'pds-3',
        name: 'Non-Linear Data Structures (Trees & Graphs)',
        subtopics: ['Binary Trees (Preorder, Inorder, Postorder Traversals)', 'Binary Search Trees (BST - Insert, Delete, Search)', 'AVL Trees & Rotations', 'Binary Heaps (Min-Heap, Max-Heap, Heapify)', 'Graph Representations (Adjacency Matrix & List)'],
        importance: 'High',
        weightageEstimate: '4 Marks',
        importantConcepts: ['Constructing tree from Inorder + Preorder', 'BST deletion (inorder predecessor/successor)', 'Heapify time complexity O(N)']
      }
    ],
    formulas: [
      { title: 'Row-Major Address', formula: 'Loc(A[i][j]) = Base + [i × N + j] × w', explanation: 'Address calculation for 2D array A[M][N] in row-major order.' },
      { title: 'Circular Queue Full Condition', formula: '(rear + 1) % Capacity == front', explanation: 'Condition for circular queue overflow check.' }
    ],
    commonMistakes: [
      'Assuming pre-increment `++*p` is the same as `*p++`.',
      'Forgetting that Inorder traversal of a BST ALWAYS yields sorted key sequence.'
    ]
  },
  {
    id: 'algo',
    code: 'ALGO',
    name: 'Algorithms',
    iconName: 'Activity',
    description: 'Asymptotic Analysis, Divide & Conquer, Greedy, Dynamic Programming, Graph Algorithms (Dijkstra, Bellman-Ford, Kruskal, Prim), Complexity Classes (P, NP, NP-Complete).',
    marksWeightage: '8-10 Marks',
    recommendedHours: 50,
    overview: 'Algorithms is a high-yield core CS subject. Master Master Theorem for recurrences, Minimum Spanning Trees, Dijkstra SSSP, Dynamic Programming table formulations, and NP-Completeness concepts.',
    topics: [
      {
        id: 'algo-1',
        name: 'Asymptotic Analysis & Recurrences',
        subtopics: ['Big-O, Big-Omega, Big-Theta Definitions', 'Master Theorem for Divide & Conquer Recurrences', 'Recursion Tree Method & Substitution Method', 'Sorting Algorithms (Quick, Merge, Heap, Counting Sort)'],
        importance: 'High',
        weightageEstimate: '3 Marks',
        importantConcepts: ['Master theorem cases T(n) = aT(n/b) + f(n)', 'Sorting stability & worst-case time/space bounds']
      },
      {
        id: 'algo-2',
        name: 'Greedy Algorithms & Dynamic Programming',
        subtopics: ['Fractional Knapsack & Activity Selection', 'Huffman Coding', '0/1 Knapsack & Matrix Chain Multiplication', 'Longest Common Subsequence (LCS) & Bellman-Ford'],
        importance: 'High',
        weightageEstimate: '3 Marks',
        importantConcepts: ['Optimal substructure & overlapping subproblems', 'Greedy choice property']
      },
      {
        id: 'algo-3',
        name: 'Graph Algorithms & NP-Completeness',
        subtopics: ['BFS & DFS Traversals & Applications', 'Shortest Paths (Dijkstra, Bellman-Ford, Floyd-Warshall)', 'Minimum Spanning Trees (Prim\'s & Kruskal\'s)', 'Topological Sorting & DAGs', 'P, NP, NP-Hard, NP-Complete Reductions'],
        importance: 'High',
        weightageEstimate: '3-4 Marks',
        importantConcepts: ['Dijkstra fails on negative edge weights!', 'Bellman-Ford handles negative edges and detects negative cycles in O(VE)', 'NP-Complete definition']
      }
    ],
    formulas: [
      { title: 'Master Theorem Standard Form', formula: 'T(n) = aT(n/b) + Θ(n^k log^p n)', explanation: 'Compare log_b(a) with k to determine asymptotic upper bound.' },
      { title: 'Kruskal\'s MST Time Complexity', formula: 'O(E log V) or O(E log E)', explanation: 'Sorting E edges takes O(E log E), Union-Find operations take almost O(1).' }
    ],
    commonMistakes: [
      'Applying Dijkstra on graphs with negative edge weights.',
      'Confusing NP-Hard with NP-Complete (NP-Complete MUST be in NP class).'
    ]
  },
  {
    id: 'toc',
    code: 'TOC',
    name: 'Theory of Computation',
    iconName: 'FileCode',
    description: 'Regular Languages, Finite Automata (DFA/NFA), Context-Free Grammars (CFG), Pushdown Automata (PDA), Turing Machines, Decidability, Chomsky Hierarchy.',
    marksWeightage: '7-9 Marks',
    recommendedHours: 45,
    overview: 'Theory of Computation is very formal and logical. Focus on DFA minimization, Pumping Lemma applications, Grammar equivalence, and Undecidability closure properties.',
    topics: [
      {
        id: 'toc-1',
        name: 'Regular Languages & Finite Automata',
        subtopics: ['DFA Construction & State Minimization', 'NFA to DFA Conversion (Subset Construction)', 'Regular Expressions & Regular Grammars', 'Pumping Lemma for Regular Languages', 'Closure Properties of Regular Languages'],
        importance: 'High',
        weightageEstimate: '3 Marks',
        importantConcepts: ['Myhill-Nerode Theorem for minimal DFA states', 'Regular languages closed under intersection, complement, union, reversal, Kleene star']
      },
      {
        id: 'toc-2',
        name: 'Context-Free Languages & Pushdown Automata',
        subtopics: ['Context-Free Grammars (CFG) & Ambiguity', 'Parse Trees & Normal Forms (CNF, GNF)', 'Deterministic & Non-Deterministic Pushdown Automata (DPDA vs NPDA)', 'Closure Properties of CFLs'],
        importance: 'High',
        weightageEstimate: '3 Marks',
        importantConcepts: ['CFLs NOT closed under intersection or complementation!', 'DPDA accepts deterministic CFLs (subset of CFLs)']
      },
      {
        id: 'toc-3',
        name: 'Turing Machines & Decidability',
        subtopics: ['Turing Machine Variants & Universal Turing Machine', 'Recursively Enumerable (RE) & Recursive (REC) Languages', 'Halting Problem of Turing Machine', 'Undecidability & Post Correspondence Problem (PCP)', 'Chomsky Hierarchy Table'],
        importance: 'High',
        weightageEstimate: '2-3 Marks',
        importantConcepts: ['Halting Problem is Undecidable', 'REC is closed under complement; RE is NOT closed under complement']
      }
    ],
    formulas: [
      { title: 'Chomsky Hierarchy Inclusion', formula: 'Regular ⊂ DCFL ⊂ CFL ⊂ CSL ⊂ Recursive ⊂ RE', explanation: 'Strict subset hierarchy of formal language classes.' }
    ],
    commonMistakes: [
      'Assuming Context-Free Languages are closed under intersection (They are NOT! L1 ∩ L2 may be Non-CFL).',
      'Confusing deterministic PDA with non-deterministic PDA (NPDA is strictly more powerful than DPDA).'
    ]
  },
  {
    id: 'cd',
    code: 'CD',
    name: 'Compiler Design',
    iconName: 'Terminal',
    description: 'Lexical Analysis, Parsing (LL, LR, LALR, SLR), Syntax-Directed Translation, Intermediate Code Generation, Runtime Environments, Code Optimization.',
    marksWeightage: '4-5 Marks',
    recommendedHours: 25,
    overview: 'Compiler Design questions frequently test FIRST and FOLLOW sets, Operator Precedence Parsing, LR parser state tables, and Code Optimization transformations (LCO, DCE).',
    topics: [
      {
        id: 'cd-1',
        name: 'Lexical Analysis & Parsing',
        subtopics: ['Tokens, Lexemes & Regular Expressions in Lexer', 'Top-Down Parsing (LL(1) & Recursive Descent)', 'FIRST and FOLLOW Sets Computation', 'Bottom-Up Parsing (LR(0), SLR(1), LALR(1), CLR(1))', 'Conflict Resolution (Shift-Reduce, Reduce-Reduce)'],
        importance: 'High',
        weightageEstimate: '3 Marks',
        importantConcepts: ['Computing FIRST and FOLLOW sets accurately', 'Parsing Power Hierarchy: LR(0) ⊂ SLR(1) ⊂ LALR(1) ⊂ CLR(1)']
      },
      {
        id: 'cd-2',
        name: 'Syntax-Directed Translation & Code Optimization',
        subtopics: ['Syntax-Directed Definitions (SDD - S-attributed vs L-attributed)', 'Intermediate Code (Three-Address Code & Quadruples/Triples)', 'Basic Blocks & Flow Graphs', 'Code Optimization (Loop Invariant, Dead Code Elimination, Constant Folding)'],
        importance: 'Medium',
        weightageEstimate: '2 Marks',
        importantConcepts: ['S-attributed uses only synthesized attributes (bottom-up)', 'L-attributed allows inherited attributes from left siblings/parent']
      }
    ],
    formulas: [
      { title: 'LR Parser Hierarchy', formula: 'LR(0) ⊂ SLR(1) ⊂ LALR(1) ⊂ CLR(1)', explanation: 'CLR(1) is the most powerful deterministic LR parser.' }
    ],
    commonMistakes: [
      'Including ε (epsilon) in the FOLLOW set (FOLLOW NEVER contains epsilon, only endmarker $ or terminal symbols!).',
      'Misidentifying S-attributed definition vs L-attributed definition.'
    ]
  },
  {
    id: 'os',
    code: 'OS',
    name: 'Operating Systems',
    iconName: 'Layers',
    description: 'Processes, Threads, CPU Scheduling, Inter-Process Communication, Synchronization (Semaphores), Deadlocks, Memory Management, Virtual Memory (Paging), File Systems.',
    marksWeightage: '8-10 Marks',
    recommendedHours: 45,
    overview: 'Operating Systems is core and practical. Master Process Synchronization with Semaphores, Banker\'s Algorithm for Deadlock Avoidance, Multi-level Paging, and Page Replacement Algorithms (LRU, FIFO, Optimal).',
    topics: [
      {
        id: 'os-1',
        name: 'Processes, Threads & CPU Scheduling',
        subtopics: ['Process States & PCB', 'User & Kernel Threads', 'CPU Scheduling Algorithms (FCFS, SJF, SRTF, Round Robin, Priority)', 'Turnaround Time & Waiting Time Calculations'],
        importance: 'High',
        weightageEstimate: '2-3 Marks',
        importantConcepts: ['Turnaround Time = Completion Time - Arrival Time', 'Waiting Time = Turnaround Time - Burst Time', 'SRTF minimizes average waiting time']
      },
      {
        id: 'os-2',
        name: 'Process Synchronization & Deadlocks',
        subtopics: ['Critical Section Problem & Requirements', 'Peterson\'s Solution & Hardware Locks (TestAndSet)', 'Semaphores (Counting & Binary) & Classical Problems (Producer-Consumer, Reader-Writer, Dining Philosophers)', 'Deadlock Necessary Conditions & Resource Allocation Graphs', 'Banker\'s Algorithm for Deadlock Avoidance'],
        importance: 'High',
        weightageEstimate: '3-4 Marks',
        importantConcepts: ['Semaphore P(S) decrements, V(S) increments', 'Banker\'s algorithm Need matrix = Max - Allocation', '4 Deadlock conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait']
      },
      {
        id: 'os-3',
        name: 'Memory Management & Virtual Memory',
        subtopics: ['Contiguous Allocation (First Fit, Best Fit, Worst Fit)', 'Paging & Page Tables (Single-level & Multi-level Paging)', 'TLB (Translation Lookaside Buffer) & Effective Access Time', 'Virtual Memory & Demand Paging', 'Page Replacement Algorithms (FIFO, Optimal, LRU)', 'Thrashing & Belady\'s Anomaly'],
        importance: 'High',
        weightageEstimate: '3-4 Marks',
        importantConcepts: ['Page Table Size = Number of pages * Page table entry size', 'Belady\'s Anomaly occurs in FIFO (more frames -> more page faults)', 'EAT = Hit_rate * (TLB + RAM) + (1 - Hit_rate) * (TLB + 2*RAM)']
      }
    ],
    formulas: [
      { title: 'Turnaround & Waiting Time', formula: 'TAT = CT - AT ,  WT = TAT - BT', explanation: 'CT: Completion Time, AT: Arrival Time, BT: Burst Time.' },
      { title: 'Effective Access Time with TLB', formula: 'EAT = h · (t_{tlb} + t_{m}) + (1-h) · (t_{tlb} + 2·t_{m})', explanation: 'Assuming 1-level paging where page table lookup accesses main memory.' }
    ],
    commonMistakes: [
      'Forgetting to multiply page table entry count by 2 for 2-level paging when calculating EAT without TLB.',
      'Belady\'s anomaly occurs ONLY in FIFO, never in LRU or Optimal.'
    ]
  },
  {
    id: 'dbms',
    code: 'DBMS',
    name: 'Database Management Systems',
    iconName: 'Database',
    description: 'ER-Model, Relational Model, Relational Algebra, SQL, Normalization (1NF, 2NF, 3NF, BCNF), Transactions & Concurrency Control (Serializability, 2PL), Indexing (B/B+ Trees).',
    marksWeightage: '7-9 Marks',
    recommendedHours: 40,
    overview: 'DBMS combines mathematical rigor (Relational Algebra & Normalization) with practical database concepts (SQL, B+ Trees, 2PL). Focus heavily on Functional Dependency Decomposition and Conflict Serializability.',
    topics: [
      {
        id: 'dbms-1',
        name: 'ER-Model & Relational Model / SQL',
        subtopics: ['Entity-Relationship Diagrams & Mapping to Schema', 'Relational Algebra (Select, Project, Join, Division)', 'SQL Queries (Joins, Subqueries, Group By, Having, Aggregate functions)'],
        importance: 'High',
        weightageEstimate: '2-3 Marks',
        importantConcepts: ['Relational Algebra tuple relational calculus equivalence', 'SQL HAVING vs WHERE clause filtering order']
      },
      {
        id: 'dbms-2',
        name: 'Functional Dependencies & Normalization',
        subtopics: ['Closure of Attribute Sets & Candidate Key Finding', 'Canonical Cover of FDs', 'Normal Forms: 1NF, 2NF, 3NF, BCNF', 'Lossless Join Decomposition & Dependency Preservation Check'],
        importance: 'High',
        weightageEstimate: '3 Marks',
        importantConcepts: ['Candidate key contains no redundant attributes', 'BCNF condition: X -> Y requires X to be a Super Key', '3NF allows Y to be a prime attribute even if X is not super key']
      },
      {
        id: 'dbms-3',
        name: 'Transactions, Concurrency Control & Indexing',
        subtopics: ['ACID Properties', 'Conflict & View Serializability (Precedence Graphs)', 'Two-Phase Locking (2PL, Strict 2PL, Rigorous 2PL)', 'B-Trees & B+ Trees Structure & Order Calculations'],
        importance: 'High',
        weightageEstimate: '2-3 Marks',
        importantConcepts: ['Precedence graph cycle implies NOT conflict serializable', 'Strict 2PL prevents cascading rollbacks', 'B+ Tree node capacity equation']
      }
    ],
    formulas: [
      { title: 'B+ Tree Node Order Condition', formula: 'n · P + (n - 1) · K ≤ Block Size', explanation: 'P: Pointer size, K: Key size, n: Order of B+ tree internal node.' }
    ],
    commonMistakes: [
      'Confusing Candidate Key with Super Key (All Candidate Keys are Super Keys, but not vice versa).',
      'Forgetting that B+ tree leaves store ALL data pointers while internal nodes only store search keys.'
    ]
  },
  {
    id: 'cn',
    code: 'CN',
    name: 'Computer Networks',
    iconName: 'Wifi',
    description: 'ISO/OSI & TCP/IP Stack, Data Link Layer (Framing, Flow Control, Sliding Window, CSMA/CD), Network Layer (IPv4, IPv6, Subnetting, CIDR, Routing Algorithms), Transport Layer (TCP, UDP, Congestion Control), Application Layer (DNS, HTTP, SMTP).',
    marksWeightage: '8-10 Marks',
    recommendedHours: 45,
    overview: 'Computer Networks is full of formula-driven protocol questions. Key numerical areas: Sliding Window Efficiency, CSMA/CD Backoff & Efficiency, IPv4 CIDR Subnetting, and TCP Congestion Window size changes.',
    topics: [
      {
        id: 'cn-1',
        name: 'Data Link Layer & Physical Layer',
        subtopics: ['Framing, Error Control (CRC, Hamming Code)', 'Flow Control: Stop-and-Wait, Go-Back-N (GBN), Selective Repeat (SR)', 'Sliding Window Efficiency & Throughput Equations', 'Medium Access Control: CSMA/CD & CSMA/CA', 'Ethernet Frame Format & Minimum Frame Size'],
        importance: 'High',
        weightageEstimate: '3-4 Marks',
        importantConcepts: ['Efficiency η = 1 / (1 + 2a) where a = T_p / T_t', 'Minimum frame size in CSMA/CD = 2 * T_p * Bandwidth', 'Sender window size in GBN = N, SR = 2^(k-1)']
      },
      {
        id: 'cn-2',
        name: 'Network Layer & Routing',
        subtopics: ['IPv4 Header & Fragmentation (Offset, Flags, TTL)', 'IPv4 Subnetting & CIDR Notation', 'Routing Algorithms: Distance Vector (Bellman-Ford) & Link State (Dijkstra)', 'ARP, ICMP, NAT, IPv6 Basics'],
        importance: 'High',
        weightageEstimate: '3-4 Marks',
        importantConcepts: ['Subnet mask bit manipulation & Usable IP addresses = 2^(32-n) - 2', 'Fragment Offset = Bytes / 8', 'Count-to-Infinity problem in Distance Vector']
      },
      {
        id: 'cn-3',
        name: 'Transport Layer & Application Layer',
        subtopics: ['UDP Header & Features', 'TCP 3-Way Handshake & Connection Termination', 'TCP Congestion Control (Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery)', 'Application Protocols: DNS, HTTP, SMTP, FTP'],
        importance: 'High',
        weightageEstimate: '2-3 Marks',
        importantConcepts: ['TCP Congestion window doubles during Slow Start, increases by 1 MSS per RTT in Congestion Avoidance', 'Threshold set to FlightSize / 2 on timeout']
      }
    ],
    formulas: [
      { title: 'Sliding Window Efficiency', formula: 'η = W / (1 + 2a)  where  a = t_{prop} / t_{trans}', explanation: 'W is window size. Optimal W = 1 + 2a for 100% link utilization.' },
      { title: 'CSMA/CD Minimum Frame Size', formula: 'L_{min} = 2 · t_{prop} · Bandwidth', explanation: 'To detect collision before frame transmission finishes.' }
    ],
    commonMistakes: [
      'Forgetting to subtract 2 (Network ID & Broadcast Address) when calculating usable host IPs in a CIDR subnet.',
      'Miscalculating Fragment Offset (it MUST be multiplied by 8 to get byte position).'
    ]
  },
  {
    id: 'ga',
    code: 'GA',
    name: 'General Aptitude',
    iconName: 'Globe',
    description: 'Verbal Ability, Quantitative Aptitude, Analytical Aptitude, Spatial Aptitude.',
    marksWeightage: '15 Marks (Fixed)',
    recommendedHours: 35,
    overview: 'General Aptitude is a guaranteed 15 marks section present in all GATE papers. Solid preparation in English Grammar, Percentages, Probability, Syllogisms, and Spatial rotation guarantees 12+ marks out of 15.',
    topics: [
      {
        id: 'ga-1',
        name: 'Quantitative Aptitude',
        subtopics: ['Data Interpretation & Charts', 'Percentages, Profit & Loss, Ratios', 'Time & Work, Speed & Distance', 'Permutations, Combinations & Probability', 'Geometry, Mensuration & Elementary Algebra'],
        importance: 'High',
        weightageEstimate: '6-7 Marks',
        importantConcepts: ['Work = Efficiency * Time', 'Relative speed formula', 'Venn diagram counting']
      },
      {
        id: 'ga-2',
        name: 'Analytical & Spatial Aptitude',
        subtopics: ['Logical Deduction & Syllogisms', 'Number Series & Pattern Recognition', 'Shape Transformation, Rotation, Mirroring, Folding', 'Paper Cutting & 3D Projections'],
        importance: 'High',
        weightageEstimate: '4-5 Marks',
        importantConcepts: ['Spatial symmetry & mental rotation', 'Logical implication rules']
      },
      {
        id: 'ga-3',
        name: 'Verbal Aptitude',
        subtopics: ['English Grammar & Tenses', 'Vocabulary & Word Pairs', 'Sentence Completion & Cloze Test', 'Reading Comprehension & Critical Reasoning'],
        importance: 'High',
        weightageEstimate: '4 Marks',
        importantConcepts: ['Subject-verb agreement', 'Parallel structure in English grammar']
      }
    ],
    formulas: [
      { title: 'Time and Work Relation', formula: 'Work = Rate × Time', explanation: 'If A does job in X days and B in Y days, combined time = (X·Y)/(X+Y).' }
    ],
    commonMistakes: [
      'Rushing through Verbal Reading Comprehension questions without verifying context.',
      'Confusing spatial rotation with mirror reflections.'
    ]
  }
];
