import React, { useState } from 'react';
import { Lightbulb, Sparkles, Hand } from 'lucide-react';
import { GameChallenge } from '../../types';

interface QuestionCardProps {
  challenge: GameChallenge;
  onOpenGuidedSolve?: () => void;
  isGuidedSolveActive?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  challenge,
  onOpenGuidedSolve,
  isGuidedSolveActive = false,
}) => {
  const [showHint, setShowHint] = useState<boolean>(false);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs space-y-2.5">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
            {challenge.mode.toUpperCase()} MODE
          </span>

          <span className="text-[11px] font-bold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/70 px-2.5 py-0.5 rounded-md border border-sky-200/80 dark:border-sky-800/60 flex items-center gap-1 shadow-2xs">
            <Hand className="w-3 h-3 text-sky-600 dark:text-sky-400" />
            <span>HOLD & DRAG</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onOpenGuidedSolve && !isGuidedSolveActive && (
            <button
              id="btn-guided-solve"
              onClick={onOpenGuidedSolve}
              title="Automatically solve the current level step-by-step"
              className="text-xs font-black text-amber-800 dark:text-amber-200 hover:text-amber-950 dark:hover:text-white bg-gradient-to-r from-amber-100 to-amber-50 hover:from-amber-200 hover:to-amber-100 dark:from-amber-950/80 dark:to-amber-900/60 dark:hover:from-amber-900 dark:hover:to-amber-800 px-3 py-1.5 rounded-xl border border-amber-300/90 dark:border-amber-700/80 flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs active:scale-95"
            >
              <Lightbulb className="w-3.5 h-3.5 fill-amber-500 text-amber-600 dark:text-amber-400" />
              <span>GUIDED SOLVE</span>
            </button>
          )}

          {challenge.hint && (
            <button
              onClick={() => setShowHint((prev) => !prev)}
              className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Lightbulb className="w-3 h-3 text-slate-500" />
              <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
            </button>
          )}

          <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 bg-amber-50 dark:bg-amber-950/50 px-2 py-1 rounded-xl border border-amber-200 dark:border-amber-800">
            <Sparkles className="w-3 h-3 fill-amber-500" />
            +{challenge.xpReward} XP
          </span>
        </div>
      </div>

      <div>
        <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
          {challenge.question}
        </h2>
        <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
          {challenge.instruction}
        </p>
      </div>

      {showHint && challenge.hint && (
        <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-900 dark:text-amber-200 animate-in fade-in duration-150 space-y-1">
          <div className="font-bold flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Hint:</span>
          </div>
          <p>{challenge.hint.thoughtPrompt}</p>
        </div>
      )}
    </div>
  );
};
