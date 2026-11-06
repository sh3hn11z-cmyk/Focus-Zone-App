import React from 'react';
import { Home, Timer, CheckSquare, ShieldAlert, BarChart3 } from 'lucide-react';

export type ScreenTab = 'dashboard' | 'timer' | 'planner' | 'distraction' | 'analytics' | 'ai_assistant' | 'profile';

interface BottomNavBarProps {
  currentTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
  timerActive?: boolean;
}

export const BottomNavigationBar: React.FC<BottomNavBarProps> = ({ currentTab, onSelectTab, timerActive }) => {
  const tabs = [
    { id: 'dashboard' as ScreenTab, label: 'Home', icon: Home },
    { id: 'timer' as ScreenTab, label: 'Timer', icon: Timer, hasBadge: timerActive },
    { id: 'planner' as ScreenTab, label: 'Planner', icon: CheckSquare },
    { id: 'distraction' as ScreenTab, label: 'Monitor', icon: ShieldAlert },
    { id: 'analytics' as ScreenTab, label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <nav className="h-16 bg-white/98 backdrop-blur-md border-t border-[#E8EAF0] grid grid-cols-5 items-center px-1 shrink-0 z-20 shadow-xs">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className="flex flex-col items-center justify-center py-1 relative cursor-pointer group"
          >
            {/* Active Pill Indicator for Material 3 navigation */}
            <div
              className={`w-12 h-7 rounded-full flex items-center justify-center transition-all ${
                isActive ? 'bg-[#F3F0FD] text-[#8B72E8]' : 'text-[#777D90] group-hover:text-[#20243A]'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.hasBadge && (
                <span className="absolute top-1 right-3 w-2 h-2 bg-[#8B72E8] rounded-full ring-2 ring-white animate-pulse"></span>
              )}
            </div>
            <span
              className={`text-[10px] font-medium tracking-tight mt-0.5 transition-colors ${
                isActive ? 'text-[#20243A] font-bold' : 'text-[#777D90]'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
