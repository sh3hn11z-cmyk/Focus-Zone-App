import React, { useEffect, useState } from 'react';
import { Sparkles, Brain, CheckCircle2 } from 'lucide-react';

interface SplashProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashProps> = ({ onFinish }) => {
  const [loadingProgress, setLoadingProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 400);
          return 100;
        }
        return prev + 20;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-8 bg-[#F8F9FC] text-center select-none">
      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        {/* Animated Brand Logo */}
        <div className="w-20 h-20 rounded-3xl bg-[#8B72E8] shadow-md shadow-[#8B72E8]/25 flex items-center justify-center transform transition-all duration-700 animate-bounce">
          <Brain className="w-10 h-10 text-white" />
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-[#20243A] tracking-tight">
            Focus Zone AI
          </h1>
          <p className="text-xs text-[#777D90] mt-1 font-medium">
            Intelligent Study Management & ML Prediction
          </p>
        </div>
      </div>

      {/* Progress & Version Tag */}
      <div className="w-full max-w-xs space-y-3 pb-6">
        <div className="w-full h-1.5 bg-[#E8EAF0] rounded-full overflow-hidden">
          <div
            style={{ width: `${loadingProgress}%` }}
            className="h-full bg-[#8B72E8] transition-all duration-200"
          ></div>
        </div>
        <p className="text-[11px] text-[#777D90] font-mono">
          Loading ML Model & Room Database... {loadingProgress}%
        </p>
        <span className="text-[10px] text-[#777D90] block">
          v1.0.0 · com.example.focuszone_app
        </span>
      </div>
    </div>
  );
};
