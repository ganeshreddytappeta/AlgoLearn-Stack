import React from 'react';
import {
  TrendingUp,
  Trophy,
  Star,
  Eye,
  Gamepad2,
  Brain,
} from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEffects } from '../../services/sound';
import { getTopicPointsBreakdown } from '../../services/storage';

interface ProgressViewProps {
  progress: UserProgress;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ progress }) => {
  // Navigation helper to switch views using existing DOM elements
  const navigateTo = (tab: 'lab' | 'game' | 'quiz') => {
    soundEffects.playClick();
    const btn = document.getElementById(`nav-${tab}`);
    if (btn) {
      btn.click();
    }
  };

  // Canonical breakdown from central storage service
  const breakdown = getTopicPointsBreakdown(progress);

  // Points per pillar
  const videoPoints = breakdown.visualizationPoints; // out of 20
  const gamePoints = breakdown.gamePoints; // out of 40
  const quizPoints = breakdown.quizPoints; // out of 40
  const totalTopicPoints = breakdown.totalTopicPoints; // out of 100

  // Percentages per category
  const videoPercent = Math.min(100, Math.max(0, Math.round((videoPoints / 20) * 100)));
  const gamePercent = Math.min(100, Math.max(0, Math.round((gamePoints / 40) * 100)));
  const quizPercent = Math.min(100, Math.max(0, Math.round((quizPoints / 40) * 100)));

  const categoryCards = [
    {
      id: 'visualize',
      label: 'Visualize',
      icon: Eye,
      iconContainerClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25',
      score: `${videoPoints} / 20`,
      percent: videoPercent,
      description: 'Complete visualizations & videos',
      onClick: () => navigateTo('lab'),
    },
    {
      id: 'game',
      label: 'Game',
      icon: Gamepad2,
      iconContainerClass: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/25',
      score: `${gamePoints} / 40`,
      percent: gamePercent,
      description: 'Complete game levels',
      onClick: () => navigateTo('game'),
    },
    {
      id: 'quiz',
      label: 'Quiz',
      icon: Brain,
      iconContainerClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25',
      score: `${quizPoints} / 40`,
      percent: quizPercent,
      description: 'Answer quiz questions',
      onClick: () => navigateTo('quiz'),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 font-sans text-slate-900 dark:text-white pb-24">
      {/* 1. Overall Completion Card - Exact Layout from Image */}
      <div className="bg-white dark:bg-[#0B132B]/80 border border-slate-200 dark:border-blue-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xs dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] mb-6">
        {/* Top Progress Header */}
        <div className="flex items-center gap-3.5 sm:gap-4 mb-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#9333EA] flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/25">
            <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[2.2]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Stack <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">Learning Progress</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Track your journey through Stack concepts, sequential LIFO operations, algorithm implementations, problem solving, and scoring.
            </p>
          </div>
        </div>

        {/* Overall Completion Section */}
        <div className="pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
                  OVERALL COMPLETION
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 font-mono">
                  {breakdown.completedModulesCount} of {breakdown.totalModulesCount} Modules
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Complete all learning activities to master Stack and earn 100 points.
              </p>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#2563EB] dark:text-[#3B82F6] font-sans self-end sm:self-auto">
              {breakdown.overallCompletionPercent}%
            </div>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800/80 rounded-full h-3 overflow-hidden mt-3">
            <div
              className="bg-gradient-to-r from-blue-600 via-[#2563EB] to-indigo-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${breakdown.overallCompletionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Stack Topic Score Card - Exact Layout from Image */}
      <div className="bg-white dark:bg-[#0B132B]/80 border border-slate-200 dark:border-blue-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xs dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] mb-8">
        {/* Header: Trophy + Stack Topic Score + Total Points Star Container */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#9333EA] flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/25">
              <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Stack Topic Score
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Earned points are calculated from completed, persisted activities.
              </p>
            </div>
          </div>

          {/* Right: Star Icon & Total Points Box */}
          <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-100 dark:bg-[#060B17] border border-slate-200 dark:border-blue-500/20 flex items-center justify-center shrink-0 shadow-inner">
              <Star className="w-6 h-6 sm:w-7 sm:h-7 fill-amber-400 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.7)]" />
            </div>
            <div className="text-right">
              <div className="flex items-baseline justify-end gap-1.5 leading-none font-mono">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#2563EB] dark:text-[#3B82F6] font-sans">
                  {totalTopicPoints}
                </span>
                <span className="text-lg sm:text-xl font-bold text-slate-400 dark:text-slate-400">
                  / 100
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold font-mono tracking-wider text-slate-400 dark:text-slate-500 uppercase mt-1">
                TOTAL POINTS
              </div>
            </div>
          </div>
        </div>

        {/* 3 Category Cards in 1 Row on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 mt-6">
          {categoryCards.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={cat.onClick}
                className={`bg-slate-50/80 dark:bg-[#070E1E]/80 border border-slate-200/90 dark:border-blue-500/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs transition-all duration-200 ${
                  cat.onClick ? 'cursor-pointer hover:border-blue-400 dark:hover:border-blue-500/40 hover:-translate-y-0.5' : ''
                }`}
              >
                <div>
                  {/* Top: Icon + Label + Score */}
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${cat.iconContainerClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {cat.label}
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight mt-0.5 font-sans">
                        {cat.score}
                      </div>
                    </div>
                  </div>

                  {/* Horizontal Progress Bar + Percentage */}
                  <div className="flex items-center gap-2.5 mt-4">
                    <div className="flex-1 bg-slate-200 dark:bg-slate-800/80 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#2563EB] dark:bg-[#3B82F6] h-full rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${cat.percent}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold font-mono text-[#2563EB] dark:text-[#3B82F6] shrink-0">
                      {cat.percent}%
                    </span>
                  </div>
                </div>

                {/* Bottom Description */}
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-3 pt-2">
                  {cat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressView;
