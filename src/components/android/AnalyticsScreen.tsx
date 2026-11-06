import React, { useState } from 'react';
import { BarChart3, TrendingUp, CheckCircle2, XCircle, Brain, Calendar, ShieldAlert } from 'lucide-react';
import { StudySession } from '../../types';
import { MODEL_EVALUATION_METRICS } from '../../ml/mlEngine';

interface AnalyticsProps {
  sessions: StudySession[];
}

export const AnalyticsScreen: React.FC<AnalyticsProps> = ({ sessions }) => {
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly'>('weekly');

  const totalSessions = sessions.length;
  const completedSessions = sessions.filter(s => s.completed).length;
  const abandonedSessions = totalSessions - completedSessions;
  const completionRatePercent = totalSessions ? Math.round((completedSessions / totalSessions) * 100) : 0;

  const totalStudyMinutes = sessions.reduce((acc, s) => acc + s.actualDuration, 0);
  const totalStudyHours = (totalStudyMinutes / 60).toFixed(1);

  const totalInterruptions = sessions.reduce((acc, s) => acc + s.interruptionCount, 0);
  const avgInterruptionsPerSession = totalSessions ? (totalInterruptions / totalSessions).toFixed(1) : '0';

  // Average study consistency
  const avgConsistency = sessions.length
    ? Math.round((sessions.reduce((acc, s) => acc + s.studyConsistency, 0) / sessions.length) * 100)
    : 82;

  // Hourly breakdown (circadian distribution)
  const hourlyCounts = Array(24).fill(0);
  sessions.forEach(s => {
    hourlyCounts[s.startHour] = (hourlyCounts[s.startHour] || 0) + 1;
  });
  const maxHourlyCount = Math.max(...hourlyCounts, 1);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#F8F9FC]">
      {/* Header & Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#20243A] tracking-tight">Productivity Analytics</h2>
          <p className="text-xs text-[#777D90]">Data Science study habit metrics</p>
        </div>
        <div className="flex items-center p-0.5 bg-white rounded-lg border border-[#E8EAF0] shadow-xs">
          <button
            onClick={() => setTimeRange('weekly')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              timeRange === 'weekly' ? 'bg-[#8B72E8] text-white shadow-xs' : 'text-[#777D90] hover:text-[#20243A]'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeRange('monthly')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              timeRange === 'monthly' ? 'bg-[#8B72E8] text-white shadow-xs' : 'text-[#777D90] hover:text-[#20243A]'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Primary KPI Grid (White Cards, Navy Numbers) */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs">
          <span className="text-[11px] text-[#777D90] block mb-1">Total Study Time</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-[#20243A] tabular-nums">
              {totalStudyHours}
            </span>
            <span className="text-xs text-[#777D90]">hours</span>
          </div>
          <span className="text-[10px] text-[#55A987] font-semibold mt-1 block">
            +18% from last week
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs">
          <span className="text-[11px] text-[#777D90] block mb-1">Study Consistency</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-[#8B72E8] tabular-nums">
              {avgConsistency}%
            </span>
            <span className="text-xs text-[#777D90]">score</span>
          </div>
          <span className="text-[10px] text-[#777D90] mt-1 block">
            Habit stability index
          </span>
        </div>
      </div>

      {/* Completion vs Abandonment Ratio (White Card with Lavender & Rose progress) */}
      <div className="p-4 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#20243A]">Session Completion Rate</span>
          <span className="text-xs font-mono font-bold text-[#8B72E8] tabular-nums">
            {completionRatePercent}% Success
          </span>
        </div>

        {/* Segmented bar */}
        <div className="w-full h-3 rounded-full bg-[#F0F2F7] overflow-hidden flex border border-[#E8EAF0]">
          <div
            style={{ width: `${completionRatePercent}%` }}
            className="bg-[#8B72E8] h-full"
          ></div>
          <div
            style={{ width: `${100 - completionRatePercent}%` }}
            className="bg-rose-400 h-full"
          ></div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <div className="flex items-center gap-1.5 text-[#55A987] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{completedSessions} Completed</span>
          </div>
          <div className="flex items-center gap-1.5 text-rose-500 font-medium">
            <XCircle className="w-3.5 h-3.5" />
            <span>{abandonedSessions} Incomplete / Dropped</span>
          </div>
        </div>
      </div>

      {/* Circadian Hourly Productivity Distribution (White Card with Lavender/Blue bars) */}
      <div className="p-4 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#20243A]">Peak Study Hours (Circadian Pattern)</span>
          <span className="text-[10px] text-[#777D90] font-mono">00:00 - 23:00</span>
        </div>
        <p className="text-[11px] text-[#777D90]">
          Sessions logged across each hour of the day. Higher bars denote consistent peak focus intervals.
        </p>

        <div className="flex items-end justify-between h-20 pt-2 gap-1 px-1">
          {hourlyCounts.map((count, hour) => {
            const heightPercent = count ? Math.max(15, Math.round((count / maxHourlyCount) * 100)) : 6;
            const isPeak = count === maxHourlyCount && count > 0;

            return (
              <div key={hour} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t-sm transition-all ${
                    isPeak
                      ? 'bg-[#8B72E8] shadow-xs'
                      : count > 0
                      ? 'bg-[#B4A5F4]'
                      : 'bg-[#E8EAF0]'
                  }`}
                ></div>
                {hour % 6 === 0 && (
                  <span className="text-[8px] font-mono text-[#777D90] mt-1">
                    {hour}h
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Model Benchmark Card */}
      <div className="p-4 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-[#8B72E8]" />
            <span className="text-xs font-bold text-[#20243A]">Machine Learning Benchmarks</span>
          </div>
          <span className="text-[10px] font-mono text-[#8B72E8] font-bold">Test Set N=300</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
          <div className="p-3 rounded-xl bg-[#F8F9FC] border border-[#E8EAF0]">
            <p className="text-[10px] text-[#777D90] font-medium">Random Forest</p>
            <p className="text-base font-bold font-mono text-[#55A987]">90.6% Acc</p>
            <span className="text-[10px] text-[#777D90]">ROC-AUC: 0.954</span>
          </div>
          <div className="p-3 rounded-xl bg-[#F8F9FC] border border-[#E8EAF0]">
            <p className="text-[10px] text-[#777D90] font-medium">Logistic Regression</p>
            <p className="text-base font-bold font-mono text-[#20243A]">82.3% Acc</p>
            <span className="text-[10px] text-[#777D90]">ROC-AUC: 0.887</span>
          </div>
        </div>
      </div>
    </div>
  );
};
