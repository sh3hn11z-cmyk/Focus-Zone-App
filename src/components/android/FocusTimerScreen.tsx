import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, BookOpen, AlertOctagon, CheckCircle, Volume2, VolumeX } from 'lucide-react';
import { StudySession, UserPreferences } from '../../types';

interface FocusTimerProps {
  preferences: UserPreferences;
  onSessionComplete: (session: StudySession) => void;
  onInterruptionDetected?: (count: number) => void;
}

type TimerMode = 'study' | 'short_break' | 'long_break';

export const FocusTimerScreen: React.FC<FocusTimerProps> = ({
  preferences,
  onSessionComplete,
}) => {
  const [mode, setMode] = useState<TimerMode>('study');
  const [subject, setSubject] = useState<string>('Machine Learning');
  const [totalSeconds, setTotalSeconds] = useState<number>(preferences.preferredStudyDuration * 60);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(preferences.preferredStudyDuration * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [interruptions, setInterruptions] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(preferences.soundEnabled);
  const [sessionStartTime, setSessionStartTime] = useState<string | null>(null);
  const [completedNotice, setCompletedNotice] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Play synthetic pleasant beep using browser Web Audio API
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.7);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch {
      // AudioContext fallback
    }
  };

  // Change Timer Mode
  const switchMode = (newMode: TimerMode, customDuration?: number) => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);

    setMode(newMode);
    let durationMins = preferences.preferredStudyDuration;

    if (newMode === 'short_break') durationMins = preferences.preferredShortBreak;
    if (newMode === 'long_break') durationMins = preferences.preferredLongBreak;
    if (customDuration) durationMins = customDuration;

    setTotalSeconds(durationMins * 60);
    setSecondsRemaining(durationMins * 60);
    setCompletedNotice(false);
  };

  // Timer Tick
  useEffect(() => {
    if (isRunning) {
      if (!sessionStartTime) {
        setSessionStartTime(new Date().toISOString());
      }

      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  // Distraction Listener: Detect when user blurs or switches tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isRunning && mode === 'study') {
        setInterruptions((prev) => prev + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isRunning, mode]);

  // Session Completed Handler
  const handleComplete = () => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);

    playChime();
    setCompletedNotice(true);

    if (mode === 'study') {
      const plannedMins = Math.round(totalSeconds / 60);
      const actualMins = Math.round((totalSeconds - secondsRemaining) / 60) || plannedMins;

      const newSession: StudySession = {
        sessionId: `sess_${Date.now()}`,
        userId: 'usr_btech_ds_01',
        subject,
        plannedDuration: plannedMins,
        actualDuration: actualMins,
        interruptionCount: interruptions,
        startHour: new Date().getHours(),
        breakDuration: 5,
        previousCompletionRate: 0.88,
        studyConsistency: 0.85,
        dayOfWeek: new Date().getDay(),
        completed: true,
        startTime: sessionStartTime || new Date().toISOString(),
        endTime: new Date().toISOString(),
        distractions: [],
      };

      onSessionComplete(newSession);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsRemaining(totalSeconds);
    setInterruptions(0);
    setSessionStartTime(null);
    setCompletedNotice(false);
  };

  // Format MM:SS
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  // Progress percentage
  const progressFraction = (totalSeconds - secondsRemaining) / (totalSeconds || 1);
  const strokeDashoffset = 100 - progressFraction * 100;

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col items-center justify-between bg-[#F8F9FC]">
      {/* Top Segmented Mode Selector */}
      <div className="w-full max-w-sm flex p-1 bg-white rounded-xl border border-[#E8EAF0] shadow-xs">
        <button
          onClick={() => switchMode('study')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            mode === 'study' ? 'bg-[#8B72E8] text-white shadow-xs' : 'text-[#777D90] hover:text-[#20243A]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Study (25m)</span>
        </button>
        <button
          onClick={() => switchMode('short_break')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            mode === 'short_break' ? 'bg-[#F3F0FD] text-[#8B72E8] font-bold shadow-xs' : 'text-[#777D90] hover:text-[#20243A]'
          }`}
        >
          <Coffee className="w-3.5 h-3.5" />
          <span>Break (5m)</span>
        </button>
        <button
          onClick={() => switchMode('long_break')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            mode === 'long_break' ? 'bg-[#F3F0FD] text-[#8B72E8] font-bold shadow-xs' : 'text-[#777D90] hover:text-[#20243A]'
          }`}
        >
          <Coffee className="w-3.5 h-3.5" />
          <span>Long (15m)</span>
        </button>
      </div>

      {/* Subject Selection Dropdown */}
      {mode === 'study' && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-[#777D90]">Subject:</span>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={isRunning}
            className="bg-white border border-[#E8EAF0] text-xs font-semibold text-[#20243A] px-2.5 py-1 rounded-lg focus:outline-none focus:border-[#8B72E8] shadow-xs cursor-pointer"
          >
            <option value="Machine Learning">Machine Learning</option>
            <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
            <option value="FastAPI Backend">FastAPI Backend</option>
            <option value="Android Jetpack Compose">Android Jetpack Compose</option>
            <option value="Probability & Statistics">Probability & Statistics</option>
          </select>
        </div>
      )}

      {/* Large Lavender Circular Pomodoro Countdown Indicator */}
      <div className="relative my-6 w-64 h-64 flex items-center justify-center">
        {/* Subtle glow backdrop */}
        <div
          className={`absolute inset-4 rounded-full filter blur-2xl opacity-15 transition-all bg-[#8B72E8] ${
            isRunning ? 'scale-105' : 'scale-90'
          }`}
        ></div>

        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background Track */}
          <circle
            cx="50"
            cy="50"
            r="44"
            className="text-[#E8EAF0]"
            strokeWidth="5"
            stroke="currentColor"
            fill="none"
          />
          {/* Animated Lavender Countdown Ring */}
          <circle
            cx="50"
            cy="50"
            r="44"
            className="text-[#9B85F5] transition-all duration-300"
            strokeWidth="5"
            strokeDasharray="276.46"
            strokeDashoffset={(strokeDashoffset / 100) * 276.46}
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
          />
        </svg>

        {/* Center Timer Typography in Deep Navy */}
        <div className="absolute flex flex-col items-center">
          <span className="text-[11px] font-bold tracking-widest text-[#777D90] uppercase">
            {mode === 'study' ? 'Focus Mode' : 'Rest Mode'}
          </span>
          <span className="text-5xl font-extrabold font-mono text-[#20243A] tabular-nums tracking-tight my-1">
            {timeString}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-[#777D90]">
            {isRunning ? (
              <span className="flex items-center gap-1.5 text-[#8B72E8] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#8B72E8] animate-ping"></span>
                In Progress
              </span>
            ) : (
              <span>Ready</span>
            )}
          </div>
        </div>
      </div>

      {/* Completion Notification Card */}
      {completedNotice && (
        <div className="w-full p-3 rounded-xl bg-[#EBF7F2] border border-[#55A987]/40 flex items-center justify-between mb-3 shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#55A987]" />
            <div>
              <p className="text-xs font-bold text-[#20243A]">Session Completed!</p>
              <p className="text-[10px] text-[#777D90]">Data recorded to Room DB & ML dataset</p>
            </div>
          </div>
          <button
            onClick={() => switchMode('short_break')}
            className="px-2.5 py-1 text-xs font-bold bg-[#55A987] text-white rounded-lg cursor-pointer"
          >
            Take Break
          </button>
        </div>
      )}

      {/* Live Interruption Counter */}
      <div className="w-full max-w-sm flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-[#E8EAF0] shadow-xs mb-4">
        <div className="flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 text-amber-500" />
          <span className="text-xs text-[#777D90]">Session Interruptions:</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-extrabold font-mono text-amber-600 tabular-nums">
            {interruptions}
          </span>
          <button
            onClick={() => setInterruptions((p) => p + 1)}
            className="text-[10px] px-2 py-0.5 rounded bg-[#F8F9FC] text-[#777D90] hover:text-[#20243A] border border-[#E8EAF0] cursor-pointer"
            title="Log manual interruption"
          >
            +1
          </button>
        </div>
      </div>

      {/* Action Controls: Lavender Start Button, Separate Pause & Reset */}
      <div className="w-full max-w-sm space-y-3">
        <div className="flex items-center gap-3">
          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-12 h-12 rounded-2xl bg-white border border-[#E8EAF0] flex items-center justify-center text-[#777D90] hover:text-[#20243A] hover:border-[#8B72E8]/40 shadow-xs transition-colors cursor-pointer"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Primary Action Button (Solid Lavender Start, or White/Lavender Pause) */}
          {isRunning ? (
            <button
              onClick={() => setIsRunning(false)}
              className="flex-1 h-12 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 bg-white border-2 border-[#8B72E8] text-[#8B72E8] hover:bg-[#F3F0FD] shadow-xs transition-transform active:scale-[0.98] cursor-pointer"
            >
              <Pause className="w-5 h-5 text-[#8B72E8]" />
              <span>PAUSE SESSION</span>
            </button>
          ) : (
            <button
              onClick={() => setIsRunning(true)}
              className="flex-1 h-12 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 bg-[#8B72E8] hover:bg-[#7b61df] text-white shadow-xs transition-transform active:scale-[0.98] cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white text-white" />
              <span>START SESSION</span>
            </button>
          )}

          {/* Sound Toggle Button */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-12 h-12 rounded-2xl bg-white border border-[#E8EAF0] flex items-center justify-center text-[#777D90] hover:text-[#20243A] hover:border-[#8B72E8]/40 shadow-xs transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-[#8B72E8]" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

        {/* Quick Duration Preset Pills */}
        <div className="flex items-center justify-center gap-2 pt-1">
          {[15, 25, 45, 60].map((mins) => (
            <button
              key={mins}
              onClick={() => switchMode('study', mins)}
              disabled={isRunning}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                totalSeconds === mins * 60 && mode === 'study'
                  ? 'bg-[#8B72E8] text-white font-bold shadow-xs'
                  : 'bg-white text-[#777D90] hover:text-[#20243A] border border-[#E8EAF0]'
              }`}
            >
              {mins}m
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
