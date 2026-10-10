import React, { useState, useRef, useEffect } from 'react';
import {
  Video,
  Play,
  CheckCircle2,
  AlertCircle,
  Upload,
  RefreshCw,
  Layers,
  ArrowDownToLine,
  ArrowUpFromLine,
  Sparkles,
  Film,
  Award,
} from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEffects } from '../../services/sound';
import { EducationalVideoPlayer } from '../lab/EducationalVideoPlayer';
import { LESSONS_DATA, LessonData } from '../../data/labVideoData';
import { triggerPointsToast } from '../../services/pointsToast';

interface LabViewProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress | ((prev: UserProgress) => UserProgress)) => void;
}

interface CustomVideoState {
  file: File | null;
  url: string | null;
  name: string;
}

export const LabView: React.FC<LabViewProps> = ({
  progress,
  onUpdateProgress,
}) => {
  // Active selected lesson (1 for DATA STRUCTURE, 2 for STACK OPERATIONS)
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1);
  const [autoPlayTrigger, setAutoPlayTrigger] = useState<number>(0);

  // Custom uploaded videos per card (optional user upload override)
  const [video1, setVideo1] = useState<CustomVideoState>({
    file: null,
    url: null,
    name: '',
  });

  const [video2, setVideo2] = useState<CustomVideoState>({
    file: null,
    url: null,
    name: '',
  });

  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Clean up object URLs on component unmount
  useEffect(() => {
    return () => {
      if (video1.url) URL.revokeObjectURL(video1.url);
      if (video2.url) URL.revokeObjectURL(video2.url);
    };
  }, [video1.url, video2.url]);

  // Handle Video 1 Upload
  const handleUpload1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (video1.url) URL.revokeObjectURL(video1.url);
      const url = URL.createObjectURL(file);
      setVideo1({
        file,
        url,
        name: file.name,
      });
      setSelectedLessonId(1);
      soundEffects.playClick();
      // Completion is awarded ONLY when video finishes playback completely
    }
  };

  // Handle Video 2 Upload
  const handleUpload2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (video2.url) URL.revokeObjectURL(video2.url);
      const url = URL.createObjectURL(file);
      setVideo2({
        file,
        url,
        name: file.name,
      });
      setSelectedLessonId(2);
      soundEffects.playClick();
      // Completion is awarded ONLY when video finishes playback completely
    }
  };

  const handleLessonWatch = (lessonId: number) => {
    soundEffects.playClick();
    setSelectedLessonId(lessonId);
    setAutoPlayTrigger(Date.now());

    // Smooth scroll to video player if not visible
    if (playerContainerRef.current) {
      playerContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Completion and points are awarded ONLY upon 100% video completion, not on watch click
  };

  // Selected Lesson object
  const activeLesson: LessonData =
    LESSONS_DATA.find((l) => l.id === selectedLessonId) || LESSONS_DATA[0];

  const currentCustomUrl = selectedLessonId === 1 ? video1.url : video2.url;
  const currentCustomName = selectedLessonId === 1 ? video1.name : video2.name;

  const isLesson1Completed = (progress.completedLabs || []).includes(1);
  const isLesson2Completed = (progress.completedLabs || []).includes(2);
  const completedVideosCount = (isLesson1Completed ? 1 : 0) + (isLesson2Completed ? 1 : 0);
  const currentVisualizationPoints = completedVideosCount * 10;

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      {/* Hidden File Inputs for Custom Video Uploads */}
      <input
        type="file"
        ref={fileInputRef1}
        onChange={handleUpload1}
        accept="video/mp4,video/webm,video/ogg,video/quicktime,video/*"
        className="hidden"
        aria-label="Upload video for Lesson 01 Stack Data Structure"
      />
      <input
        type="file"
        ref={fileInputRef2}
        onChange={handleUpload2}
        accept="video/mp4,video/webm,video/ogg,video/quicktime,video/*"
        className="hidden"
        aria-label="Upload video for Lesson 02 Stack Operations"
      />

      {/* ─── VISUALIZE SECTION HEADING ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
            VISUALIZATION
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            2 Videos • 10 Points per video • Total: 20 Points. Watch until completion to earn points.
          </p>
        </div>

        {/* Section Points Badge */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="px-3.5 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-mono font-bold text-xs flex items-center gap-1.5 shadow-2xs">
            <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>{currentVisualizationPoints} / 20 PTS</span>
          </div>
        </div>
      </div>

      {/* ─── TWO LESSON CARDS GRID ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {/* ─── LESSON CARD 01: STACK DATA STRUCTURE ─── */}
        <div
          onClick={() => handleLessonWatch(1)}
          className={`bg-white dark:bg-slate-900 rounded-3xl border p-6 sm:p-8 shadow-xs flex flex-col justify-between transition-all duration-200 cursor-pointer ${
            selectedLessonId === 1
              ? 'border-blue-500 dark:border-blue-500 ring-2 ring-blue-500/25 shadow-lg shadow-blue-500/10'
              : 'border-slate-200/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="space-y-4">
            {/* Top Row: Lesson label + Points Badge + Video Icon Container */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase tracking-wider border border-slate-200/80 dark:border-slate-700/80">
                  LESSON 01
                </span>
                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md border flex items-center gap-1 ${
                  isLesson1Completed
                    ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300/60 dark:border-emerald-800'
                    : 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                }`}>
                  {isLesson1Completed ? '✓ 10 pts Earned' : '+10 pts'}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {isLesson1Completed && (
                  <span className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-300/60 dark:border-emerald-800" title="Completed (+10 pts)">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  </span>
                )}
                <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900/50 shadow-2xs">
                  <Film className="w-4 h-4 stroke-[2.2]" />
                </div>
              </div>
            </div>

            {/* Lesson Title & Description */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight uppercase">
                STACK DATA STRUCTURE
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed font-normal">
                Learn what a Stack is, understand the LIFO principle, and see how elements are organized and accessed through the TOP.
              </p>
            </div>

            {/* Topic Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/70">
                What is a Stack
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/70">
                LIFO
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/70">
                TOP
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/70">
                Stack Structure
              </span>
            </div>
          </div>

          {/* Bottom Action Area: CLICK TO WATCH */}
          <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLessonWatch(1);
              }}
              className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99] ${
                selectedLessonId === 1
                  ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-500 hover:from-blue-800 hover:via-blue-700 hover:to-indigo-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-400/30'
                  : 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/60 dark:border-blue-800/60'
              }`}
            >
              <Play className="w-4 h-4 fill-current ml-0.5" />
              <span>WATCH LESSON 01 VIDEO</span>
            </button>
          </div>
        </div>

        {/* ─── LESSON CARD 02: STACK OPERATIONS ─── */}
        <div
          onClick={() => handleLessonWatch(2)}
          className={`bg-white dark:bg-slate-900 rounded-3xl border p-6 sm:p-8 shadow-xs flex flex-col justify-between transition-all duration-200 cursor-pointer ${
            selectedLessonId === 2
              ? 'border-blue-500 dark:border-blue-500 ring-2 ring-blue-500/25 shadow-lg shadow-blue-500/10'
              : 'border-slate-200/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="space-y-4">
            {/* Top Row: Lesson label + Points Badge + Video Icon Container */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase tracking-wider border border-slate-200/80 dark:border-slate-700/80">
                  LESSON 02
                </span>
                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md border flex items-center gap-1 ${
                  isLesson2Completed
                    ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300/60 dark:border-emerald-800'
                    : 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                }`}>
                  {isLesson2Completed ? '✓ 10 pts Earned' : '+10 pts'}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {isLesson2Completed && (
                  <span className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-300/60 dark:border-emerald-800" title="Completed (+10 pts)">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  </span>
                )}
                <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900/50 shadow-2xs">
                  <Film className="w-4 h-4 stroke-[2.2]" />
                </div>
              </div>
            </div>

            {/* Lesson Title & Description */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight uppercase">
                STACK OPERATIONS
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed font-normal">
                Understand how a stack stores elements using the LIFO principle and learn how push, pop, peek, and other stack operations work step by step.
              </p>
            </div>

            {/* Topic Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/70">
                LIFO Principle
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/70">
                Push
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/70">
                Pop
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/70">
                Peek
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/70">
                Stack Top
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/70">
                Overflow &amp; Underflow
              </span>
            </div>
          </div>

          {/* Bottom Action Area: CLICK TO WATCH */}
          <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLessonWatch(2);
              }}
              className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99] ${
                selectedLessonId === 2
                  ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-500 hover:from-blue-800 hover:via-blue-700 hover:to-indigo-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-400/30'
                  : 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/60 dark:border-blue-800/60'
              }`}
            >
              <Play className="w-4 h-4 fill-current ml-0.5" />
              <span>WATCH LESSON 02 VIDEO</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── REUSABLE INTERACTIVE VIDEO PLAYER SECTION ─── */}
      <div ref={playerContainerRef} className="space-y-4 pt-2">
        <EducationalVideoPlayer
          activeLesson={activeLesson}
          customVideoUrl={currentCustomUrl}
          customVideoName={currentCustomName}
          autoPlayTrigger={autoPlayTrigger}
          onUploadClick={() => {
            if (selectedLessonId === 1) {
              fileInputRef1.current?.click();
            } else {
              fileInputRef2.current?.click();
            }
          }}
          onLessonComplete={(completedId) => {
            if (!progress.completedLabs?.includes(completedId)) {
              soundEffects.playSuccess();
              triggerPointsToast(10, `Visualise Lesson 0${completedId} Completed`);
              onUpdateProgress((prev) => ({
                ...prev,
                completedLabs: [...(prev.completedLabs || []), completedId],
                xp: (prev.xp || 0) + 10,
              }));
            }
          }}
        />
      </div>
    </div>
  );
};
