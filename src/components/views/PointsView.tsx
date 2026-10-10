import React from 'react';
import {
  Award,
  BookOpen,
  HelpCircle,
  Sparkles,
  Gamepad2,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  AlertTriangle,
  Lightbulb,
  Zap,
} from 'lucide-react';
import { TabType, UserProgress } from '../../types';
import { calculateTotalPoints } from '../../services/pointsEngine';
import { soundEffects } from '../../services/sound';

interface PointsViewProps {
  progress: UserProgress;
  onNavigateTab?: (tab: TabType) => void;
}

export const PointsView: React.FC<PointsViewProps> = ({
  progress,
  onNavigateTab,
}) => {
  const summary = calculateTotalPoints(progress);

  const handleNavigate = (tab: TabType) => {
    soundEffects.playClick();
    if (onNavigateTab) {
      onNavigateTab(tab);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto animate-in fade-in duration-200">
      {/* ========================================================================= */}
      {/* A. OVERALL SCORE HERO CARD */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/10 to-indigo-500/0 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800/80 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Curriculum Points System</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Points Dashboard
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              Track your verified academic score across Theory (36), Quiz (20), Visualizations (4), and Game Levels (40).
            </p>
          </div>

          {/* Big Score Box */}
          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-700/80 shrink-0 text-center md:text-right min-w-[240px]">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              Overall Curriculum Score
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-slate-900 dark:text-white tracking-tight">
              <span className="text-amber-600 dark:text-amber-400">{summary.totalPoints}</span>
              <span className="text-slate-400 dark:text-slate-500 text-xl font-medium"> / 100</span>
            </div>

            <div className="mt-3.5">
              <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 mb-1">
                <span>Total Points</span>
                <span>{summary.percentage}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500"
                  style={{ width: `${summary.percentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* B. CATEGORY-WISE BREAKDOWN (4 Category Cards) */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Category-Wise Breakdown
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Theory Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                Max 36 pts
              </span>
            </div>

            <div>
              <div className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500">
                Theory
              </div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-0.5">
                {summary.theory.points} <span className="text-xs text-slate-400 font-medium">/ 36</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {summary.theory.completedCount} / 12 modules completed (+3 pts each)
              </p>
            </div>

            <div>
              <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-3">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${(summary.theory.points / 36) * 100}%` }}
                />
              </div>

              {onNavigateTab && (
                <button
                  onClick={() => handleNavigate('theory')}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Open Theory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 2. Quiz Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                Max 20 pts
              </span>
            </div>

            <div>
              <div className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500">
                Quiz
              </div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-0.5">
                {summary.quiz.points} <span className="text-xs text-slate-400 font-medium">/ 20</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {summary.quiz.correctCount} Correct (+3) • {summary.quiz.incorrectCount} Incorrect (-1)
              </p>
            </div>

            <div>
              <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-3">
                <div
                  className="h-full rounded-full bg-purple-600 transition-all duration-300"
                  style={{ width: `${(summary.quiz.points / 20) * 100}%` }}
                />
              </div>

              {onNavigateTab && (
                <button
                  onClick={() => handleNavigate('quiz')}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Open Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 3. Visualizations Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                Max 4 pts
              </span>
            </div>

            <div>
              <div className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500">
                Visualizations
              </div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-0.5">
                {summary.visualizations.points} <span className="text-xs text-slate-400 font-medium">/ 4</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {summary.visualizations.completedCount} / 2 modules completed (+2 pts each)
              </p>
            </div>

            <div>
              <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-3">
                <div
                  className="h-full rounded-full bg-emerald-600 transition-all duration-300"
                  style={{ width: `${(summary.visualizations.points / 4) * 100}%` }}
                />
              </div>

              {onNavigateTab && (
                <button
                  onClick={() => handleNavigate('lab')}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Open Visualize</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 4. Game Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-900 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                Max 40 pts
              </span>
            </div>

            <div>
              <div className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500">
                Game
              </div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-0.5">
                {summary.game.points} <span className="text-xs text-slate-400 font-medium">/ 40</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                L1: {summary.game.level1.finalScore}/20 • L2: {summary.game.level2.finalScore}/20
              </p>
            </div>

            <div>
              <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-3">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${(summary.game.points / 40) * 100}%` }}
                />
              </div>

              {onNavigateTab && (
                <button
                  onClick={() => handleNavigate('game')}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Open Game</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* C. THEORY PROGRESS (All 12 Modules) */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-900/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <BookOpen className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Theory Modules Progress
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                12 sequential modules • Award +3 points per completed module (Max: 36 Points)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {summary.theory.completedCount} / 12 Completed
            </span>
            <span className="text-xs font-mono font-black px-3 py-1 rounded-full bg-blue-600 text-white">
              {summary.theory.points} / 36 Pts
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {summary.theory.modules.map((mod) => (
            <div
              key={mod.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                mod.completed
                  ? 'bg-blue-50/40 dark:bg-blue-950/30 border-blue-200/80 dark:border-blue-900/50'
                  : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800'
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                    {mod.chapterNumber}
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {mod.title}
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-1.5">
                {mod.completed ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-3 h-3" />
                    +3 pts
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                    0 pts
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* D. QUIZ PROGRESS */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/70 border border-purple-200/80 dark:border-purple-900/60 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <HelpCircle className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Quiz Assessment Progress
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Correct: +3 points • Incorrect: -1 point • Final contribution capped between 0 and 20 Points
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              Contribution: {summary.quiz.points} / 20 Pts
            </span>
          </div>
        </div>

        {/* Quiz Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
              Correct Answers
            </span>
            <div className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
              {summary.quiz.correctCount}
              <span className="text-xs font-medium ml-1.5 text-slate-400">
                (+{summary.quiz.correctCount * 3} pts)
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
              Incorrect Answers
            </span>
            <div className="text-xl font-black font-mono text-rose-600 dark:text-rose-400 mt-0.5">
              {summary.quiz.incorrectCount}
              <span className="text-xs font-medium ml-1.5 text-slate-400">
                (-{summary.quiz.incorrectCount * 1} pts)
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
              Raw Quiz Score
            </span>
            <div className="text-xl font-black font-mono text-slate-900 dark:text-white mt-0.5">
              {summary.quiz.rawScore} pts
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/80">
            <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300 uppercase">
              Final Capped Contribution
            </span>
            <div className="text-xl font-black font-mono text-purple-700 dark:text-purple-300 mt-0.5">
              {summary.quiz.points} / 20
            </div>
          </div>
        </div>

        {/* 10 Questions Status List (Answers kept private, scoring state displayed) */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Question Submission Records (10 Total)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {summary.quiz.questions.map((q, idx) => (
              <div
                key={q.id}
                className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[10px] font-black flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
                    Question {q.id}
                  </span>
                </div>

                <div className="shrink-0">
                  {q.isAnswered ? (
                    q.isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3" />
                        Correct (+3 pts)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/70 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-800">
                        <XCircle className="w-3 h-3" />
                        Incorrect (-1 pt)
                      </span>
                    )
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" />
                      Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* E. VISUALIZATION PROGRESS (2 Modules) */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-900/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Visualization Modules Progress
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                2 interactive visual modules • Award +2 points per completed module (Max: 4 Points)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              {summary.visualizations.completedCount} / 2 Completed
            </span>
            <span className="text-xs font-mono font-black px-3 py-1 rounded-full bg-emerald-600 text-white">
              {summary.visualizations.points} / 4 Pts
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {summary.visualizations.modules.map((mod) => (
            <div
              key={mod.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                mod.completed
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/30 border-emerald-200/80 dark:border-emerald-900/50'
                  : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800'
              }`}
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/70 text-emerald-700 dark:text-emerald-300">
                    {mod.lessonNumber}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {mod.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {mod.id === 1 ? 'LIFO Principle & Organization' : 'Dynamic Push, Pop & Peek Simulation'}
                </p>
              </div>

              <div className="shrink-0">
                {mod.completed ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    +2 pts awarded
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5" />
                    0 / 2 pts
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* F. GAME LEVEL BREAKDOWN (Levels 1 & 2 with Penalties) */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/70 border border-amber-200/80 dark:border-amber-900/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Gamepad2 className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Game Level Breakdown & Penalties
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Formula: Max(0, 20 - (2 × Hint Uses) - (3 × Guided Solve Uses)) per level (Max: 40 Points)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black px-3 py-1 rounded-full bg-amber-500 text-white">
              Total Game: {summary.game.points} / 40 Pts
            </span>
          </div>
        </div>

        {/* Two Level Breakdown Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[summary.game.level1, summary.game.level2].map((lvl) => (
            <div
              key={lvl.levelId}
              className="rounded-2xl p-5 border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Level 0{lvl.levelNumber}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {lvl.title}
                  </h3>
                </div>

                <div>
                  {lvl.isCompleted ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      <Clock className="w-3.5 h-3.5" />
                      Incomplete
                    </span>
                  )}
                </div>
              </div>

              {/* Scoring breakdown table */}
              <div className="space-y-2 bg-white dark:bg-slate-900/80 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    Base Completion Points
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {lvl.isCompleted ? '+20' : '0 (Awarded on Completion)'} / 20 pts
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>Hint Uses ({lvl.hintUses})</span>
                  </div>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    {lvl.hintPenalty > 0 ? `-${lvl.hintPenalty} pts` : '0 pts'}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Guided Solve Uses ({lvl.guidedSolveUses})</span>
                  </div>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    {lvl.guidedSolvePenalty > 0 ? `-${lvl.guidedSolvePenalty} pts` : '0 pts'}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Total Penalties
                  </span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    {lvl.totalPenalties > 0 ? `-${lvl.totalPenalties} pts` : '0 pts'}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1.5 text-sm font-bold">
                  <span className="text-slate-900 dark:text-white">
                    Final Level {lvl.levelNumber} Score
                  </span>
                  <span className="font-mono font-black text-amber-600 dark:text-amber-400 text-base">
                    {lvl.finalScore} / 20 pts
                  </span>
                </div>
              </div>

              {!lvl.isCompleted && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-[11px] text-amber-800 dark:text-amber-300">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    Level must be fully completed to earn its base 20 points (penalties are preserved).
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
