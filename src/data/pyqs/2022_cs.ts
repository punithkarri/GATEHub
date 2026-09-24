import { Question } from '../../types';

export const PYQS_2022_CS: Question[] = [
  {
    id: 'gate2022-cs-q18',
    questionNo: 18,
    year: 2022,
    paper: 'CS',
    subjectId: 'dbms',
    subjectName: 'Database Management Systems',
    topic: 'Transactions',
    subtopic: 'Conflict Serializability',
    type: 'MCQ',
    marks: 1,
    difficulty: 'Medium',
    questionText: 'Which graph data structure is constructed to check whether a given concurrent schedule of transactions is Conflict Serializable?',
    options: [
      { id: 'A', text: 'Precedence Graph (Serialization Graph)' },
      { id: 'B', text: 'Wait-For Graph' },
      { id: 'C', text: 'Resource Allocation Graph' },
      { id: 'D', text: 'Parse Tree Graph' }
    ],
    correctAnswer: 'A',
    explanation: 'A concurrent schedule S is Conflict Serializable if and only if its Precedence Graph (Serialization Graph) contains NO directed cycles. Wait-For Graph and Resource Allocation Graph are used for Deadlock detection.',
    conceptTested: 'Conflict Serializability theorem and Precedence Graph acyclicity condition.',
    shortcutTrick: 'Precedence graph cycle check = Conflict serializability test. Acyclic ⇒ Conflict Serializable.',
    source: 'Official GATE 2022 CS Master Paper (IIT Kharagpur)',
    officialSourceLink: 'https://gate2025.iitr.ac.in',
    tags: ['GATE 2022', 'CS', 'DBMS', 'Transactions']
  },
  {
    id: 'gate2022-cs-q32',
    questionNo: 32,
    year: 2022,
    paper: 'CS',
    subjectId: 'pds',
    subjectName: 'Programming & Data Structures',
    topic: 'Trees',
    subtopic: 'BST Inorder Traversal',
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    questionText: 'Which tree traversal order on a Binary Search Tree (BST) always produces the elements in strictly non-decreasing (sorted) order?',
    options: [
      { id: 'A', text: 'Preorder Traversal' },
      { id: 'B', text: 'Inorder Traversal' },
      { id: 'C', text: 'Postorder Traversal' },
      { id: 'D', text: 'Level Order Traversal' }
    ],
    correctAnswer: 'B',
    explanation: 'By BST property, all keys in left subtree < root key < all keys in right subtree. Inorder traversal (Left, Root, Right) processes nodes in ascending sorted sequence.',
    conceptTested: 'Binary Search Tree traversal invariants.',
    shortcutTrick: 'BST Inorder traversal = Sorted output array.',
    source: 'Official GATE 2022 CS Master Paper (IIT Kharagpur)',
    officialSourceLink: 'https://gate2025.iitr.ac.in',
    tags: ['GATE 2022', 'CS', 'Data Structures', 'BST']
  }
];
