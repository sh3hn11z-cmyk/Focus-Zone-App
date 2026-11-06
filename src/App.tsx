import React, { useState } from 'react';
import { Smartphone, LayoutGrid, Terminal, Database, Brain, FileText, CheckCircle2, Flame, Maximize2, Minimize2, LogOut, RefreshCw } from 'lucide-react';
import { DeviceFrame } from './components/android/DeviceFrame';
import { TopAppBar } from './components/android/TopAppBar';
import { BottomNavigationBar, ScreenTab } from './components/android/BottomNavigationBar';
import { SplashScreen } from './components/android/SplashScreen';
import { OnboardingScreen } from './components/android/OnboardingScreen';
import { AuthScreen } from './components/android/AuthScreen';
import { DashboardScreen } from './components/android/DashboardScreen';
import { FocusTimerScreen } from './components/android/FocusTimerScreen';
import { StudyPlannerScreen } from './components/android/StudyPlannerScreen';
import { DistractionScreen } from './components/android/DistractionScreen';
import { AnalyticsScreen } from './components/android/AnalyticsScreen';
import { AiAssistantScreen } from './components/android/AiAssistantScreen';
import { ProfileScreen } from './components/android/ProfileScreen';

import { ArchitectureViewer } from './components/project/ArchitectureViewer';
import { AndroidCodeBrowser } from './components/project/AndroidCodeBrowser';
import { MlBenchmarkViewer } from './components/project/MlBenchmarkViewer';
import { FastApiDocViewer } from './components/project/FastApiDocViewer';
import { DatasetExplorer } from './components/project/DatasetExplorer';
import { ProjectDocsViewer } from './components/project/ProjectDocsViewer';

import { db } from './data/db';
import { User, StudySession, StudyTask, StudyGoal, UserPreferences, DistractingAppStat } from './types';

type AndroidAppState = 'splash' | 'onboarding' | 'auth' | 'main';

