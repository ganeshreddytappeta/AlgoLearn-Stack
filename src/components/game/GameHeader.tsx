import React from 'react';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import { GameLevelConfig, UserProgress } from '../../types';

interface GameHeaderProps {
  currentLevel: GameLevelConfig;
  allLevels: GameLevelConfig[];
  currentChallengeIndex: number;
  totalChallenges: number;
  progress: UserProgress;
  mistakes?: number;
  maxMistakes?: number;
  isLabActive?: boolean;
  onOpenLab?: () => void;
  onSelectLevel: (levelId: number) => void;
  onResetChallenge: () => void;
  onResetGame?: () => void;
  onBackToHub?: () => void;
  onOpenGuidedSolve?: () => void;
  isGuidedSolveActive?: boolean;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  currentLevel,
  allLevels,
  currentChallengeIndex,
  totalChallenges,
  progress,
  onSelectLevel,
  onResetChallenge,
  onBackToHub,
}) => {
  return (
    <div className="space-y-2.5">
      {/* Sleek Top Game Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Left: Back to Hub & Level Switcher */}
        <div className="flex items-center gap-2">
          {onBackToHub && (
            <button
              onClick={onBackToHub}
              title="Return to Game Hub"
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Game Hub</span>
            </button>
          )}

          <div className="flex items-center gap-1.5">
            <select
              value={currentLevel.id}
              onChange={(e) => {
                onSelectLevel(Number(e.target.value));
              }}
              className="font-bold text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 outline-hidden cursor-pointer"
            >
              {allLevels.map((lvl) => (
                <option key={lvl.id} value={lvl.id}>
                  Level {lvl.levelNumber || lvl.id}: {lvl.title.split(':')[1]?.trim() || lvl.title} {progress.completedGameLevels.includes(lvl.id) ? '✓' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: Round Counter & Restart Button Side-by-Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Round
            </span>
            <div className="flex items-center gap-1 font-mono font-black text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-800">
              {currentChallengeIndex + 1} / {totalChallenges}
            </div>
          </div>

          {/* Reset Current Round Button */}
          <button
            onClick={onResetChallenge}
            title="Reset Round"
            aria-label="Reset Round"
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center cursor-pointer shadow-2xs active:scale-90 shrink-0"
          >
            <RotateCcw className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          </button>
        </div>
      </div>

      {/* Subtle Segmented Progress Line */}
      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
        {Array.from({ length: totalChallenges }).map((_, idx) => {
          const isCompleted = idx < currentChallengeIndex;
          const isCurrent = idx === currentChallengeIndex;
          return (
            <div
              key={idx}
              className={`h-full flex-1 transition-all duration-300 ${
                isCompleted
                  ? 'bg-blue-600 dark:bg-blue-500'
                  : isCurrent
                  ? 'bg-blue-400 dark:bg-blue-400'
                  : 'bg-transparent'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
