import React, { useState } from 'react';
import { User, StudyGoal, UserPreferences } from '../../types';
import { User as UserIcon, Bell, Volume2, Target, Clock, RotateCcw, Check } from 'lucide-react';

interface ProfileProps {
  user: User;
  goal: StudyGoal;
  preferences: UserPreferences;
  onUpdateGoal: (updates: Partial<StudyGoal>) => void;
  onUpdatePreferences: (updates: Partial<UserPreferences>) => void;
  onResetData: () => void;
}

export const ProfileScreen: React.FC<ProfileProps> = ({
  user,
  goal,
  preferences,
  onUpdateGoal,
  onUpdatePreferences,
  onResetData,
}) => {
  const [dailyMinutes, setDailyMinutes] = useState<number>(goal.dailyTargetMinutes);
  const [studyDuration, setStudyDuration] = useState<number>(preferences.preferredStudyDuration);
  const [shortBreak, setShortBreak] = useState<number>(preferences.preferredShortBreak);
  const [notifications, setNotifications] = useState<boolean>(preferences.notificationEnabled);
  const [sound, setSound] = useState<boolean>(preferences.soundEnabled);
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  const handleSave = () => {
    onUpdateGoal({ dailyTargetMinutes: dailyMinutes });
    onUpdatePreferences({
      preferredStudyDuration: studyDuration,
      preferredShortBreak: shortBreak,
      notificationEnabled: notifications,
      soundEnabled: sound,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#F8F9FC]">
      {/* Profile Header */}
      <div className="p-4 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-[#8B72E8] flex items-center justify-center text-white font-bold text-lg shadow-xs">
          {user.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-[#20243A] truncate">{user.name}</h3>
          <p className="text-xs text-[#777D90] truncate">{user.email}</p>
          <span className="text-[10px] text-[#8B72E8] font-medium">B.Tech CSE – Data Science</span>
        </div>
      </div>

      {savedNotice && (
        <div className="p-2.5 rounded-xl bg-[#EBF7F2] border border-[#55A987]/40 text-[#55A987] text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Preferences updated successfully!</span>
        </div>
      )}

      {/* Daily Study Goals Configuration */}
      <div className="p-4 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#20243A]">
          <Target className="w-4 h-4 text-[#8B72E8]" />
          <span>Study Targets</span>
        </div>

        <div>
          <div className="flex justify-between text-xs text-[#777D90] mb-1">
            <span>Daily Goal Target</span>
            <span className="font-mono text-[#20243A] font-bold">{dailyMinutes} mins ({(dailyMinutes / 60).toFixed(1)} hrs)</span>
          </div>
          <input
            type="range"
            min="30"
            max="360"
            step="15"
            value={dailyMinutes}
            onChange={(e) => setDailyMinutes(Number(e.target.value))}
            className="w-full accent-[#8B72E8] cursor-pointer"
          />
        </div>
      </div>

      {/* Timer Defaults */}
      <div className="p-4 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#20243A]">
          <Clock className="w-4 h-4 text-[#8B72E8]" />
          <span>Pomodoro Timer Defaults</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] text-[#777D90] block mb-1">Study Duration</label>
            <select
              value={studyDuration}
              onChange={(e) => setStudyDuration(Number(e.target.value))}
              className="w-full bg-[#F8F9FC] border border-[#E8EAF0] rounded-xl px-2.5 py-2 text-xs text-[#20243A] focus:outline-none focus:border-[#8B72E8] cursor-pointer"
            >
              <option value="15">15 minutes</option>
              <option value="25">25 minutes (Default)</option>
              <option value="45">45 minutes</option>
              <option value="60">60 minutes</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] text-[#777D90] block mb-1">Short Break</label>
            <select
              value={shortBreak}
              onChange={(e) => setShortBreak(Number(e.target.value))}
              className="w-full bg-[#F8F9FC] border border-[#E8EAF0] rounded-xl px-2.5 py-2 text-xs text-[#20243A] focus:outline-none focus:border-[#8B72E8] cursor-pointer"
            >
              <option value="3">3 minutes</option>
              <option value="5">5 minutes (Default)</option>
              <option value="10">10 minutes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div className="p-4 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs space-y-3">
        <span className="text-xs font-bold text-[#20243A]">Notifications & Sound</span>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#777D90]">
            <Bell className="w-4 h-4 text-[#8B72E8]" />
            <span>Study Reminders & Break Alerts</span>
          </div>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="w-4 h-4 accent-[#8B72E8] cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#E8EAF0]">
          <div className="flex items-center gap-2 text-xs text-[#777D90]">
            <Volume2 className="w-4 h-4 text-[#8B72E8]" />
            <span>Timer Completion Chime</span>
          </div>
          <input
            type="checkbox"
            checked={sound}
            onChange={(e) => setSound(e.target.checked)}
            className="w-4 h-4 accent-[#8B72E8] cursor-pointer"
          />
        </div>
      </div>

      {/* Save Button (Solid Lavender) */}
      <button
        onClick={handleSave}
        className="w-full h-11 rounded-xl bg-[#8B72E8] hover:bg-[#7b61df] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-transform cursor-pointer"
      >
        <span>SAVE PREFERENCES</span>
      </button>

      {/* Reset Database */}
      <div className="pt-2 text-center">
        <button
          onClick={onResetData}
          className="text-xs text-rose-500 hover:text-rose-600 flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data to Initial State</span>
        </button>
      </div>
    </div>
  );
};