export default function App() {
  // Navigation State
  const [workspaceMode, setWorkspaceMode] = useState<'android_app' | 'engineering_hub'>('android_app');
  const [hubSection, setHubSection] = useState<'architecture' | 'android_code' | 'ml_models' | 'dataset' | 'fastapi' | 'docs'>('architecture');

  // Android Navigation & Frame State
  const [appState, setAppState] = useState<AndroidAppState>('main');
  const [currentTab, setCurrentTab] = useState<ScreenTab>('dashboard');
  const [isFramed, setIsFramed] = useState<boolean>(true);

  // App Database State
  const [user, setUser] = useState<User>(() => db.getUser());
  const [sessions, setSessions] = useState<StudySession[]>(() => db.getSessions());
  const [tasks, setTasks] = useState<StudyTask[]>(() => db.getTasks());
  const [goal, setGoal] = useState<StudyGoal>(() => db.getGoal());
  const [preferences, setPreferences] = useState<UserPreferences>(() => db.getPreferences());
  const [distractingApps, setDistractingApps] = useState<DistractingAppStat[]>(() => db.getDistractingApps());

  // Task Handlers
  const handleAddTask = (newTask: Omit<StudyTask, 'taskId'>) => {
    const created = db.addTask(newTask);
    setTasks(db.getTasks());
  };

  const handleToggleTask = (taskId: string) => {
    const task = tasks.find(t => t.taskId === taskId);
    if (!task) return;
    const newStatus = task.status === 'COMPLETED' ? 'TODO' : 'COMPLETED';
    db.updateTask(taskId, {
      status: newStatus,
      completedAt: newStatus === 'COMPLETED' ? new Date().toISOString() : undefined,
    });
    setTasks(db.getTasks());
  };

  const handleDeleteTask = (taskId: string) => {
    db.deleteTask(taskId);
    setTasks(db.getTasks());
  };

  // Session Handlers
  const handleSessionComplete = (session: StudySession) => {
    db.saveSession(session);
    setSessions(db.getSessions());
  };

  // Distraction Trigger Handler
  const handleSimulateDistraction = (packageName: string) => {
    db.incrementAppDistraction(packageName, 180); // 3 mins spent
    setDistractingApps(db.getDistractingApps());
  };

  // Goal & Preference Handlers
  const handleUpdateGoal = (updates: Partial<StudyGoal>) => {
    db.updateGoal(updates);
    setGoal(db.getGoal());
  };

  const handleUpdatePreferences = (updates: Partial<UserPreferences>) => {
    db.updatePreferences(updates);
    setPreferences(db.getPreferences());
  };

  const handleResetData = () => {
    db.resetToDefaults();
    setUser(db.getUser());
    setSessions(db.getSessions());
    setTasks(db.getTasks());
    setGoal(db.getGoal());
    setPreferences(db.getPreferences());
    setDistractingApps(db.getDistractingApps());
  };

  // Render Screen in Android Emulator
  const renderAndroidScreen = () => {
    if (appState === 'splash') {
      return <SplashScreen onFinish={() => setAppState('main')} />;
    }
    if (appState === 'onboarding') {
      return <OnboardingScreen onComplete={() => setAppState('main')} />;
    }
    if (appState === 'auth') {
      return (
        <AuthScreen
          onLoginSuccess={(newUser) => {
            setUser(newUser);
            db.saveUser(newUser);
            setAppState('main');
          }}
        />
      );
    }

    switch (currentTab) {
      case 'dashboard':
        return (
          <DashboardScreen
            sessions={sessions}
            tasks={tasks}
            goal={goal}
            onNavigate={(tab) => setCurrentTab(tab)}
            onToggleTask={handleToggleTask}
          />
        );
      case 'timer':
        return (
          <FocusTimerScreen
            preferences={preferences}
            onSessionComplete={handleSessionComplete}
          />
        );
      case 'planner':
        return (
          <StudyPlannerScreen
            tasks={tasks}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        );
      case 'distraction':
        return (
          <DistractionScreen
            apps={distractingApps}
            onSimulateDistraction={handleSimulateDistraction}
          />
        );
      case 'analytics':
        return <AnalyticsScreen sessions={sessions} />;
      case 'ai_assistant':
        return <AiAssistantScreen sessions={sessions} tasks={tasks} goal={goal} />;
      case 'profile':
        return (
          <ProfileScreen
            user={user}
            goal={goal}
            preferences={preferences}
            onUpdateGoal={handleUpdateGoal}
            onUpdatePreferences={handleUpdatePreferences}
            onResetData={handleResetData}
          />
        );
      default:
        return null;
    }
  };

  // Get current screen title
  const getScreenTitle = () => {
    switch (currentTab) {
      case 'dashboard':
        return { title: 'Focus Zone AI', subtitle: 'Home Dashboard' };
      case 'timer':
        return { title: 'Pomodoro Focus Timer', subtitle: 'Deep Work Session' };
      case 'planner':
        return { title: 'Study Planner', subtitle: 'Schedules & Priorities' };
      case 'distraction':
        return { title: 'Distraction Monitoring', subtitle: 'Usage Access & Breaches' };
      case 'analytics':
        return { title: 'Productivity Analytics', subtitle: 'Habit Trends & Ratios' };
      case 'ai_assistant':
        return { title: 'AI Study Assistant', subtitle: 'Machine Learning Insights' };
      case 'profile':
        return { title: 'Profile & Targets', subtitle: 'Daily & Weekly Goals' };
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-[#20243A] flex flex-col antialiased selection:bg-[#8B72E8]/20">
      {/* Top Workspace Header (Clean Light Theme Bar) */}
      <header className="h-14 px-4 sm:px-6 bg-white border-b border-[#E8EAF0] flex items-center justify-between shrink-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#8B72E8] flex items-center justify-center font-black text-sm text-white shadow-xs">
            FZ
          </div>
          <div>
            <h1 className="text-sm font-bold text-[#20243A] tracking-tight flex items-center gap-2">
              Focus Zone AI
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F3F0FD] text-[#8B72E8] border border-[#8B72E8]/20">
                Light Theme · com.example.focuszone_app
              </span>
            </h1>
            <p className="text-[11px] text-[#777D90] hidden md:block">
              Intelligent Study Management & Distraction Prediction System
            </p>
          </div>
        </div>

        {/* Quick Screen Preview Switcher & Mode Toggles */}
        <div className="flex items-center gap-2">
          {workspaceMode === 'android_app' && (
            <div className="hidden lg:flex items-center gap-1 p-0.5 bg-[#F8F9FC] rounded-lg border border-[#E8EAF0] text-xs">
              <button
                onClick={() => setAppState('splash')}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  appState === 'splash' ? 'bg-[#8B72E8] text-white' : 'text-[#777D90] hover:text-[#20243A]'
                }`}
              >
                Splash
              </button>
              <button
                onClick={() => setAppState('onboarding')}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  appState === 'onboarding' ? 'bg-[#8B72E8] text-white' : 'text-[#777D90] hover:text-[#20243A]'
                }`}
              >
                Onboarding
              </button>
              <button
                onClick={() => setAppState('auth')}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  appState === 'auth' ? 'bg-[#8B72E8] text-white' : 'text-[#777D90] hover:text-[#20243A]'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setAppState('main')}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  appState === 'main' ? 'bg-[#8B72E8] text-white' : 'text-[#777D90] hover:text-[#20243A]'
                }`}
              >
                Main App
              </button>
            </div>
          )}

          {/* Workspace Mode Switcher (Android Emulator vs Project Hub) */}
          <div className="flex items-center p-1 bg-[#F8F9FC] rounded-xl border border-[#E8EAF0]">
            <button
              onClick={() => setWorkspaceMode('android_app')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                workspaceMode === 'android_app'
                  ? 'bg-[#8B72E8] text-white shadow-xs'
                  : 'text-[#777D90] hover:text-[#20243A]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android App</span>
            </button>
            <button
              onClick={() => setWorkspaceMode('engineering_hub')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                workspaceMode === 'engineering_hub'
                  ? 'bg-[#8B72E8] text-white shadow-xs'
                  : 'text-[#777D90] hover:text-[#20243A]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Project Hub</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-1 overflow-auto flex flex-col bg-[#F8F9FC]">
        {workspaceMode === 'android_app' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4">
            <DeviceFrame isFramed={isFramed} onToggleFrame={() => setIsFramed(!isFramed)}>
              {appState === 'main' ? (
                <>
                  {/* Material 3 Top App Bar */}
                  <TopAppBar
                    title={getScreenTitle().title}
                    subtitle={getScreenTitle().subtitle}
                    showBack={currentTab === 'ai_assistant' || currentTab === 'profile'}
                    onBack={() => setCurrentTab('dashboard')}
                    onOpenAiAssistant={() => setCurrentTab('ai_assistant')}
                    onOpenProfile={() => setCurrentTab('profile')}
                    streakDays={goal.streakDays}
                    currentTab={currentTab}
                  />

                  {/* Dynamic Screen Container */}
                  {renderAndroidScreen()}

                  {/* Material 3 Bottom Navigation Bar */}
                  <BottomNavigationBar
                    currentTab={currentTab}
                    onSelectTab={(tab) => setCurrentTab(tab)}
                  />
                </>
              ) : (
                renderAndroidScreen()
              )}
            </DeviceFrame>
          </div>
        ) : (
          /* B.Tech Major Project Engineering Hub */
          <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
            {/* Hub Sub-navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-[#E8EAF0]">
              {[
                { id: 'architecture', label: '1. Architecture & MVVM', icon: LayoutGrid },
                { id: 'android_code', label: '2. Kotlin Source Code', icon: Terminal },
                { id: 'ml_models', label: '3. ML Benchmarks & Inference', icon: Brain },
                { id: 'dataset', label: '4. Section 6 Dataset & CSV', icon: Database },
                { id: 'fastapi', label: '5. FastAPI Cloud Backend', icon: ServerIcon },
                { id: 'docs', label: '6. Synopsis, UML & Slides', icon: FileText },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = hubSection === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setHubSection(tab.id as any)}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-[#8B72E8] text-white shadow-xs'
                        : 'bg-white text-[#777D90] hover:text-[#20243A] border border-[#E8EAF0]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Hub Section Content */}
            {hubSection === 'architecture' && <ArchitectureViewer />}
            {hubSection === 'android_code' && <AndroidCodeBrowser />}
            {hubSection === 'ml_models' && <MlBenchmarkViewer />}
            {hubSection === 'dataset' && <DatasetExplorer sessions={sessions} />}
            {hubSection === 'fastapi' && <FastApiDocViewer />}
            {hubSection === 'docs' && <ProjectDocsViewer />}
          </div>
        )}
      </main>
    </div>
  );
}

function ServerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
}
