import React, { useState } from 'react';
import {
  TrendingUp,
  RotateCcw,
  BookOpen,
  Video,
  Gamepad2,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Circle,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEffects } from '../../services/sound';

interface ProgressViewProps {
  progress: UserProgress;
  onResetProgress: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  progress,
  onResetProgress,
}) => {
  // Navigation helper to switch views using existing DOM elements
  const navigateTo = (tab: 'theory' | 'lab' | 'game' | 'quiz') => {
    soundEffects.playClick();
    const btn = document.getElementById(`nav-${tab}`);
    if (btn) {
      btn.click();
    }
  };

  // ─── DYNAMIC METRICS FROM ACTUAL USER PROGRESS ───
  const completedTheoryCount = Math.min(12, progress.completedTheoryChapters?.length || 0);
  const completedLabsList = (progress as any).completedLabs || [];
  const completedVideosCount = Math.min(2, completedLabsList.length);
  const completedGamesCount = Math.min(6, progress.completedGameLevels?.length || 0);

  const quizAnsweredCount = progress.quizCompleted
    ? 10
    : Math.min(10, progress.quizTotalQuestionsAnswered || 0);
  const quizAccuracyPercent = progress.quizHighScore || 0;
  const quizCorrectCount = Math.round((quizAccuracyPercent / 100) * quizAnsweredCount);
  const quizIncorrectCount = Math.max(0, quizAnsweredCount - quizCorrectCount);

  // ─── OVERALL STACK MASTERY CALCULATION (Weighted) ───
  // Theory (30%), Visualize (10%), Game (35%), Quiz (25%)
  const theoryWeight = (completedTheoryCount / 12) * 30;
  const videoWeight = (completedVideosCount / 2) * 10;
  const gameWeight = (completedGamesCount / 6) * 35;
  const quizWeight = progress.quizCompleted
    ? (quizAccuracyPercent / 100) * 25
    : ((quizAnsweredCount / 10) * (quizAccuracyPercent / 100)) * 25;

  const stackMasteryPercent = Math.min(100, Math.max(0, Math.round(theoryWeight + videoWeight + gameWeight + quizWeight)));

  // ─── DYNAMIC RECOMMENDED NEXT STEP ───
  const getRecommendation = () => {
    if (completedTheoryCount === 0) {
      return {
        title: 'Start with What is a Stack?',
        description: 'Learn the basic structure of a Stack and understand how the TOP pointer works.',
        actionLabel: 'Read Chapter 01',
        tab: 'theory' as const,
      };
    }
    if (completedTheoryCount < 4) {
      return {
        title: 'Learn Stack Operations',
        description: 'Study Push, Pop, Peek, and Display to master element movement.',
        actionLabel: 'Continue Theory',
        tab: 'theory' as const,
      };
    }
    if (completedVideosCount < 2) {
      return {
        title: 'Watch Stack Videos',
        description: 'Visualize LIFO operations and pointer movement in the visual laboratory.',
        actionLabel: 'Watch Videos',
        tab: 'lab' as const,
      };
    }
    if (completedGamesCount < 6) {
      return {
        title: 'Try Stack Challenges',
        description: 'Test your understanding with interactive Stack challenges and games.',
        actionLabel: 'Play Games',
        tab: 'game' as const,
      };
    }
    if (!progress.quizCompleted) {
      return {
        title: 'Take the Stack Quiz',
        description: 'Verify your knowledge of LIFO, operations, boundary errors, and complexity.',
        actionLabel: 'Take Quiz',
        tab: 'quiz' as const,
      };
    }
    return {
      title: 'Maintain Stack Mastery',
      description: 'You have completed all core Stack activities! Keep practicing to maintain speed.',
      actionLabel: 'Review Theory',
      tab: 'theory' as const,
    };
  };

  const recommendation = getRecommendation();

  // ─── 12 THEORY CHAPTERS ───
  const theoryChapters = [
    '01. What is a Stack?',
    '02. LIFO Principle',
    '03. Stack Terminology',
    '04. Stack Operations',
    '05. Stack Algorithms',
    '06. Overflow & Underflow',
    '07. Array Implementation',
    '08. Linked List Implementation',
    '09. Complexity',
    '10. Stack Problem Solving',
    '11. Real-World Applications',
    '12. Advantages, Limitations & Summary',
  ];

  // ─── 2 VISUALIZE VIDEOS ───
  const visualizeVideos = [
    { id: 1, title: '01. Stack Data Structure' },
    { id: 2, title: '02. Stack Operations' },
  ];

  // ─── 6 GAMES ───
  const gameChallenges = [
    { id: 1, title: '01. Pop Master' },
    { id: 2, title: '02. Push Master' },
    { id: 3, title: '03. Build the Stack' },
    { id: 4, title: '04. Predict the Stack' },
    { id: 5, title: '05. Debug the Stack' },
    { id: 6, title: '06. Speed Stack' },
  ];

  const getStatusBadge = (status: 'Completed' | 'In Progress' | 'Not Started') => {
    if (status === 'Completed') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
          <CheckCircle2 className="w-3 h-3" />
          Completed
        </span>
      );
    }
    if (status === 'In Progress') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">
          <Clock className="w-3 h-3" />
          In Progress
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-md">
        <Circle className="w-2.5 h-2.5" />
        Not Started
      </span>
    );
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* ─── 1. PAGE HEADER ─── */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <TrendingUp className="w-5 h-5" />
            </span>
            STACK LEARNING PROGRESS
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track your journey through Stack concepts, operations, algorithms, implementation, problem solving, and applications.
          </p>
        </div>

        <button
          onClick={() => {
            soundEffects.playClick();
            onResetProgress();
          }}
          title="Reset Progress"
          aria-label="Reset Progress"
          className="p-2.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 dark:bg-slate-800 dark:hover:bg-red-950/50 dark:hover:text-red-400 text-slate-500 dark:text-slate-400 rounded-xl transition-colors cursor-pointer shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* ─── 2. OVERALL MASTERY CARD ─── */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              STACK MASTERY
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-mono">
                {stackMasteryPercent}%
              </span>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-full">
                Level {progress.level} Stacker
              </span>
            </div>
          </div>

          {/* Quick Pillar Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs font-mono">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Theory</span>
              <span className="font-bold text-slate-900 dark:text-white">{completedTheoryCount} / 12</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Videos</span>
              <span className="font-bold text-slate-900 dark:text-white">{completedVideosCount} / 2</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Games</span>
              <span className="font-bold text-slate-900 dark:text-white">{completedGamesCount} / 6</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Quiz</span>
              <span className="font-bold text-slate-900 dark:text-white">{quizAnsweredCount} / 10</span>
            </div>
          </div>
        </div>

        {/* Master Progress Bar */}
        <div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-500 transition-all duration-500"
              style={{ width: `${stackMasteryPercent}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
            Overall mastery is based on your completed Stack learning activities.
          </p>
        </div>
      </div>

      {/* ─── 3. RECOMMENDED NEXT STEP ─── */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-400/20">
            Recommended Next Step
          </span>
          <h3 className="text-base font-bold text-white mt-1">
            {recommendation.title}
          </h3>
          <p className="text-xs text-blue-100/80 mt-0.5">
            {recommendation.description}
          </p>
        </div>

        <button
          onClick={() => navigateTo(recommendation.tab)}
          className="px-4 py-2.5 bg-white hover:bg-blue-50 text-slate-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-center cursor-pointer shadow-sm active:scale-95 shrink-0"
        >
          <span>{recommendation.actionLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ─── 4. THE 4 CORE LEARNING AREAS (CLEAN & SCANNABLE) ─── */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Learning Areas & Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* AREA 1: THEORY (12 Chapters) */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Theory
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      12 Stack Chapters
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('theory')}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  Open <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Progress Count & Bar */}
              <div className="mt-3">
                <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 dark:text-slate-300">
                  <span>Completed</span>
                  <span className="font-bold">{completedTheoryCount} / 12</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600"
                    style={{ width: `${Math.round((completedTheoryCount / 12) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Compact Checklist */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {theoryChapters.map((ch, idx) => {
                  const chNumber = idx + 1;
                  const isDone = progress.completedTheoryChapters?.includes(chNumber);
                  const isCurrent = !isDone && (completedTheoryCount === idx);
                  const status = isDone ? 'Completed' : isCurrent ? 'In Progress' : 'Not Started';

                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <span className="text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                        {ch}
                      </span>
                      {getStatusBadge(status)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* AREA 2: VISUALIZE (2 Videos) */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Visualize
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      2 Educational Videos
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('lab')}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  Open <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Progress Count & Bar */}
              <div className="mt-3">
                <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 dark:text-slate-300">
                  <span>Completed</span>
                  <span className="font-bold">{completedVideosCount} / 2</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600"
                    style={{ width: `${Math.round((completedVideosCount / 2) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Checklist */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                {visualizeVideos.map((vid) => {
                  const isDone = completedLabsList.includes(vid.id);
                  const isCurrent = !isDone && (completedVideosCount === vid.id - 1);
                  const status = isDone ? 'Completed' : isCurrent ? 'In Progress' : 'Not Started';

                  return (
                    <div
                      key={vid.id}
                      className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <span className="text-slate-700 dark:text-slate-300">
                        {vid.title}
                      </span>
                      {getStatusBadge(status)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* AREA 3: GAME (6 Challenges) */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Game
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      6 Interactive Challenges
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('game')}
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  Play <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Progress Count & Bar */}
              <div className="mt-3">
                <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 dark:text-slate-300">
                  <span>Completed</span>
                  <span className="font-bold">{completedGamesCount} / 6</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600"
                    style={{ width: `${Math.round((completedGamesCount / 6) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Checklist */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                {gameChallenges.map((gm) => {
                  const isDone = progress.completedGameLevels?.includes(gm.id);
                  const isCurrent = !isDone && (completedGamesCount === gm.id - 1);
                  const status = isDone ? 'Completed' : isCurrent ? 'In Progress' : 'Not Started';

                  return (
                    <div
                      key={gm.id}
                      className="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <span className="text-slate-700 dark:text-slate-300">
                        {gm.title}
                      </span>
                      {getStatusBadge(status)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* AREA 4: QUIZ (10 Questions) */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Quiz
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      10 Assessment Questions
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('quiz')}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  Start <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Progress Count & Bar */}
              <div className="mt-3">
                <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 dark:text-slate-300">
                  <span>Questions Answered</span>
                  <span className="font-bold">{quizAnsweredCount} / 10</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600"
                    style={{ width: `${Math.round((quizAnsweredCount / 10) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Performance Stats */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Accuracy</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    {quizAccuracyPercent}%
                  </span>
                </div>
                <div className="bg-emerald-50/60 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Correct</span>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300 text-sm">
                    {quizCorrectCount}
                  </span>
                </div>
                <div className="bg-rose-50/60 dark:bg-rose-950/40 p-2.5 rounded-xl border border-rose-100 dark:border-rose-900/50">
                  <span className="text-[10px] text-rose-600 dark:text-rose-400 uppercase tracking-wider block">Incorrect</span>
                  <span className="font-mono font-bold text-rose-700 dark:text-rose-300 text-sm">
                    {quizIncorrectCount}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex justify-between items-center text-xs">
                <span className="text-slate-500 dark:text-slate-400">Quiz Status</span>
                {getStatusBadge(progress.quizCompleted ? 'Completed' : quizAnsweredCount > 0 ? 'In Progress' : 'Not Started')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 5. SUMMARY FOOTER ─── */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-center">
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {stackMasteryPercent === 100
            ? 'Stack mastered. Keep practicing to maintain your skills.'
            : 'You are building your Stack mastery one concept at a time.'}
        </p>
      </div>
    </div>
  );
};
