import { RevisionCard } from '../types';

export const REVISION_CARDS: RevisionCard[] = [
  {
    id: 'rev-1',
    subjectId: 'em',
    subjectName: 'Engineering Mathematics',
    topic: 'Graph Theory',
    title: 'Euler\'s Planar Graph Theorem',
    content: 'For any connected planar graph with V vertices, E edges, and F faces (regions):',
    formula: 'V - E + F = 2',
    keyTakeaway: 'Always remember to count the infinite exterior region as 1 face!',
    commonTrap: 'For disconnected graphs with k components: V - E + F = 1 + k.'
  },
  {
    id: 'rev-2',
    subjectId: 'os',
    subjectName: 'Operating Systems',
    topic: 'Memory Management',
    title: 'Multi-Level Paging Page Table Size',
    content: 'Number of entries in outer page table = 2^(outer_page_bits). Size of page table = Number of entries × Entry Size.',
    formula: 'Page Table Size = (2^(Virtual Addr Bits - Page Offset Bits)) × Entry Size',
    keyTakeaway: 'Page size = 2^(Page Offset Bits).',
    commonTrap: 'Don\'t confuse Virtual Address Space size (2^32 bytes) with Physical Memory (RAM) size (2^30 bytes).'
  },
  {
    id: 'rev-3',
    subjectId: 'cn',
    subjectName: 'Computer Networks',
    topic: 'Data Link Layer',
    title: 'Sliding Window Protocol Efficiency',
    content: 'Efficiency η is the ratio of transmission time of frame to total cycle time (Transmission + 2 × Propagation):',
    formula: 'η = W / (1 + 2a)  where  a = t_prop / t_trans',
    keyTakeaway: 'For 100% utilization, minimum window size W = 1 + 2a.',
    commonTrap: 'Remember t_trans = Packet Size / Bandwidth, and t_prop = Distance / Propagation Speed.'
  },
  {
    id: 'rev-4',
    subjectId: 'coa',
    subjectName: 'Computer Organization & Architecture',
    topic: 'Cache Memory',
    title: 'Direct vs K-Way Set Associative Mapping',
    content: 'In K-way set associative cache with C sets and block size B:',
    formula: 'Index bits = log2(Cache Capacity / (K × Block Size))',
    keyTakeaway: 'Offset bits = log2(Block Size). Tag bits = Address bits - Index bits - Offset bits.',
    commonTrap: 'When K = 1, it becomes Direct Mapped. When K = Total Lines, it becomes Fully Associative (0 index bits).'
  },
  {
    id: 'rev-5',
    subjectId: 'algo',
    subjectName: 'Algorithms',
    topic: 'Recurrences',
    title: 'Master Theorem Quick Guide',
    content: 'For T(n) = a T(n/b) + Θ(n^k log^p n):',
    formula: 'Compare log_b(a) with k:\n1. If log_b(a) > k ⇒ T(n) = Θ(n^(log_b a))\n2. If log_b(a) == k ⇒ T(n) = Θ(n^k log^(p+1) n)\n3. If log_b(a) < k ⇒ T(n) = Θ(n^k log^p n)',
    keyTakeaway: 'Check that a ≥ 1 and b > 1 before applying Master Theorem.',
    commonTrap: 'Master theorem cannot be applied if a is not constant or if f(n) is not polynomial.'
  },
  {
    id: 'rev-6',
    subjectId: 'dbms',
    subjectName: 'Database Management Systems',
    topic: 'Normalization',
    title: 'BCNF vs 3NF Rule',
    content: 'For every non-trivial Functional Dependency X → Y:',
    formula: '3NF: X is Super Key OR Y is Prime Attribute\nBCNF: X MUST be Super Key',
    keyTakeaway: '3NF preserves FDs and guarantees Lossless join. BCNF guarantees Lossless join but may NOT preserve FDs.',
    commonTrap: 'Every relation in BCNF is in 3NF, but not every 3NF relation is in BCNF.'
  }
];
