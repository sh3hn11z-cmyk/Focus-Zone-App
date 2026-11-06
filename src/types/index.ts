export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface StudySession {
  sessionId: string;
  userId: string;
  subject: string;
  plannedDuration: number; // in minutes
  actualDuration: number;  // in minutes
  interruptionCount: number;
  startHour: number;       // 0 - 23
  breakDuration: number;   // in minutes
  previousCompletionRate: number; // 0.0 - 1.0
  studyConsistency: number;       // 0.0 - 1.0
  dayOfWeek: number;              // 0 (Sun) - 6 (Sat)
  completed: boolean;
  startTime: string;       // ISO string
  endTime: string;         // ISO string
  distractions: DistractionEvent[];
}

export interface DistractionEvent {
  id: string;
  timestamp: string;
  appName: string;
  durationSeconds: number;
  type: 'app_switch' | 'tab_blur' | 'idle' | 'manual';
}

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';

export interface StudyTask {
  taskId: string;
  userId: string;
  subject: string;
  topic: string;
  priority: Priority;
  deadline: string; // YYYY-MM-DD
  status: TaskStatus;
  estimatedMinutes: number;
  completedAt?: string;
}

export interface StudyGoal {
  goalId: string;
  userId: string;
  dailyTargetMinutes: number;   // e.g. 180 (3 hrs)
  weeklyTargetMinutes: number;  // e.g. 1200 (20 hrs)
  streakDays: number;
}

export interface UserPreferences {
  userId: string;
  preferredStudyDuration: number; // default 25 min
  preferredShortBreak: number;    // default 5 min
  preferredLongBreak: number;     // default 15 min
  notificationEnabled: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  theme: 'dark' | 'amoled';
  trackAppSwitching: boolean;
}

export interface MlFeatures {
  plannedDuration: number;
  previousActualDuration: number;
  interruptionCount: number;
  startHour: number;
  previousCompletionRate: number;
  studyConsistency: number;
  dayOfWeek: number;
}

export interface MlPrediction {
  probability: number; // 0.0 - 1.0
  predictedCompletion: boolean;
  confidenceScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  category: string;
  recommendations: string[];
  featureContributions: {
    feature: string;
    label: string;
    impact: number; // -1.0 to 1.0
    valueDisplay: string;
  }[];
}

export interface ModelMetrics {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
  confusionMatrix: {
    truePositive: number;
    falsePositive: number;
    trueNegative: number;
    falseNegative: number;
  };
}

export interface DistractingAppStat {
  packageName: string;
  appName: string;
  category: 'Social' | 'Entertainment' | 'Gaming' | 'Utility';
  timeSpentMinutes: number;
  launchesDuringFocus: number;
  icon: string;
}
