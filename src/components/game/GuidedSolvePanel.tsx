import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lightbulb,
  ArrowRight,
  Check,
  Circle,
  AlertTriangle,
  Sparkles,
  Info,
  X,
  Layers,
  ArrowDown,
} from 'lucide-react';
import { GuidedStep } from '../../services/guidedSolveEngine';

interface GuidedSolvePanelProps {
  currentStep: GuidedStep;
  allSteps: GuidedStep[];
  stepIndex: number;
  onNextStep: () => void;
  onFinish: () => void;
  onExit: () => void;
  currentTopValue: number | string | null;
  stackSize: number;
  capacity: number;
}

export const GuidedSolvePanel: React.FC<GuidedSolvePanelProps> = ({
  currentStep,
  allSteps,
  stepIndex,
  onNextStep,
  onFinish,
  onExit,
  currentTopValue,
  stackSize,
  capacity,
}) => {
  const isLastStep = stepIndex === allSteps.length - 1;

  // Operation style theme
  const getOpBadgeStyle = (op: string, status?: string) => {
    if (status === 'overflow' || status === 'underflow' || op === 'OVERFLOW' || op === 'UNDERFLOW') {
      return 'bg-amber-500 text-white border-amber-600 shadow-amber-500/20';
    }
    switch (op) {
      case 'PUSH':
        return 'bg-blue-600 text-white border-blue-700 shadow-blue-500/20';
      case 'POP':
        return 'bg-purple-600 text-white border-purple-700 shadow-purple-500/20';
      case 'PEEK':
        return 'bg-amber-600 text-white border-amber-700 shadow-amber-500/20';
      default:
        return 'bg-indigo-600 text-white border-indigo-700 shadow-indigo-500/20';
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border-2 border-amber-400/80 dark:border-amber-500/70 shadow-lg overflow-hidden transition-all duration-200">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-amber-500/15 via-blue-500/10 to-indigo-500/15 dark:from-amber-950/40 dark:via-blue-950/30 dark:to-indigo-950/40 border-b border-amber-300/60 dark:border-amber-700/60 px-4 py-3 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
            <Lightbulb className="w-4 h-4 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-wider uppercase text-amber-900 dark:text-amber-200">
                GUIDED SOLVE
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                Interactive Walkthrough
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              The game automatically performs each operation on the real stack
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Step Indicator */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
              Step
            </span>
            <span className="text-xs font-black font-mono text-blue-600 dark:text-blue-400">
              {currentStep.stepNumber} / {currentStep.totalSteps}
            </span>
          </div>

          {/* Exit Button */}
          <button
            onClick={onExit}
            title="Exit Guided Solve"
            className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-bold">Exit</span>
          </button>
        </div>
      </div>

      {/* Operation Progress Timeline */}
      <div className="bg-slate-50 dark:bg-slate-800/60 px-4 py-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto custom-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          {allSteps.map((step, idx) => {
            const isPassed = idx < stepIndex;
            const isCurrent = idx === stepIndex;

            return (
              <div
                key={idx}
                className={`flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded-lg transition-all ${
                  isCurrent
                    ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border-2 border-amber-400 dark:border-amber-600 shadow-xs ring-2 ring-amber-400/20'
                    : isPassed
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/80'
                    : 'bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {isPassed ? (
                  <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                ) : isCurrent ? (
                  <span className="text-amber-600 dark:text-amber-400 font-extrabold">→</span>
                ) : (
                  <Circle className="w-2.5 h-2.5 text-slate-300 dark:text-slate-600" />
                )}
                <span>{step.displayLabel}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Guided Step Content */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Step Header & Target Operation */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider border shadow-xs ${getOpBadgeStyle(
                currentStep.operation,
                currentStep.statusBadge
              )}`}
            >
              {currentStep.displayLabel}
            </span>

            {/* Current TOP Pointer Tag */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
              <span className="text-[10px] uppercase tracking-wider text-slate-400">TOP:</span>
              <span className="text-blue-600 dark:text-blue-400 font-extrabold">
                {currentTopValue !== null ? currentTopValue : 'None (Empty)'}
              </span>
            </div>

            {/* Stack Size indicator */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-600 dark:text-slate-400">
              <Layers className="w-3 h-3 text-slate-400" />
              <span>{stackSize} / {capacity}</span>
            </div>
          </div>

          {currentStep.statusBadge === 'overflow' && (
            <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> OVERFLOW EXCEPTION
            </span>
          )}

          {currentStep.statusBadge === 'underflow' && (
            <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> UNDERFLOW EXCEPTION
            </span>
          )}
        </div>

        {/* 2-Part Structured Explanation: What we do & What happens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Part 1: Action Explanation */}
          <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl border border-blue-200/80 dark:border-blue-900/60 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider">
              <Info className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>1. Action & Intent</span>
            </div>
            <p className="text-xs sm:text-sm text-blue-950 dark:text-blue-100 font-medium leading-relaxed">
              {currentStep.actionExplanation}
            </p>
          </div>

          {/* Part 2: Real Result & TOP State */}
          <div className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl border border-emerald-200/80 dark:border-emerald-900/60 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>2. Real Stack Result</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-100 font-medium leading-relaxed">
              {currentStep.resultExplanation}
            </p>
          </div>
        </div>

        {/* Core Computer Science Concept Callout */}
        {currentStep.conceptNote && (
          <div className="p-3 bg-amber-50/80 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800/80 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold uppercase tracking-wide mr-1.5">Concept:</span>
              <span className="font-medium leading-relaxed">{currentStep.conceptNote}</span>
            </div>
          </div>
        )}

        {/* Action Controls: Next Step or Finish */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 flex-wrap gap-2">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Operation executed on real stack below. Click {isLastStep ? 'FINISH' : 'NEXT'} to proceed.</span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {isLastStep ? (
              <button
                id="btn-guided-finish"
                onClick={onFinish}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>FINISH →</span>
                <Sparkles className="w-4 h-4 fill-white" />
              </button>
            ) : (
              <button
                id="btn-guided-next"
                onClick={onNextStep}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>NEXT →</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
