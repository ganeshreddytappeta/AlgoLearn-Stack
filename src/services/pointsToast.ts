export interface PointsToastData {
  id: string;
  points: number; // e.g. -3, -2, -1, +4, +10, +20
  reason: string; // e.g. "Guided Solve Used", "Hint Used", "Incorrect Submission", "Correct Answer"
  timestamp: number;
}

type ToastListener = (toast: PointsToastData) => void;
const listeners = new Set<ToastListener>();

export const triggerPointsToast = (points: number, reason: string) => {
  if (points === 0) return; // Only notify when points are added or deducted

  const toast: PointsToastData = {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    points,
    reason,
    timestamp: Date.now(),
  };

  listeners.forEach((listener) => {
    try {
      listener(toast);
    } catch (e) {
      console.error('Error invoking points toast listener:', e);
    }
  });

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('points-toast', { detail: toast }));
  }
};

export const subscribePointsToast = (listener: ToastListener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
