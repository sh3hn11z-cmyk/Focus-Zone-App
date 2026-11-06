import React, { useState } from 'react';
import { Timer, ShieldAlert, Brain, ArrowRight, Check } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [
    {
      title: 'Deep Focus Pomodoro',
      subtitle: 'Scientifically Calibrated Study Sessions',
      description:
        'Boost cognitive retention with 25-minute focused work intervals and 5-minute restorative breaks. Automatic audio notifications keep you in the zone.',
      icon: Timer,
      badge: 'Productivity Science',
    },
    {
      title: 'Distraction Monitoring',
      subtitle: 'Shield Against Notification Loops',
      description:
        'Track foreground app-switching in real time using Android UsageStatsManager. Identify high-breach social apps that derail your momentum.',
      icon: ShieldAlert,
      badge: 'Privacy First',
    },
    {
      title: 'Machine Learning Forecasts',
      subtitle: 'Predict Session Completion Odds',
      description:
        'Trained on 1,500+ study records, our Random Forest classifier forecasts your session success probability and advises optimal study times.',
      icon: Brain,
      badge: '90.6% Accuracy',
    },
  ];

  const step = steps[currentStep];
  const Icon = step.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#F8F9FC] select-none">
      {/* Top Skip Bar */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-[#8B72E8] uppercase tracking-wider">
          Focus Zone AI
        </span>
        <button
          onClick={onComplete}
          className="text-xs font-semibold text-[#777D90] hover:text-[#20243A] cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* Main Content Card */}
      <div className="my-auto py-6 space-y-6 text-center">
        {/* Feature Icon Container */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-white border border-[#E8EAF0] shadow-sm flex items-center justify-center text-[#8B72E8]">
          <Icon className="w-10 h-10" />
        </div>

        <div className="space-y-2 max-w-xs mx-auto">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#F3F0FD] text-[#8B72E8] border border-[#8B72E8]/20">
            {step.badge}
          </span>
          <h2 className="text-xl font-extrabold text-[#20243A] tracking-tight">
            {step.title}
          </h2>
          <p className="text-xs text-[#8B72E8] font-semibold">
            {step.subtitle}
          </p>
          <p className="text-xs text-[#777D90] leading-relaxed pt-1">
            {step.description}
          </p>
        </div>

        {/* Step Indicator Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentStep ? 'w-6 bg-[#8B72E8]' : 'w-1.5 bg-[#E8EAF0]'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Solid Lavender Action CTA */}
      <div className="space-y-2 pb-2">
        <button
          onClick={handleNext}
          className="w-full h-12 rounded-xl bg-[#8B72E8] hover:bg-[#7b61df] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-[0.98] cursor-pointer"
        >
          <span>{currentStep === steps.length - 1 ? 'GET STARTED' : 'CONTINUE'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
