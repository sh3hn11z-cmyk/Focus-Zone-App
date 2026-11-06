import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal, Maximize2, Minimize2, Smartphone } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  isFramed: boolean;
  onToggleFrame: () => void;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children, isFramed, onToggleFrame }) => {
  const [currentTime, setCurrentTime] = useState<string>('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!isFramed) {
    return (
      <div className="w-full h-full min-h-screen bg-[#F8F9FC] text-[#20243A] flex flex-col">
        {children}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-3 px-2 select-none">
      {/* Frame Switcher Bar */}
      <div className="w-full max-w-[420px] mb-2 flex items-center justify-between text-xs text-[#777D90] px-2">
        <div className="flex items-center gap-1.5 font-medium">
          <Smartphone className="w-3.5 h-3.5 text-[#8B72E8]" />
          <span>Pixel 8 Pro · Light Theme</span>
        </div>
        <button
          onClick={onToggleFrame}
          className="flex items-center gap-1 hover:text-[#20243A] transition-colors cursor-pointer"
          title="Switch to full-screen view"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Full Width</span>
        </button>
      </div>

      {/* Android Device Outer Chassis */}
      <div className="relative w-full max-w-[420px] h-[860px] bg-[#E9EBF2] rounded-[48px] p-3 shadow-xl border-4 border-[#D4D7E5] ring-1 ring-black/5 flex flex-col overflow-hidden">
        {/* Antenna band accents */}
        <div className="absolute top-24 -left-1 w-1 h-6 bg-[#C5C8D8] rounded-r"></div>
        <div className="absolute top-24 -right-1 w-1 h-6 bg-[#C5C8D8] rounded-l"></div>
        <div className="absolute top-36 -right-1 w-1 h-12 bg-[#C5C8D8] rounded-l"></div>

        {/* Screen Bezel */}
        <div className="relative w-full h-full bg-[#F8F9FC] rounded-[40px] flex flex-col overflow-hidden border border-[#E8EAF0] shadow-inner">
          {/* Android Status Bar */}
          <div className="h-9 w-full px-6 flex items-center justify-between text-[11px] font-semibold text-[#20243A] select-none shrink-0 z-30 bg-[#F8F9FC]">
            <span className="font-mono">{currentTime}</span>
            {/* Center Front Camera Punch Hole */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2 w-4 h-4 bg-black rounded-full ring-2 ring-[#E8EAF0]"></div>
            <div className="flex items-center gap-2">
              <Signal className="w-3 h-3 text-[#20243A]/80" />
              <Wifi className="w-3 h-3 text-[#20243A]/80" />
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] font-mono">98%</span>
                <Battery className="w-3.5 h-3.5 text-[#8B72E8]" />
              </div>
            </div>
          </div>

          {/* Screen Dynamic Content Area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col bg-[#F8F9FC]">
            {children}
          </div>

          {/* Android System Gesture Navigation Pill */}
          <div className="h-5 w-full bg-[#F8F9FC] flex items-center justify-center shrink-0 z-30">
            <div className="w-28 h-1 bg-[#20243A]/25 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
