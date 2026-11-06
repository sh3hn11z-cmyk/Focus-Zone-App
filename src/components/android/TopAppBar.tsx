import React from 'react';
import { Sparkles, User as UserIcon, Flame, ArrowLeft } from 'lucide-react';
import { ScreenTab } from './BottomNavigationBar';

interface TopAppBarProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  onOpenAiAssistant?: () => void;
  onOpenProfile?: () => void;
  streakDays?: number;
  currentTab: ScreenTab;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  title,
  subtitle,
  showBack,
  onBack,
  onOpenAiAssistant,
  onOpenProfile,
  streakDays = 7,
  currentTab,
}) => {
  return (
    <header className="h-14 px-4 bg-white/95 backdrop-blur-md border-b border-[#E8EAF0] flex items-center justify-between shrink-0 z-20 shadow-xs">
      <div className="flex items-center gap-2.5 min-w-0">
        {showBack ? (
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#20243A] hover:bg-[#F8F9FC] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-7 h-7 rounded-lg bg-[#8B72E8] flex items-center justify-center font-bold text-xs text-white shadow-xs shrink-0">
            FZ
          </div>
        )}
        <div className="truncate">
          <h1 className="text-sm font-bold text-[#20243A] tracking-tight leading-tight truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-[#777D90] leading-none truncate mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {/* Streak Indicator */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F3F0FD] border border-[#E8EAF0] text-xs font-semibold text-[#8B72E8]">
          <Flame className="w-3.5 h-3.5 fill-[#8B72E8] text-[#8B72E8]" />
          <span className="font-mono text-[11px] font-bold">{streakDays}d</span>
        </div>

        {/* AI Assistant Quick Trigger */}
        <button
          onClick={onOpenAiAssistant}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            currentTab === 'ai_assistant'
              ? 'bg-[#8B72E8] text-white shadow-sm shadow-[#8B72E8]/40'
              : 'bg-white border border-[#E8EAF0] text-[#777D90] hover:text-[#8B72E8] hover:border-[#8B72E8]/40'
          }`}
          title="AI Study Assistant"
        >
          <Sparkles className="w-4 h-4" />
        </button>

        {/* Profile & Settings Trigger */}
        <button
          onClick={onOpenProfile}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            currentTab === 'profile'
              ? 'bg-[#8B72E8] text-white shadow-sm shadow-[#8B72E8]/40'
              : 'bg-white border border-[#E8EAF0] text-[#777D90] hover:text-[#20243A] hover:border-[#8B72E8]/40'
          }`}
          title="User Profile & Settings"
        >
          <UserIcon className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
