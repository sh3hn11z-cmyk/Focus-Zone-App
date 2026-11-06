import React from 'react';
import { Play, CheckCircle2, Flame, Brain, Clock, ChevronRight, AlertTriangle } from 'lucide-react';
import { StudySession, StudyTask, StudyGoal } from '../../types';
import { ScreenTab } from './BottomNavigationBar';
import { runMlPrediction } from '../../ml/mlEngine';

interface DashboardProps {
  sessions: StudySession[];
  tasks: StudyTask[];
  goal: StudyGoal;
  onNavigate: (tab: ScreenTab) => void;
  onToggleTask: (taskId: string) => void;
}

export const DashboardScreen: React.FC<DashboardProps> = ({
  sessions,
  tasks,
  goal,
  onNavigate,
  onToggleTask,
}) => {
  // Calculate today's metrics
  const todaySessions = sessions.filter(s => {
    const sDate = new Date(s.startTime).toDateString();
    const today = new Date('2026-11-06T08:45:00.000Z').toDateString();
    return sDate === today;
  });

  const todayMinutes = todaySessions.reduce((acc, s) => acc + s.actualDuration, 0);
  const completedTodayCount = todaySessions.filter(s => s.completed).length;
  const goalProgress = Math.min(100, Math.round((todayMinutes / (goal.dailyTargetMinutes || 1)) * 100));

  // Run live ML prediction for next planned session (25m Pomodoro)
  const mlNextPrediction = runMlPrediction({
    plannedDuration: 25,
    previousActualDuration: todaySessions[0]?.actualDuration || 25,
    interruptionCount: todaySessions.reduce((acc, s) => acc + s.interruptionCount, 0),
    startHour: new Date().getHours() || 14,
    previousCompletionRate: 0.85,
    studyConsistency: 0.82,
    dayOfWeek: new Date().getDay(),
  });

  // Weekly day distribution
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeklyMinutes = [85, 110, 130, 99, 0, 0, 0];
  const maxWeekly = Math.max(...weeklyMinutes, 150);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#F8F9FC]">
      {/* Welcome & Streak Banner */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-[#8B72E8] tracking-wider uppercase">
            Focus Zone AI
          </span>
          <h2 className="text-xl font-extrabold text-[#20243A] tracking-tight">
            Hello, Ayaan
          </h2>
          <p className="text-xs text-[#777D90]">
            Ready for your focused study session?
          </p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 text-[#8B72E8] font-bold text-sm">
            <Flame className="w-4 h-4 fill-[#8B72E8]" />
            <span>{goal.streakDays} Day Streak</span>
          </div>
          <span className="text-[10px] text-[#777D90]">High consistency</span>
        </div>
      </div>

      {/* Primary KPI Card: Today's Goal Progress */}
      <div className="p-4 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-[#777D90]">Today's Study Progress</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold font-mono text-[#20243A] tabular-nums">
                {todayMinutes}
              </span>
              <span className="text-xs text-[#777D90] font-mono">
                / {goal.dailyTargetMinutes} min
              </span>
            </div>
            <p className="text-xs text-[#8B72E8] font-semibold">
              {goalProgress}% of daily goal completed
            </p>
          </div>

          {/* Circular Progress Ring */}
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#E8EAF0]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#9B85F5] transition-all duration-1000 ease-out"
                strokeDasharray={`${goalProgress}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xs font-bold font-mono text-[#20243A] tabular-nums">
                {goalProgress}%
              </span>
            </div>
          </div>
        </div>

        {/* Solid Lavender Primary Button */}
        <button
          onClick={() => onNavigate('timer')}
          className="mt-4 w-full h-11 rounded-xl bg-[#8B72E8] hover:bg-[#7b61df] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] transition-transform cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>START FOCUS SESSION (25 MIN)</span>
        </button>
      </div>

      {/* ML Prediction Snapshot Card */}
      <div
        onClick={() => onNavigate('analytics')}
        className="p-3.5 rounded-2xl bg-white border border-[#E8EAF0] hover:border-[#8B72E8]/60 transition-all cursor-pointer shadow-xs group"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#F3F0FD] flex items-center justify-center text-[#8B72E8]">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#20243A] flex items-center gap-1.5">
                ML Session Forecast
                <span className="px-1.5 py-0.2 text-[9px] font-mono font-semibold uppercase bg-[#F3F0FD] text-[#8B72E8] rounded">
                  Random Forest
                </span>
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#777D90] group-hover:text-[#20243A] transition-colors" />
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold font-mono text-[#8B72E8] tabular-nums">
                {Math.round(mlNextPrediction.probability * 100)}%
              </span>
              <span className="text-xs text-[#777D90]">completion probability</span>
            </div>
            <p className="text-[11px] text-[#777D90] mt-0.5">
              {mlNextPrediction.recommendations[0]}
            </p>
          </div>
          <div className="text-right">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#EBF7F2] text-[#55A987] border border-[#55A987]/30">
              {mlNextPrediction.riskLevel} Risk
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-[#E8EAF0] shadow-xs">
          <div className="flex items-center gap-1.5 text-[#777D90] text-xs mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#55A987]" />
            <span>Completed Today</span>
          </div>
          <span className="text-xl font-bold font-mono text-[#20243A] tabular-nums">
            {completedTodayCount} Sessions
          </span>
        </div>

        <div
          onClick={() => onNavigate('distraction')}
          className="p-3.5 rounded-xl bg-white border border-[#E8EAF0] shadow-xs cursor-pointer hover:border-[#8B72E8]/40 transition-colors"
        >
          <div className="flex items-center gap-1.5 text-[#777D90] text-xs mb-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Distractions</span>
          </div>
          <span className="text-xl font-bold font-mono text-amber-600 tabular-nums">
            1 Interruption
          </span>
        </div>
      </div>

      {/* Weekly Progress Bar Chart */}
      <div className="p-4 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-[#20243A]">Weekly Study Distribution</span>
          <span className="text-[11px] text-[#777D90] font-mono">Total: 424 min</span>
        </div>
        <div className="flex items-end justify-between h-24 pt-2 px-1">
          {days.map((day, idx) => {
            const mins = weeklyMinutes[idx];
            const heightPercent = Math.max(8, Math.round((mins / maxWeekly) * 100));
            const isToday = idx === 3; // Thursday

            return (
              <div key={day} className="flex flex-col items-center gap-1.5 flex-1">
                <div className="w-full flex justify-center items-end h-16">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-4 rounded-t-md transition-all duration-500 ${
                      isToday
                        ? 'bg-[#8B72E8] shadow-xs'
                        : mins > 0
                        ? 'bg-[#D5D8E8] hover:bg-[#BFC4DC]'
                        : 'bg-[#F0F2F7]'
                    }`}
                  ></div>
                </div>
                <span
                  className={`text-[10px] font-mono ${
                    isToday ? 'text-[#8B72E8] font-bold' : 'text-[#777D90]'
                  }`}
                >
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Priority Tasks */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#20243A]">Priority Study Tasks</span>
          <button
            onClick={() => onNavigate('planner')}
            className="text-xs text-[#8B72E8] font-semibold hover:underline cursor-pointer"
          >
            View All ({tasks.length})
          </button>
        </div>

        <div className="space-y-2">
          {tasks.slice(0, 3).map((task) => {
            const isDone = task.status === 'COMPLETED';

            return (
              <div
                key={task.taskId}
                onClick={() => onToggleTask(task.taskId)}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  isDone
                    ? 'bg-[#F8F9FC] border-[#E8EAF0] opacity-65'
                    : 'bg-white border-[#E8EAF0] hover:border-[#8B72E8]/40 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleTask(task.taskId);
                    }}
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                      isDone
                        ? 'bg-[#55A987] border-[#55A987] text-white'
                        : 'border-[#D4D7E5] hover:border-[#8B72E8]'
                    }`}
                  >
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </button>
                  <div className="truncate">
                    <p
                      className={`text-xs font-medium truncate ${
                        isDone ? 'line-through text-[#777D90]' : 'text-[#20243A]'
                      }`}
                    >
                      {task.topic}
                    </p>
                    <span className="text-[10px] text-[#777D90]">
                      {task.subject} · {task.estimatedMinutes} min
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase font-mono shrink-0 ml-2 ${
                    task.priority === 'HIGH'
                      ? 'bg-rose-50 text-rose-600 border border-rose-200'
                      : task.priority === 'MEDIUM'
                      ? 'bg-amber-50 text-amber-600 border border-amber-200'
                      : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
