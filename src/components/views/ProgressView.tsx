import React from 'react';
import { Star } from 'lucide-react';
import { UserProgress } from '../../types';
import { getTopicPointsBreakdown } from '../../services/storage';

interface ProgressViewProps {
  progress: UserProgress;
  onResetProgress?: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ progress }) => {
  // Canonical breakdown from central storage service
  const breakdown = getTopicPointsBreakdown(progress);

  // Points per pillar
  const videoPoints = breakdown.visualizationPoints; // out of 20
  const gamePoints = breakdown.gamePoints; // out of 40
  const quizPoints = breakdown.quizPoints; // out of 40
  const totalTopicPoints = breakdown.totalTopicPoints; // out of 100

  return (
    <div className="space-y-4 pb-14 max-w-4xl mx-auto">
      {/* Overall Completion Card */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
              OVERALL COMPLETION
            </span>
            <div className="flex items-baseline gap-2.5">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                {breakdown.overallCompletionPercent}%
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                ({breakdown.completedModulesCount} of {breakdown.totalModulesCount} Modules)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800">
              Level {progress.level} Stacker
            </span>
          </div>
        </div>

        {/* Full-width High-contrast Progress Bar */}
        <div className="w-full h-3 bg-slate-900 dark:bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800/60">
          <div
            className="h-full bg-cyan-400 dark:bg-cyan-400 rounded-full transition-all duration-500"
            style={{ width: `${breakdown.overallCompletionPercent}%` }}
          />
        </div>
      </div>

      {/* Stack Topic Score Card (100 Pts Target) */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs relative overflow-hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Stack Topic Score
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
              Earn up to 100 points across Visualization (20 pts), Game challenges (40 pts), and Quiz assessment (40 pts).
            </p>
          </div>

          {/* Glowing Star Icon in Top-Right */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800/80 text-amber-500 flex items-center justify-center shrink-0 shadow-xs">
            <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-400 text-amber-500" />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-baseline gap-2">
          <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
            {totalTopicPoints}
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-400 dark:text-slate-500 font-mono">
            / 100
          </span>
          <span className="ml-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            PTS EARNED
          </span>
        </div>

        {/* Quick Pillar Points Breakdown Badges */}
        <div className="grid grid-cols-3 gap-2.5 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-mono">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Visualize</span>
            <span className="font-bold text-slate-900 dark:text-white">{videoPoints} / 20 pts</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Game</span>
            <span className="font-bold text-slate-900 dark:text-white">{gamePoints} / 40 pts</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Quiz</span>
            <span className="font-bold text-slate-900 dark:text-white">{quizPoints} / 40 pts</span>
          </div>
        </div>
      </div>
    </div>
  );
};
