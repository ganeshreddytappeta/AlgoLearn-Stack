export type TabType = 'home' | 'theory' | 'lab' | 'game' | 'quiz' | 'progress';

export interface StackItem {
  id: string;
  value: number | string;
  color?: string;
  isTop?: boolean;
  addedAt: number;
}

export type OperationType =
  | 'PUSH'
  | 'POP'
  | 'PEEK'
  | 'ISEMPTY'
  | 'ISFULL'
  | 'CLEAR'
  | 'SWAP'
  | 'DUP'
  | 'REVERSE'
  | 'SORT'
  | 'SEARCH'
  | 'ROTATE'
  | 'RESIZE'
  | 'BATCH_PUSH';

export interface OperationLog {
  id: string;
  operation: OperationType;
  value?: number | string;
  success: boolean;
  message: string;
  timestamp: Date;
  stackSnapshot: (number | string)[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'beginner' | 'mastery' | 'speed' | 'quiz';
}

export interface UserProgress {
  xp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string;
  completedGameLevels: number[];
  completedTheoryChapters: number[];
  quizCompleted: boolean;
  quizHighScore: number;
  quizTotalQuestionsAnswered: number;
  totalPushes: number;
  totalPops: number;
  achievements: string[]; // achievement ids
  awardedEventKeys: string[]; // prevents duplicate XP rewards
  history: {
    title: string;
    description: string;
    xpEarned: number;
    timestamp: string;
  }[];
  // 100-Point Topic Scoring fields
  completedLabs?: number[]; // video IDs [1, 2] completed (10 pts each = 20 pts max)
  gameScores?: Record<number, number>; // levelId -> points earned (20 max per game = 40 max)
  gameHintsUsed?: Record<number, number>; // levelId -> count of hints used (-2 pts each)
  gameGuidedSolveUsed?: Record<number, boolean>; // levelId -> whether guided solve was used (-3 pts)
  quizQuestionScores?: Record<number, number>; // questionId (0..9) -> points earned (+4, -2, 0)
  pointsData?: {
    quizAnswers?: Record<number, { isCorrect: boolean; selectedOption?: string | null; submittedAt?: string }>;
    gamePenalties?: Record<number, { hintCount?: number; hintEventKeys?: string[]; guidedSolveCount?: number; guidedSolveEventKeys?: string[] }>;
  };
}

export type TheoryCategoryKey = '01' | '02' | '03' | '04' | '05';

export interface TheoryLesson {
  id: number;
  chapterNumber?: string;
  categoryLabel?: string;
  categoryId?: string;
  categoryTitle?: string;
  lessonNumber?: number;
  title: string;
  shortDesc: string;
  readTime: string;
  executiveDefinition?: string;
  content: string;
  analogy?: {
    title: string;
    description: string;
    diagram?: string;
  };
  example?: {
    title: string;
    description: string;
    steps?: string[];
  };
  criticalSpecifications?: string[];
  visualDiagram?: {
    type: 'stack-ascii' | 'lifo-sequence' | 'before-after' | 'array-table' | 'linked-list' | 'brackets' | 'callstack' | 'maze' | 'browser' | 'comparison';
    beforeState?: (string | number)[];
    afterState?: (string | number)[];
    operationLabel?: string;
    notes?: string;
    diagramText?: string;
  };
  algorithmSteps?: string[];
  pseudocode?: string;
  codeSnippet?: {
    c?: string;
    cpp?: string;
    java?: string;
    python?: string;
  };
  timeComplexity?: string;
  spaceComplexity?: string;
  keyTakeaway: string;
  interactiveDemoType?:
    | 'lifo'
    | 'push-pop-sandbox'
    | 'top-pointer'
    | 'mini-operations'
    | 'algorithm-flowchart'
    | 'overflow-underflow'
    | 'array-stack'
    | 'linkedlist-stack'
    | 'complexity-table'
    | 'problem-solving'
    | 'real-world'
    | 'quick-summary'
    | 'array-vs-list'
    | 'brackets'
    | 'expression-converter'
    | 'callstack'
    | 'browser-history'
    | 'undo-redo'
    | 'practice-problems';
  practiceQuestions?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

// Backwards compatibility alias
export type TheoryChapter = TheoryLesson;

export interface TheoryCategoryMeta {
  id: TheoryCategoryKey;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  iconName: string;
  badge: string;
  lessons: TheoryLesson[];
}

export interface GameChallenge {
  id: string;
  challengeNumber: number;
  totalChallengesInLevel: number;
  mode: 'pop' | 'push' | 'build' | 'predict' | 'debug' | 'speed' | 'push_pop' | 'peek';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  instruction: string;
  initialStack: number[];
  availableElements?: number[];
  targetStack?: number[];
  targetValue?: number;
  capacity?: number;
  operationsTrace?: string[];
  debugSteps?: { id: string; text: string; isFaulty: boolean; errorType?: string; explanation: string }[];
  hint: {
    title: string;
    thoughtPrompt: string;
    clue: string;
  };
  guide: {
    ruleTitle: string;
    ruleDescription: string;
    example: string;
  };
  feedback: {
    correctTitle: string;
    correctActionText: string;
    lifoReason: string;
    incorrectTip: string;
  };
  xpReward: number;
}

export interface GameLevelConfig {
  id: number;
  levelNumber: number;
  title: string;
  subtitle: string;
  type:
    | 'lifo'
    | 'push'
    | 'pop'
    | 'peek'
    | 'status'
    | 'overflow'
    | 'underflow'
    | 'display'
    | 'sequence'
    | 'build'
    | 'predict'
    | 'debug'
    | 'speed'
    | 'master'
    | 'basic_operations';
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  xpReward: number;
  stars: number;
  hints: [string, string, string]; // 1: Concept, 2: Direction, 3: Strong
  challenges: GameChallenge[];
}

export interface QuizQuestion {
  id: number;
  type: 'multiple-choice' | 'predict-output' | 'true-false' | 'scenario' | 'drag-order';
  question: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer: string | string[]; // string for MCQ/TF, array for drag-order
  explanation: string;
  hints: [string, string, string];
}
