import { User, StudySession, StudyTask, StudyGoal, UserPreferences, DistractingAppStat, DistractionEvent } from '../types';
import { INITIAL_USER, INITIAL_GOAL, INITIAL_PREFERENCES, INITIAL_TASKS, INITIAL_SESSIONS, INITIAL_DISTRACTING_APPS } from './mockData';

const STORAGE_KEYS = {
  USER: 'focus_zone_user',
  SESSIONS: 'focus_zone_sessions',
  TASKS: 'focus_zone_tasks',
  GOAL: 'focus_zone_goal',
  PREFERENCES: 'focus_zone_preferences',
  DISTRACTING_APPS: 'focus_zone_distracting_apps',
};

class LocalDatabase {
  private get<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage write error:', e);
    }
  }

  // User
  getUser(): User {
    return this.get<User>(STORAGE_KEYS.USER, INITIAL_USER);
  }

  saveUser(user: User): void {
    this.set(STORAGE_KEYS.USER, user);
  }

  // Sessions
  getSessions(): StudySession[] {
    return this.get<StudySession[]>(STORAGE_KEYS.SESSIONS, INITIAL_SESSIONS);
  }

  saveSession(session: StudySession): void {
    const sessions = this.getSessions();
    const updated = [session, ...sessions];
    this.set(STORAGE_KEYS.SESSIONS, updated);
  }

  // Tasks
  getTasks(): StudyTask[] {
    return this.get<StudyTask[]>(STORAGE_KEYS.TASKS, INITIAL_TASKS);
  }

  addTask(task: Omit<StudyTask, 'taskId'>): StudyTask {
    const tasks = this.getTasks();
    const newTask: StudyTask = {
      ...task,
      taskId: `task_${Date.now()}`,
    };
    this.set(STORAGE_KEYS.TASKS, [newTask, ...tasks]);
    return newTask;
  }

  updateTask(taskId: string, updates: Partial<StudyTask>): void {
    const tasks = this.getTasks().map(t => (t.taskId === taskId ? { ...t, ...updates } : t));
    this.set(STORAGE_KEYS.TASKS, tasks);
  }

  deleteTask(taskId: string): void {
    const tasks = this.getTasks().filter(t => t.taskId !== taskId);
    this.set(STORAGE_KEYS.TASKS, tasks);
  }

  // Goal
  getGoal(): StudyGoal {
    return this.get<StudyGoal>(STORAGE_KEYS.GOAL, INITIAL_GOAL);
  }

  updateGoal(updates: Partial<StudyGoal>): void {
    const current = this.getGoal();
    this.set(STORAGE_KEYS.GOAL, { ...current, ...updates });
  }

  // Preferences
  getPreferences(): UserPreferences {
    return this.get<UserPreferences>(STORAGE_KEYS.PREFERENCES, INITIAL_PREFERENCES);
  }

  updatePreferences(updates: Partial<UserPreferences>): void {
    const current = this.getPreferences();
    this.set(STORAGE_KEYS.PREFERENCES, { ...current, ...updates });
  }

  // Distraction Apps
  getDistractingApps(): DistractingAppStat[] {
    return this.get<DistractingAppStat[]>(STORAGE_KEYS.DISTRACTING_APPS, INITIAL_DISTRACTING_APPS);
  }

  incrementAppDistraction(packageName: string, secondsSpent: number): void {
    const apps = this.getDistractingApps().map(app => {
      if (app.packageName === packageName) {
        return {
          ...app,
          timeSpentMinutes: app.timeSpentMinutes + Math.round(secondsSpent / 60),
          launchesDuringFocus: app.launchesDuringFocus + 1,
        };
      }
      return app;
    });
    this.set(STORAGE_KEYS.DISTRACTING_APPS, apps);
  }

  /**
   * Section 6 Dataset Export:
   * user_id,session_id,planned_duration,actual_duration,interruption_count,
   * start_hour,break_duration,previous_completion_rate,study_consistency,
   * day_of_week,completed
   */
  exportDatasetCsv(): string {
    const sessions = this.getSessions();
    const headers = [
      'user_id',
      'session_id',
      'planned_duration',
      'actual_duration',
      'interruption_count',
      'start_hour',
      'break_duration',
      'previous_completion_rate',
      'study_consistency',
      'day_of_week',
      'completed'
    ];

    const rows = sessions.map(s => [
      s.userId,
      s.sessionId,
      s.plannedDuration,
      s.actualDuration,
      s.interruptionCount,
      s.startHour,
      s.breakDuration,
      s.previousCompletionRate.toFixed(2),
      s.studyConsistency.toFixed(2),
      s.dayOfWeek,
      s.completed ? 1 : 0
    ].join(','));

    return [headers.join(','), ...rows].join('\n');
  }

  resetToDefaults(): void {
    this.set(STORAGE_KEYS.USER, INITIAL_USER);
    this.set(STORAGE_KEYS.SESSIONS, INITIAL_SESSIONS);
    this.set(STORAGE_KEYS.TASKS, INITIAL_TASKS);
    this.set(STORAGE_KEYS.GOAL, INITIAL_GOAL);
    this.set(STORAGE_KEYS.PREFERENCES, INITIAL_PREFERENCES);
    this.set(STORAGE_KEYS.DISTRACTING_APPS, INITIAL_DISTRACTING_APPS);
  }
}

export const db = new LocalDatabase();
