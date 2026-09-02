import React from 'react';
import {
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Pause,
  Play,
  X,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Layers,
  Sparkles,
} from 'lucide-react';
import { LiveSolverStep } from '../../services/liveGuidedSolverEngine';
import { motion, AnimatePresence } from 'motion/react';

interface LiveGuidedSolverPanelProps {
  currentStep: LiveSolverStep;
  currentStepIndex: number;
  totalSteps: number;
  isPaused: boolean;
  onTogglePause: () => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onExitGuide: () => void;
  onTryItYourself: () => void;
}

export const LiveGuidedSolverPanel: React.FC<LiveGuidedSolverPanelProps> = ({
  currentStep,
  currentStepIndex,
  totalSteps,
  isPaused,
  onTogglePause,
  onNextStep,
  onPrevStep,
  onExitGuide,
  onTryItYourself,
}) => {
  const isFinalStep = currentStep.operationType === 'FINAL' || currentStepIndex === totalSteps - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-transparent dark:from-amber-950/40 dark:via-amber-900/20 dark:to-transparent border-2 border-amber-300 dark:border-amber-700/80 rounded-2xl p-4 sm:p-5 shadow-md space-y-4 relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-400/10 dark:bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Controls Bar */}
      <div className="flex items-center justify-between gap-2 flex-wrap border-b border-amber-200/80 dark:border-amber-800/60 pb-3">
        {/* Left: Mode Badge & Step Progress */}
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
            <Lightbulb className="w-3.5 h-3.5 fill-slate-950 stroke-[2.5]" />
            <span>LIVE GUIDED SOLVE</span>
          </span>

          <span className="text-xs font-mono font-bold text-amber-900 dark:text-amber-200 bg-amber-100/80 dark:bg-amber-900/60 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-700">
            Step {currentStepIndex + 1} of {totalSteps}
          </span>
        </div>

        {/* Right: Pause / Resume & Exit Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onTogglePause}
            className="px-2.5 py-1 text-xs font-bold rounded-lg border border-amber-300 dark:border-amber-700 bg-white/80 dark:bg-slate-900/80 hover:bg-amber-50 dark:hover:bg-amber-950/60 text-amber-900 dark:text-amber-200 flex items-center gap-1 cursor-pointer transition-colors"
            title={isPaused ? 'Resume Guide' : 'Pause Guide'}
          >
            {isPaused ? (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>RESUME GUIDE</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>PAUSE GUIDE</span>
              </>
            )}
          </button>

          <button
            onClick={onExitGuide}
            className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1 cursor-pointer transition-colors"
            title="Exit Guided Solve and return to game"
          >
            <X className="w-3.5 h-3.5" />
            <span>EXIT GUIDE</span>
          </button>
        </div>
      </div>

      {/* Main Step Content Area */}
      <div className="space-y-3">
        {/* Step Title & Type Indicator */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h3 className="text-base sm:text-lg font-black text-amber-950 dark:text-amber-100 flex items-center gap-2 tracking-tight">
            {isFinalStep ? (
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                {currentStep.operationTitle}
              </span>
            ) : (
              currentStep.operationTitle
            )}
          </h3>

          {currentStep.operationType === 'PEEK' && (
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> PEEK → {currentStep.peekValue}
            </span>
          )}

          {currentStep.isFaulty && (
            <span className="px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 text-xs font-bold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> BUG DETECTED
            </span>
          )}
        </div>

        {/* Step Meaning / Rule */}
        <div className="text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-200 leading-relaxed bg-white/70 dark:bg-slate-900/60 p-3 rounded-xl border border-amber-200/80 dark:border-amber-800/60">
          <p>{currentStep.operationMeaning}</p>
          <p className="mt-1 text-slate-700 dark:text-slate-300 font-medium">
            {currentStep.actionDescription}
          </p>
        </div>

        {/* LIFO Dynamic Diagram Callout (Appears whenever POP occurs) */}
        {currentStep.lifoHighlight && (
          <div className="p-3 bg-amber-100/80 dark:bg-amber-950/60 rounded-xl border border-amber-300 dark:border-amber-700/80 flex flex-col items-center justify-center text-center space-y-1">
            <span className="text-[11px] font-black tracking-widest uppercase text-amber-800 dark:text-amber-300">
              LIFO (LAST IN, FIRST OUT)
            </span>
            <div className="flex items-center gap-3 text-xs font-mono font-extrabold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 px-3 py-1 rounded-lg border border-amber-300/80 dark:border-amber-700/80 shadow-2xs">
              <span className="text-amber-600 dark:text-amber-400">LAST IN</span>
              <span>↓</span>
              <span className="px-2 py-0.5 bg-amber-500 text-slate-950 rounded font-black">
                {currentStep.lifoHighlight.lastIn}
              </span>
              <span>↓</span>
              <span className="text-emerald-600 dark:text-emerald-400">FIRST OUT</span>
            </div>
          </div>
        )}

        {/* Final Summary Card (When Solution is Complete) */}
        {isFinalStep && currentStep.finalSummary && (
          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border-2 border-emerald-400 dark:border-emerald-600 space-y-2 shadow-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 fill-emerald-500" />
                FINAL RESULT
              </span>
              <span className="text-xs font-mono font-black px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 rounded border border-emerald-200 dark:border-emerald-800">
                TOP = {currentStep.finalSummary.finalTop !== null ? currentStep.finalSummary.finalTop : 'Empty'}
              </span>
            </div>

            <div className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
              <span className="font-bold text-slate-900 dark:text-white">Why? </span>
              {currentStep.finalSummary.whyExplanation}
            </div>

            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 pt-1">
              Now you know how to solve this problem!
            </p>
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="flex items-center justify-between gap-2 pt-1">
        {/* Previous Step (if not on step 0) */}
        <div>
          {currentStepIndex > 0 && !isFinalStep && (
            <button
              onClick={onPrevStep}
              className="px-3 py-2 text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>PREVIOUS</span>
            </button>
          )}
        </div>

        {/* Right: Next Step OR Try It Yourself */}
        <div className="flex items-center gap-2">
          {!isFinalStep ? (
            <button
              onClick={onNextStep}
              className="px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wide bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 flex items-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
            >
              <span>NEXT STEP</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          ) : (
            <button
              onClick={onTryItYourself}
              className="px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wide bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white flex items-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all animate-pulse"
            >
              <RotateCcw className="w-4 h-4 stroke-[2.5]" />
              <span>TRY IT YOURSELF</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
