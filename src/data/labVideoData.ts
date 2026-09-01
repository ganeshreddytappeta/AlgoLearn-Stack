import stackDataStructureVideo from '../Videos/Stack Data Structure.mp4';
import stackOperationsVideo from '../Videos/Stack Operations.mp4';

export interface EducationalScene {
  id: number;
  timeStart: number;
  timeEnd: number;
  title: string;
  badge: string;
  badgeColor: string;
  narration: string;
  keyConcept: string;
  type: 'concept' | 'array' | 'linkedlist' | 'stack-queue' | 'stack-lifo' | 'push' | 'peek' | 'pop' | 'overflow' | 'underflow' | 'complexity';
}

export interface LessonData {
  id: number;
  lessonNumber: string;
  title: string;
  description: string;
  chips: string[];
  filename: string;
  videoSrc?: string;
  duration: number; // in seconds
  scenes: EducationalScene[];
}

export const LESSONS_DATA: LessonData[] = [
  {
    id: 1,
    lessonNumber: 'LESSON 01',
    title: 'STACK DATA STRUCTURE',
    description: 'Learn what a Stack is, understand the LIFO principle, and see how elements are organized and accessed through the TOP.',
    chips: ['What is a Stack', 'LIFO', 'TOP', 'Stack Structure'],
    filename: 'Stack Data Structure.mp4',
    videoSrc: stackDataStructureVideo,
    duration: 50,
    scenes: [
      {
        id: 1,
        timeStart: 0,
        timeEnd: 10,
        title: 'What is a Stack?',
        badge: 'STACK: LIFO PRINCIPLE',
        badgeColor: 'text-indigo-400 bg-indigo-950/80 border-indigo-600/70',
        narration: 'A Stack is a linear data structure that operates under the LIFO (Last In, First Out) principle where additions and deletions occur at the TOP.',
        keyConcept: 'Elements are stacked vertically. The last item pushed is the first item to be popped.',
        type: 'stack-lifo',
      },
      {
        id: 2,
        timeStart: 10,
        timeEnd: 20,
        title: 'The LIFO Principle',
        badge: 'LAST IN → FIRST OUT',
        badgeColor: 'text-cyan-400 bg-cyan-950/80 border-cyan-600/70',
        narration: 'Last In, First Out means the most recently inserted item is the only one accessible. Like a stack of books or plates.',
        keyConcept: 'New items sit on top of older items. Bottom items cannot be accessed directly.',
        type: 'concept',
      },
      {
        id: 3,
        timeStart: 20,
        timeEnd: 30,
        title: 'The TOP Pointer & Container',
        badge: 'TOP POINTER: stack[TOP]',
        badgeColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-600/70',
        narration: 'The TOP pointer references the index of the uppermost element. Elements 10, 20, 30, 40 stack in sequential order.',
        keyConcept: 'TOP moves up with every push and down with every pop. Initial state is empty (TOP = -1).',
        type: 'stack-queue',
      },
      {
        id: 4,
        timeStart: 30,
        timeEnd: 40,
        title: 'Stack Organization & Ordering',
        badge: 'VERTICAL ORDER: 10 → 40',
        badgeColor: 'text-purple-400 bg-purple-950/80 border-purple-600/70',
        narration: 'Elements are ordered sequentially from BOTTOM (index 0) to TOP (index N-1), ensuring strict O(1) access time.',
        keyConcept: 'Push and Pop run in constant O(1) time without shifting remaining elements.',
        type: 'array',
      },
      {
        id: 5,
        timeStart: 40,
        timeEnd: 50,
        title: 'Applications of Stack Structure',
        badge: 'APPLICATIONS & O(1)',
        badgeColor: 'text-amber-400 bg-amber-950/80 border-amber-600/70',
        narration: 'Stacks power browser history navigation, undo/redo buffers, syntax matching, and compiler call stacks.',
        keyConcept: 'Essential linear container for recursion, expression parsing, and backtracking.',
        type: 'complexity',
      },
    ],
  },
  {
    id: 2,
    lessonNumber: 'LESSON 02',
    title: 'STACK OPERATIONS',
    description: 'Understand how a stack stores elements using the LIFO principle and learn how push, pop, peek, and other stack operations work step by step.',
    chips: ['LIFO Principle', 'Push', 'Pop', 'Peek', 'Stack Top', 'Overflow & Underflow'],
    filename: 'Stack Operations.mp4',
    videoSrc: stackOperationsVideo,
    duration: 50,
    scenes: [
      {
        id: 1,
        timeStart: 0,
        timeEnd: 10,
        title: 'Stack Anatomy & LIFO Principle',
        badge: 'LIFO: LAST IN, FIRST OUT',
        badgeColor: 'text-cyan-400 bg-cyan-950/80 border-cyan-600/70',
        narration: 'A Stack is a vertical linear structure operating under LIFO: Last In, First Out. Elements are strictly placed and removed at the TOP.',
        keyConcept: 'The TOP pointer points to the most recently added item. Base starts at index 0.',
        type: 'stack-lifo',
      },
      {
        id: 2,
        timeStart: 10,
        timeEnd: 20,
        title: 'Push Operation: Insert at TOP',
        badge: 'PUSH(40) → TOP + 1',
        badgeColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-600/70',
        narration: 'Push inserts a new element. Notice block 40 smoothly descending into the stack, incrementing the TOP pointer from index 2 to 3.',
        keyConcept: 'Step 1: Check overflow. Step 2: Increment TOP pointer. Step 3: Insert item.',
        type: 'push',
      },
      {
        id: 3,
        timeStart: 20,
        timeEnd: 30,
        title: 'Peek Operation: Inspect Top Element',
        badge: 'PEEK() = 40 (NO REMOVAL)',
        badgeColor: 'text-amber-400 bg-amber-950/80 border-amber-600/70',
        narration: 'Peek returns the value at the current TOP pointer without removing it. Block 40 illuminates while stack size remains unchanged.',
        keyConcept: 'Directly reads stack[TOP]. Read-only operation without modifying state.',
        type: 'peek',
      },
      {
        id: 4,
        timeStart: 30,
        timeEnd: 40,
        title: 'Pop Operation: Remove from TOP',
        badge: 'POP() → REMOVES 40',
        badgeColor: 'text-rose-400 bg-rose-950/80 border-rose-600/70',
        narration: 'Pop removes the uppermost element. Watch block 40 lift away from the stack, while the TOP pointer decrements back to 30.',
        keyConcept: 'Step 1: Check underflow. Step 2: Extract stack[TOP]. Step 3: Decrement TOP.',
        type: 'pop',
      },
      {
        id: 5,
        timeStart: 40,
        timeEnd: 50,
        title: 'Defensive Guards: Overflow & Underflow',
        badge: 'BOUNDARY GUARDS & O(1)',
        badgeColor: 'text-blue-400 bg-blue-950/80 border-blue-600/70',
        narration: 'Stack Overflow occurs when pushing into a full stack. Stack Underflow happens when popping an empty stack. All operations run in O(1) time.',
        keyConcept: 'Defensive checks prevent memory faults. Constant O(1) time execution.',
        type: 'overflow',
      },
    ],
  },
];
