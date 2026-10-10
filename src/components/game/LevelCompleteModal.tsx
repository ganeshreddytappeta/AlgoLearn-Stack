import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, ArrowRight, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { GameLevelConfig } from '../../types';

interface LevelCompleteModalProps {
  isOpen: boolean;
  level: GameLevelConfig;
  xpEarned: number;
  mistakes: number;
  hasNextLevel: boolean;
  pointsEarned?: number;
  deductions?: number;
  hintsUsed?: number;
  guidedSolveUsed?: boolean;
  onNextLevel: () => void;
  onReplayLevel?: () => void;
  onClose: () => void;
}

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  isOpen,
  level,
  xpEarned,
  mistakes,
  hasNextLevel,
  pointsEarned = 20,
  deductions = 0,
  hintsUsed = 0,
  guidedSolveUsed = false,
  onNextLevel,
  onClose,
}) => {
  if (!isOpen) return null;

  const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5"
        >
          {/* Trophy Header Badge */}
          <div className="w-18 h-18 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-200 dark:shadow-amber-950/60">
            <Trophy className="w-9 h-9" />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
              Level Mastered!
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-2">
              {level.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {level.subtitle}
            </p>
          </div>

          {/* Stars Rating */}
          <div className="flex items-center justify-center gap-2 py-1">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Star
                key={idx}
                className={`w-7 h-7 ${
                  idx < stars
                    ? 'text-amber-400 fill-amber-400 drop-shadow-xs'
                    : 'text-slate-200 dark:text-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Stats Box: Points Earned & Deductions */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 grid grid-cols-2 gap-4">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Points Earned
              </span>
              <span className="text-lg font-black text-indigo-600 dark:text-indigo-400 font-mono flex items-center justify-center gap-1 mt-0.5">
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                +{pointsEarned} / 20 PTS
              </span>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Accuracy
              </span>
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 block">
                {mistakes === 0 ? '100% (Flawless)' : `${Math.max(60, 100 - mistakes * 15)}%`}
              </span>
            </div>
          </div>

          {/* Deductions Breakdown (if any) */}
          {deductions > 0 && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-300 space-y-1 text-left">
              <div className="font-bold flex items-center justify-between">
                <span>Deductions Applied:</span>
                <span className="font-mono">-{deductions} PTS</span>
              </div>
              <div className="text-[11px] text-amber-700 dark:text-amber-400 space-y-0.5">
                {hintsUsed > 0 && (
                  <div>• {hintsUsed} Hint{hintsUsed > 1 ? 's' : ''} used (-{hintsUsed * 2} pts)</div>
                )}
                {guidedSolveUsed && (
                  <div>• Guided Solve used (-3 pts)</div>
                )}
                {mistakes > 0 && (
                  <div>• {mistakes} Incorrect submission{mistakes > 1 ? 's' : ''} (-{mistakes} pts)</div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 pt-2">
            {hasNextLevel ? (
              <button
                onClick={onNextLevel}
                className="w-full py-3.5 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-black uppercase tracking-wide transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>NEXT LEVEL</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs sm:text-sm font-black uppercase tracking-wide transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>FINISH ALL CHALLENGES</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Back to Game Hub
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
