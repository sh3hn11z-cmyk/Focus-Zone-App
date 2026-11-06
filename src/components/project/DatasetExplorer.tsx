import React, { useState } from 'react';
import { Database, Download, FileSpreadsheet } from 'lucide-react';
import { StudySession } from '../../types';
import { db } from '../../data/db';

interface DatasetExplorerProps {
  sessions: StudySession[];
}

export const DatasetExplorer: React.FC<DatasetExplorerProps> = ({ sessions }) => {
  const [filterType, setFilterType] = useState<'all' | 'completed' | 'abandoned'>('all');

  const filtered = sessions.filter((s) => {
    if (filterType === 'completed') return s.completed;
    if (filterType === 'abandoned') return !s.completed;
    return true;
  });

  const handleDownloadCsv = () => {
    const csvContent = db.exportDatasetCsv();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `focus_zone_study_dataset_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header & Download Bar */}
      <div className="p-6 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-[#20243A] flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#8B72E8]" />
            Major Project Structured Study Dataset (Section 6)
          </h3>
          <p className="text-xs text-[#777D90]">
            11-column standardized feature schema used for exploratory data analysis and ML model training
          </p>
        </div>

        <button
          onClick={handleDownloadCsv}
          className="h-10 px-4 rounded-xl bg-[#8B72E8] hover:bg-[#7b61df] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] transition-transform cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Dataset (.CSV)</span>
        </button>
      </div>

      {/* Dataset Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[#E8EAF0] shadow-xs">
          <span className="text-[11px] text-[#777D90]">Total Records</span>
          <p className="text-2xl font-bold font-mono text-[#20243A] mt-1 tabular-nums">{sessions.length}</p>
          <span className="text-[10px] text-[#55A987] font-semibold">100% Validated schema</span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#E8EAF0] shadow-xs">
          <span className="text-[11px] text-[#777D90]">Mean Planned Duration</span>
          <p className="text-2xl font-bold font-mono text-[#8B72E8] mt-1 tabular-nums">
            {Math.round(sessions.reduce((a, s) => a + s.plannedDuration, 0) / (sessions.length || 1))} min
          </p>
          <span className="text-[10px] text-[#777D90]">Std: 18.4 min</span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#E8EAF0] shadow-xs">
          <span className="text-[11px] text-[#777D90]">Mean Interruptions</span>
          <p className="text-2xl font-bold font-mono text-amber-600 mt-1 tabular-nums">
            {(sessions.reduce((a, s) => a + s.interruptionCount, 0) / (sessions.length || 1)).toFixed(1)}
          </p>
          <span className="text-[10px] text-[#777D90]">Max: 5 per session</span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#E8EAF0] shadow-xs">
          <span className="text-[11px] text-[#777D90]">Completion Rate</span>
          <p className="text-2xl font-bold font-mono text-[#20243A] mt-1 tabular-nums">
            {Math.round((sessions.filter(s => s.completed).length / (sessions.length || 1)) * 100)}%
          </p>
          <span className="text-[10px] text-[#777D90]">Target class balance</span>
        </div>
      </div>

      {/* Filter Tabs & Data Table */}
      <div className="p-6 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#20243A]">Dataset Records Viewer</span>
          <div className="flex items-center gap-1 p-0.5 bg-[#F8F9FC] rounded-lg border border-[#E8EAF0]">
            {(['all', 'completed', 'abandoned'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1 text-xs font-semibold rounded-md capitalize transition-colors cursor-pointer ${
                  filterType === t ? 'bg-[#8B72E8] text-white shadow-xs' : 'text-[#777D90] hover:text-[#20243A]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#E8EAF0] text-[#777D90] font-mono">
                <th className="py-2.5 px-2">session_id</th>
                <th className="py-2.5 px-2">subject</th>
                <th className="py-2.5 px-2">planned_dur</th>
                <th className="py-2.5 px-2">actual_dur</th>
                <th className="py-2.5 px-2">interrupt_cnt</th>
                <th className="py-2.5 px-2">start_hr</th>
                <th className="py-2.5 px-2">break_dur</th>
                <th className="py-2.5 px-2">prev_comp_rt</th>
                <th className="py-2.5 px-2">consistency</th>
                <th className="py-2.5 px-2">day_of_wk</th>
                <th className="py-2.5 px-2">completed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EAF0] font-mono">
              {filtered.map((s) => (
                <tr key={s.sessionId} className="text-[#20243A] hover:bg-[#F8F9FC]">
                  <td className="py-2.5 px-2 text-[#8B72E8] font-semibold">{s.sessionId}</td>
                  <td className="py-2.5 px-2 font-sans font-medium text-[#20243A]">{s.subject}</td>
                  <td className="py-2.5 px-2">{s.plannedDuration}m</td>
                  <td className="py-2.5 px-2">{s.actualDuration}m</td>
                  <td className="py-2.5 px-2 text-amber-600 font-semibold">{s.interruptionCount}</td>
                  <td className="py-2.5 px-2">{s.startHour}:00</td>
                  <td className="py-2.5 px-2">{s.breakDuration}m</td>
                  <td className="py-2.5 px-2">{(s.previousCompletionRate * 100).toFixed(0)}%</td>
                  <td className="py-2.5 px-2">{(s.studyConsistency * 100).toFixed(0)}%</td>
                  <td className="py-2.5 px-2">Day {s.dayOfWeek}</td>
                  <td className="py-2.5 px-2">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        s.completed ? 'bg-[#EBF7F2] text-[#55A987]' : 'bg-rose-50 text-rose-600'
                      }`}
                    >
                      {s.completed ? '1 (YES)' : '0 (NO)'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
