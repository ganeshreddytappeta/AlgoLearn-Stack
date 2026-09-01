import React from 'react';
import {
  TrendingUp,
  Sparkles,
  Flame,
  Award,
  Layers,
  BookOpen,
  FlaskConical,
  Gamepad2,
  HelpCircle,
  CheckCircle2,
  Lock,
  ArrowDownToLine,
  AlertTriangle,
  Zap,
  ShieldAlert,
  RotateCcw,
} from 'lucide-react';
import { UserProgress, Achievement } from '../../types';
import { INITIAL_ACHIEVEMENTS } from '../../services/storage';
import { THEORY_LESSONS } from '../../data/theoryData';
import { soundEffects } from '../../services/sound';

interface ProgressViewProps {
  progress: UserProgress;
  onResetProgress: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  progress,
  onResetProgress,
}) => {
  const nextLevelXP = progress.level * 250;
  const currentBaseXP = (progress.level - 1) * 250;
  const xpInLevel = progress.xp - currentBaseXP;
  const xpPercent = Math.min(100, Math.max(0, Math.round((xpInLevel / 250) * 100)));

  const totalModules = THEORY_LESSONS.length + 6 + 1;
  const completedModules = (progress.completedTheoryChapters?.length || 0) + progress.completedGameLevels.length + (progress.quizCompleted ? 1 : 0);
  const overallPercentage = Math.min(100, Math.round((completedModules / totalModules) * 100));

  const getAchievementIcon = (name: string) => {
    switch (name) {
      case 'ArrowDownToLine': return <ArrowDownToLine className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'AlertTriangle': return <AlertTriangle className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'FlaskConical': return <FlaskConical className="w-5 h-5" />;
      case 'Award': return <Award className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      default: return <Award className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              Learning Analytics & EXP Telemetry
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track your mastery rank, achievements, learning streak, and activity milestones.
          </p>
        </div>

        <button
          onClick={() => {
            soundEffects.playClick();
            onResetProgress();
          }}
          title="Total Reset"
          aria-label="Total Reset"
          className="p-2.5 bg-slate-100 hover:bg-red-50 hover:text-red-700 dark:bg-slate-800 dark:hover:bg-red-950/50 dark:hover:text-red-400 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center cursor-pointer shadow-2xs active:scale-95 shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Main Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Completion */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Overall Progress</span>
            <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">{overallPercentage}%</span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{completedModules}/{totalModules} Modules</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-indigo-600 dark:bg-indigo-500" style={{ width: `${overallPercentage}%` }} />
          </div>
        </div>

        {/* Level */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Mastery Level</span>
            <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">L{progress.level}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Stacker</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-purple-600 dark:bg-purple-500" style={{ width: `${xpPercent}%` }} />
          </div>
        </div>

        {/* Total XP */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total EXP</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">{progress.xp}</span>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-bold">XP</span>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
            {250 - xpInLevel} XP until Level {progress.level + 1}
          </p>
        </div>

        {/* Daily Streak */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Daily Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">{progress.streakDays}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Days Active</span>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
            Keep practicing daily to grow your streak!
          </p>
        </div>
      </div>

      {/* Achievement Badges Section */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Achievement Badges & Milestones
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Unlock badges by mastering DSA operations, challenges, and quizzes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INITIAL_ACHIEVEMENTS.map((badge) => {
            const isUnlocked = progress.awardedEventKeys.some((k) =>
              (badge.id === 'first_push' && k === 'first_push_award') ||
              (badge.id === 'lifo_master' && k === 'game_level_2_completed') ||
              (badge.id === 'overflow_explorer' && (k === 'lab_overflow_triggered' || k === 'lab_underflow_triggered')) ||
              (badge.id === 'speed_demon' && k === 'game_level_6_completed') ||
              (badge.id === 'debugger_pro' && k === 'game_level_5_completed') ||
              (badge.id === 'lab_explorer' && (progress.totalPushes + progress.totalPops >= 10)) ||
              (badge.id === 'quiz_ace' && progress.quizHighScore >= 75) ||
              (badge.id === 'streak_3' && progress.streakDays >= 3)
            );

            return (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-white to-indigo-50/50 dark:from-slate-900 dark:to-indigo-950/40 border-indigo-200 dark:border-indigo-800/80 shadow-xs'
                    : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isUnlocked
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {getAchievementIcon(badge.iconName)}
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isUnlocked
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {isUnlocked ? 'Unlocked' : 'Locked'}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 dark:text-slate-500 font-medium text-[11px]">Reward</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">+{badge.xpReward} XP</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historical Milestones Log */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Learning Event Timeline
        </h2>

        <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
          {progress.history.map((event, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs flex items-start justify-between gap-3"
            >
              <div>
                <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                  {event.title}
                </span>
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">
                  {event.description}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block font-mono">
                  {event.timestamp}
                </span>
              </div>

              {event.xpEarned > 0 && (
                <span className="shrink-0 text-xs font-bold px-2 py-1 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 rounded-lg">
                  +{event.xpEarned} XP
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
