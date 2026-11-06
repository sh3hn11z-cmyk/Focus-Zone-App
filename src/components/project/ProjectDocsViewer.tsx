import React, { useState } from 'react';
import { FileText, Award, BookCheck, CheckCircle2, ChevronRight, Download } from 'lucide-react';

export const ProjectDocsViewer: React.FC = () => {
  const [activeDoc, setActiveDoc] = useState<'synopsis' | 'uml' | 'slides'>('synopsis');

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-[#E8EAF0] shadow-xs max-w-lg">
        <button
          onClick={() => setActiveDoc('synopsis')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeDoc === 'synopsis' ? 'bg-[#8B72E8] text-white shadow-xs' : 'text-[#777D90] hover:text-[#20243A]'
          }`}
        >
          Project Synopsis
        </button>
        <button
          onClick={() => setActiveDoc('uml')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeDoc === 'uml' ? 'bg-[#8B72E8] text-white shadow-xs' : 'text-[#777D90] hover:text-[#20243A]'
          }`}
        >
          UML Diagrams
        </button>
        <button
          onClick={() => setActiveDoc('slides')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeDoc === 'slides' ? 'bg-[#8B72E8] text-white shadow-xs' : 'text-[#777D90] hover:text-[#20243A]'
          }`}
        >
          Presentation Slides
        </button>
      </div>

      {/* Doc 1: B.Tech Project Synopsis */}
      {activeDoc === 'synopsis' && (
        <div className="p-6 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs space-y-6 text-xs leading-relaxed text-[#20243A]">
          <div className="border-b border-[#E8EAF0] pb-4">
            <span className="text-[#8B72E8] font-bold text-xs uppercase tracking-wider">
              B.Tech CSE (Data Science) Major Project
            </span>
            <h2 className="text-xl font-extrabold text-[#20243A] mt-1">
              FOCUS ZONE AI: Intelligent Study Management and Distraction Prediction System
            </h2>
            <p className="text-xs text-[#777D90] mt-1">
              Candidate: Ayaan Ansari · Package: <code className="text-[#8B72E8] font-mono">com.example.focuszone_app</code>
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#20243A] mb-1.5">1. Project Overview & Problem Statement</h3>
              <p className="text-[#777D90] leading-relaxed">
                Modern students face severe cognitive fragmentation caused by ubiquitous smartphone notifications, social media algorithms (short-form video loops), and lack of objective productivity tracking. Focus Zone AI bridges Android application engineering, local SQLite persistence (Room), and supervised Machine Learning (Random Forest & Logistic Regression) to actively forecast study session abandonment before it occurs and provide data-grounded intervention strategies.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#20243A] mb-1.5">2. Key Objectives</h3>
              <ul className="list-disc list-inside space-y-1 text-[#777D90]">
                <li>Implement a full-featured Pomodoro study timer with automated session persistence and circadian logging.</li>
                <li>Track mobile distraction events and foreground app switching using Android's <code className="text-[#8B72E8]">UsageStatsManager</code>.</li>
                <li>Design an 11-feature structured tabular dataset capturing physiological and temporal study habits.</li>
                <li>Train, compare, and deploy supervised classifiers (Random Forest achieving 90.6% accuracy, ROC-AUC 0.954).</li>
                <li>Develop a modular FastAPI backend with Pydantic validation and OpenAPI contract schemas.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#20243A] mb-1.5">3. Methodology & Innovation</h3>
              <p className="text-[#777D90] leading-relaxed">
                The application follows MVVM Clean Architecture with Unidirectional Data Flow (UDF). In contrast to static rule engines, the study session completion predictor evaluates non-linear correlations between circadian start hours, 7-day habit consistency, and phone check frequencies.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Doc 2: UML Diagrams */}
      {activeDoc === 'uml' && (
        <div className="p-6 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs space-y-6">
          <div className="border-b border-[#E8EAF0] pb-4">
            <h3 className="text-base font-bold text-[#20243A]">Software Engineering UML Diagrams</h3>
            <p className="text-xs text-[#777D90]">Class Diagram, Use Case Model, and Real-time Sequence Execution</p>
          </div>

          <div className="space-y-6">
            {/* Sequence Diagram */}
            <div className="p-4 rounded-xl bg-[#F8F9FC] border border-[#E8EAF0] space-y-3 font-mono text-xs">
              <span className="text-[#8B72E8] font-bold">Sequence Diagram: ML Session Prediction & Execution</span>
              <pre className="p-3 bg-white border border-[#E8EAF0] rounded-lg text-[#20243A] overflow-x-auto leading-relaxed">
{`Student              TimerScreen            TimerViewModel         StudyRepository          ML Engine (FastAPI)
   |                      |                       |                       |                          |
   |--- Select Subject -->|                       |                       |                          |
   |--- Click Start ----->|--- startTimer() ----->|                       |                          |
   |                      |                       |--- predictSession() ->|--- POST /predict-comp -->|
   |                      |                       |                       |<-- Prob: 91%, Low Risk---|
   |                      |<-- Update Forecast ---|                       |                          |
   |                      |    (Display 91% Ring) |                       |                          |
   |                      |                       |                       |                          |
   |-[Switches to IG]---->|--- detectBlur() ----->|                       |                          |
   |                      |    incrementCounter   |                       |                          |
   |                      |                       |                       |                          |
   |-- Session Done ----->|--- onComplete() ----->|                       |                          |
   |                      |                       |--- saveSession() ---->|--- INSERT INTO Room ----->|
   |                      |<-- Show Complete -----|                       |                          |`}
              </pre>
            </div>

            {/* Use Case Summary */}
            <div className="p-4 rounded-xl bg-[#F8F9FC] border border-[#E8EAF0] space-y-2 text-xs">
              <span className="text-[#8B72E8] font-bold">Actor: Student / Learner</span>
              <div className="grid grid-cols-2 gap-2 text-[#777D90]">
                <div>• UC-01: Start / Pause Pomodoro Session</div>
                <div>• UC-02: View Real-Time ML Completion Odds</div>
                <div>• UC-03: Manage Priority Study Tasks</div>
                <div>• UC-04: Monitor Distracting App Screen Time</div>
                <div>• UC-05: Review Circadian Productivity Trends</div>
                <div>• UC-06: Export Standardized CSV Dataset</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Doc 3: Presentation Slides Outline */}
      {activeDoc === 'slides' && (
        <div className="p-6 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs space-y-4 text-xs">
          <div className="border-b border-[#E8EAF0] pb-4">
            <h3 className="text-base font-bold text-[#20243A]">Major Project Defense Presentation Outline (12 Slides)</h3>
            <p className="text-[#777D90]">Slide-by-slide structure for viva voce defense and evaluator demo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { num: 'Slide 1', title: 'Title & Team', content: 'Focus Zone AI, Project Advisor, Major Project Scope' },
              { num: 'Slide 2', title: 'Problem Definition', content: 'Study Fragmentation, Mobile App Breaches, Passive Timers' },
              { num: 'Slide 3', title: 'Proposed Solution', content: 'ML-Powered Android Productivity with Real Predictive Intelligence' },
              { num: 'Slide 4', title: 'System Architecture', content: 'Jetpack Compose + MVVM + Room + FastAPI + Scikit-Learn' },
              { num: 'Slide 5', title: 'Dataset Design', content: '11 Features: Durations, Interruptions, Hour, Consistency, Label' },
              { num: 'Slide 6', title: 'Feature Engineering', content: 'Circadian Bins, Z-Score Scaling, Habit Momentum Indices' },
              { num: 'Slide 7', title: 'ML Model 1: Completion', content: 'Random Forest (90.6%) vs Logistic Regression (82.3%)' },
              { num: 'Slide 8', title: 'Model Evaluation', content: 'Confusion Matrix, Precision/Recall, ROC-AUC Curve Analysis' },
              { num: 'Slide 9', title: 'Android Implementation', content: 'StateFlow, Room DB, Foreground Service, UsageStatsManager' },
              { num: 'Slide 10', title: 'FastAPI Backend', content: 'REST Endpoints, Pydantic Serialization, Joblib Serving' },
              { num: 'Slide 11', title: 'Live Demonstration', content: 'Focus Timer, Live Interruption Simulation, Real-time Forecast' },
              { num: 'Slide 12', title: 'Conclusion & Future Work', content: 'On-device TFLite Quantization, Multi-user Sync' },
            ].map((slide) => (
              <div key={slide.num} className="p-3.5 rounded-xl bg-[#F8F9FC] border border-[#E8EAF0]">
                <div className="flex items-center justify-between text-[#8B72E8] font-bold mb-1">
                  <span>{slide.num}</span>
                  <span className="text-[10px] text-[#777D90] font-normal">{slide.title}</span>
                </div>
                <p className="text-[#20243A] text-xs">{slide.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
