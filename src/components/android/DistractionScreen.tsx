import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, EyeOff, Smartphone, Info, ExternalLink } from 'lucide-react';
import { DistractingAppStat } from '../../types';

interface DistractionProps {
  apps: DistractingAppStat[];
  onSimulateDistraction: (packageName: string) => void;
}

export const DistractionScreen: React.FC<DistractionProps> = ({ apps, onSimulateDistraction }) => {
  const [hasUsageAccess, setHasUsageAccess] = useState<boolean>(true);

  const totalDistractionMins = apps.reduce((acc, a) => acc + a.timeSpentMinutes, 0);
  const totalLaunchesDuringStudy = apps.reduce((acc, a) => acc + a.launchesDuringFocus, 0);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#F8F9FC]">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-[#20243A] tracking-tight">Distraction Monitoring</h2>
        <p className="text-xs text-[#777D90]">
          UsageStatsManager tracking & focus interruption metrics
        </p>
      </div>

      {/* Permission Status Banner (Android PACKAGE_USAGE_STATS) */}
      <div className="p-3.5 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              hasUsageAccess ? 'bg-[#EBF7F2] text-[#55A987]' : 'bg-amber-50 text-amber-600'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#20243A]">Usage Access Permission</p>
            <p className="text-[10px] text-[#777D90]">
              {hasUsageAccess ? 'Granted · Android 14 API Level 34' : 'Action Required'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setHasUsageAccess(!hasUsageAccess)}
          className={`px-3 py-1 text-[11px] font-semibold rounded-lg border transition-colors cursor-pointer ${
            hasUsageAccess
              ? 'border-[#E8EAF0] text-[#777D90] hover:text-[#20243A] bg-[#F8F9FC]'
              : 'bg-[#8B72E8] text-white border-transparent'
          }`}
        >
          {hasUsageAccess ? 'Active' : 'Grant'}
        </button>
      </div>

      {/* Aggregated KPI Strip */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-[#E8EAF0] shadow-xs">
          <span className="text-[11px] text-[#777D90] block mb-1">Time on Distracting Apps</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-[#20243A] tabular-nums">
              {totalDistractionMins}
            </span>
            <span className="text-xs text-[#777D90]">mins today</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-[#E8EAF0] shadow-xs">
          <span className="text-[11px] text-[#777D90] block mb-1">Focus Session Breaches</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-amber-600 tabular-nums">
              {totalLaunchesDuringStudy}
            </span>
            <span className="text-xs text-[#777D90]">app switches</span>
          </div>
        </div>
      </div>

      {/* Interactive Simulation Sandbox */}
      <div className="p-3.5 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#20243A] flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-[#8B72E8]" />
            Test Live Interruption Detection
          </span>
          <span className="text-[10px] text-[#777D90] font-mono">Real-time Hook</span>
        </div>
        <p className="text-[11px] text-[#777D90]">
          Click an app below to simulate opening it during a study session. Focus Zone AI logs the event and updates the ML interruption count.
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          {apps.map((app) => (
            <button
              key={app.packageName}
              onClick={() => onSimulateDistraction(app.packageName)}
              className="px-3 py-2 rounded-xl bg-[#F8F9FC] border border-[#E8EAF0] hover:border-[#8B72E8] flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="truncate">
                <span className="text-xs font-semibold text-[#20243A] block truncate">{app.appName}</span>
                <span className="text-[10px] text-[#777D90]">+1 Breach</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#8B72E8] shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Distracting Apps List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#20243A]">Tracked Applications</span>
          <span className="text-[10px] text-[#777D90]">Sorted by Focus Interruption</span>
        </div>

        <div className="space-y-2">
          {apps.map((app) => (
            <div
              key={app.packageName}
              className="p-3 rounded-xl bg-white border border-[#E8EAF0] shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F3F0FD] border border-[#E8EAF0] flex items-center justify-center text-[#8B72E8] font-bold text-xs">
                  {app.appName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#20243A]">{app.appName}</h4>
                  <span className="text-[10px] text-[#777D90] font-mono">
                    {app.category} · {app.packageName}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold font-mono text-[#20243A] block tabular-nums">
                  {app.timeSpentMinutes} min
                </span>
                <span className="text-[10px] text-amber-600 font-mono">
                  {app.launchesDuringFocus} focus breaches
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Android Privacy & Permissions Callout */}
      <div className="p-3 rounded-xl bg-white border border-[#E8EAF0] text-[11px] text-[#777D90] space-y-1 shadow-xs">
        <div className="flex items-center gap-1.5 font-bold text-[#20243A]">
          <Info className="w-3.5 h-3.5 text-[#8B72E8]" />
          <span>Android Privacy Compliance</span>
        </div>
        <p>
          Focus Zone AI strictly complies with Google Play policies: app usage statistics are processed locally using Android's <code className="text-[#8B72E8] font-mono">UsageStatsManager</code>. No personal communications or browser histories are accessed or transmitted.
        </p>
      </div>
    </div>
  );
};
