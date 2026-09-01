import { UserProgress, Achievement } from '../types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_push',
    title: 'First Push',
    description: 'Push your very first element onto the Stack.',
    iconName: 'ArrowDownToLine',
    xpReward: 50,
    unlocked: false,
    category: 'beginner',
  },
  {
    id: 'lifo_master',
    title: 'LIFO Disciple',
    description: 'Successfully complete 5 LIFO pop operations in the Lab or Game.',
    iconName: 'Layers',
    xpReward: 75,
    unlocked: false,
    category: 'mastery',
  },
  {
    id: 'overflow_explorer',
    title: 'Boundary Tester',
    description: 'Experience Stack Overflow or Underflow state in the Lab.',
    iconName: 'AlertTriangle',
    xpReward: 60,
    unlocked: false,
    category: 'beginner',
  },
  {
    id: 'speed_demon',
    title: 'Speed Stacker',
    description: 'Complete the Level 6 Speed Stack challenge under 60 seconds.',
    iconName: 'Zap',
    xpReward: 150,
    unlocked: false,
    category: 'speed',
  },
  {
    id: 'debugger_pro',
    title: 'Debugging Pro',
    description: 'Spot and eliminate an invalid underflow operation in Level 5.',
    iconName: 'ShieldAlert',
    xpReward: 100,
    unlocked: false,
    category: 'mastery',
  },
  {
    id: 'lab_explorer',
    title: 'Lab Explorer',
    description: 'Perform 10 or more interactive Push and Pop operations in the Lab.',
    iconName: 'FlaskConical',
    xpReward: 120,
    unlocked: false,
    category: 'mastery',
  },
  {
    id: 'quiz_ace',
    title: 'Stack Master Grandmaster',
    description: 'Score 100% on the final interactive Quiz.',
    iconName: 'Award',
    xpReward: 200,
    unlocked: false,
    category: 'quiz',
  },
  {
    id: 'streak_3',
    title: 'Daily Dedication',
    description: 'Maintain a 3-day learning streak.',
    iconName: 'Flame',
    xpReward: 80,
    unlocked: false,
    category: 'beginner',
  },
];

const STORAGE_KEY = 'stack_master_user_progress_v1';

const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const getInitialProgress = (): UserProgress => {
  const today = getTodayString();
  return {
    xp: 0,
    level: 1,
    streakDays: 1,
    lastActiveDate: today,
    completedGameLevels: [],
    completedTheoryChapters: [],
    quizCompleted: false,
    quizHighScore: 0,
    quizTotalQuestionsAnswered: 0,
    totalPushes: 0,
    totalPops: 0,
    achievements: [],
    awardedEventKeys: [],
    history: [
      {
        title: 'Joined Stack Master',
        description: 'Initialized DSA Interactive Learning Environment',
        xpEarned: 0,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ],
  };
};

export const loadProgress = (): UserProgress => {
  if (typeof window === 'undefined') return getInitialProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw || raw === 'undefined' || raw === 'null' || raw.trim() === '') {
      const initial = getInitialProgress();
      saveProgress(initial);
      return initial;
    }
    
    let data: UserProgress;
    try {
      data = JSON.parse(raw);
    } catch {
      console.warn('Corrupted progress JSON found in storage, resetting to initial progress.');
      const initial = getInitialProgress();
      saveProgress(initial);
      return initial;
    }

    if (!data || typeof data !== 'object') {
      const initial = getInitialProgress();
      saveProgress(initial);
      return initial;
    }

    // Validate streak
    const today = getTodayString();
    const lastDate = data.lastActiveDate || today;

    if (lastDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastDate === yesterdayStr) {
        data.streakDays = (data.streakDays || 1) + 1;
      } else {
        data.streakDays = 1;
      }
      data.lastActiveDate = today;
      saveProgress(data);
    }

    // Ensure fields exist
    data.xp = Math.max(0, typeof data.xp === 'number' && !isNaN(data.xp) ? data.xp : 0);
    data.level = Math.floor(data.xp / 250) + 1;
    data.completedGameLevels = Array.isArray(data.completedGameLevels) ? data.completedGameLevels : [];
    data.completedTheoryChapters = Array.isArray(data.completedTheoryChapters) ? data.completedTheoryChapters : [];
    data.achievements = Array.isArray(data.achievements) ? data.achievements : [];
    data.awardedEventKeys = Array.isArray(data.awardedEventKeys) ? data.awardedEventKeys : [];
    data.history = Array.isArray(data.history) ? data.history : [];

    return data;
  } catch (e) {
    console.error('Failed to load user progress:', e);
    return getInitialProgress();
  }
};

export const saveProgress = (progress: UserProgress): void => {
  if (typeof window === 'undefined') return;
  try {
    if (!progress || typeof progress !== 'object') {
      return;
    }
    const serialized = JSON.stringify(progress);
    if (!serialized || serialized === 'undefined') {
      return;
    }
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (e) {
    console.error('Failed to save user progress:', e);
  }
};

export const awardXP = (
  current: UserProgress,
  amount: number,
  eventKey: string,
  reasonTitle: string,
  reasonDesc: string
): { updated: UserProgress; awarded: boolean } => {
  if (!eventKey || current.awardedEventKeys.includes(eventKey)) {
    return { updated: current, awarded: false };
  }

  const newXP = current.xp + amount;
  const newLevel = Math.floor(newXP / 250) + 1;
  const newAwardedKeys = [...current.awardedEventKeys, eventKey];
  const newHistory = [
    {
      title: reasonTitle,
      description: reasonDesc,
      xpEarned: amount,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    ...current.history.slice(0, 19),
  ];

  const updated: UserProgress = {
    ...current,
    xp: newXP,
    level: newLevel,
    awardedEventKeys: newAwardedKeys,
    history: newHistory,
  };

  saveProgress(updated);
  return { updated, awarded: true };
};

export const resetAllProgress = (): UserProgress => {
  const fresh = getInitialProgress();
  saveProgress(fresh);
  return fresh;
};
