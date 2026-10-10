import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { PointsToastData, subscribePointsToast } from '../../services/pointsToast';

export const PointsToast: React.FC = () => {
  const [toasts, setToasts] = useState<PointsToastData[]>([]);

  useEffect(() => {
    const unsubscribe = subscribePointsToast((newToast) => {
      setToasts((prev) => [...prev.slice(-2), newToast]);

      // Auto dismiss after 4 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 4000);
    });

    return unsubscribe;
  }, []);

  const handleDismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed bottom-24 right-4 sm:bottom-28 sm:right-8 z-50 flex flex-col items-end gap-2.5 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isDeduction = toast.points < 0;
          const pointsFormatted = isDeduction
            ? `${toast.points} Point${Math.abs(toast.points) === 1 ? '' : 's'}`
            : `+${toast.points} Point${toast.points === 1 ? '' : 's'}`;

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className={`pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border shadow-2xl transition-all ${
                isDeduction
                  ? 'border-rose-200/90 dark:border-rose-900/80 shadow-rose-500/10'
                  : 'border-emerald-200/90 dark:border-emerald-900/80 shadow-emerald-500/10'
              }`}
              role="status"
              aria-live="polite"
            >
              {/* Status Icon */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                  isDeduction
                    ? 'bg-rose-50 dark:bg-rose-950/80 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400'
                    : 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400'
                }`}
              >
                {isDeduction ? (
                  <AlertCircle className="w-4 h-4 stroke-[2.5]" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                )}
              </div>

              {/* Message Content */}
              <div className="flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap">
                <span
                  className={`font-black tracking-tight ${
                    isDeduction
                      ? 'text-rose-600 dark:text-rose-400'
                      : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {pointsFormatted}
                </span>
                <span className="text-slate-300 dark:text-slate-600 font-normal">—</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {toast.reason}
                </span>
              </div>

              {/* Close / Dismiss Button */}
              <button
                onClick={() => handleDismiss(toast.id)}
                className="ml-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition-colors cursor-pointer shrink-0"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
