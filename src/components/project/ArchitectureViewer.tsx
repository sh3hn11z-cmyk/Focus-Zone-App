import React, { useState } from 'react';
import { Layers, Database, Cpu, Smartphone, Server, ArrowRight, CheckCircle2, GitBranch } from 'lucide-react';

export const ArchitectureViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mvvm' | 'system' | 'ml_pipeline' | 'db_schema'>('mvvm');

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-[#E8EAF0] shadow-xs max-w-xl">
        <button
          onClick={() => setActiveTab('mvvm')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'mvvm' ? 'bg-[#8B72E8] text-white shadow-xs' : 'text-[#777D90] hover:text-[#20243A]'
          }`}
        >
          Android MVVM
        </button>
        <button
          onClick={() => setActiveTab('system')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'system' ? 'bg-[#8B72E8] text-white shadow-xs' : 'text-[#777D90] hover:text-[#20243A]'
          }`}
        >
          System Topology
        </button>
        <button
          onClick={() => setActiveTab('ml_pipeline')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'ml_pipeline' ? 'bg-[#8B72E8] text-white shadow-xs' : 'text-[#777D90] hover:text-[#20243A]'
          }`}
        >
          ML Pipeline
        </button>
        <button
          onClick={() => setActiveTab('db_schema')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'db_schema' ? 'bg-[#8B72E8] text-white shadow-xs' : 'text-[#777D90] hover:text-[#20243A]'
          }`}
        >
          Room ER Schema
        </button>
      </div>

      {/* Tab 1: Android MVVM & Clean Architecture */}
      {activeTab === 'mvvm' && (
        <div className="p-6 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#E8EAF0] pb-4">
            <div>
              <h3 className="text-base font-bold text-[#20243A]">Android Jetpack Compose MVVM + Clean Architecture</h3>
              <p className="text-xs text-[#777D90]">Unidirectional Data Flow (UDF) with Kotlin Coroutines & StateFlow</p>
            </div>
            <span className="px-2.5 py-1 text-xs font-mono font-bold bg-[#F3F0FD] text-[#8B72E8] rounded-lg border border-[#8B72E8]/20">
              Clean Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Layer 1: UI Layer */}
            <div className="p-4 rounded-xl bg-[#F8F9FC] border border-[#E8EAF0] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8B72E8]">
                <Smartphone className="w-4 h-4" />
                <span>1. UI LAYER (Compose)</span>
              </div>
              <ul className="text-xs text-[#777D90] space-y-1.5">
                <li className="text-[#20243A] font-medium">• Jetpack Compose Screens</li>
                <li>• DashboardScreen.kt</li>
                <li>• FocusTimerScreen.kt</li>
                <li>• StudyPlannerScreen.kt</li>
                <li>• DistractionScreen.kt</li>
                <li>• AnalyticsScreen.kt</li>
                <li>• Material 3 Light Theme</li>
              </ul>
            </div>

            {/* Layer 2: ViewModel Layer */}
            <div className="p-4 rounded-xl bg-[#F8F9FC] border border-[#E8EAF0] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8B72E8]">
                <Layers className="w-4 h-4" />
                <span>2. VIEWMODEL (State)</span>
              </div>
              <ul className="text-xs text-[#777D90] space-y-1.5">
                <li className="text-[#20243A] font-medium">• StateFlow&lt;UiState&gt;</li>
                <li>• TimerViewModel.kt</li>
                <li>• DashboardViewModel.kt</li>
                <li>• PlannerViewModel.kt</li>
                <li>• AnalyticsViewModel.kt</li>
                <li>• viewModelScope.launch</li>
                <li>• Unidirectional Data Flow</li>
              </ul>
            </div>

            {/* Layer 3: Domain & Repository */}
            <div className="p-4 rounded-xl bg-[#F8F9FC] border border-[#E8EAF0] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600">
                <GitBranch className="w-4 h-4" />
                <span>3. REPOSITORY PATTERN</span>
              </div>
              <ul className="text-xs text-[#777D90] space-y-1.5">
                <li className="text-[#20243A] font-medium">• Single Source of Truth</li>
                <li>• StudyRepository.kt</li>
                <li>• AuthRepository.kt</li>
                <li>• MlRepository.kt</li>
                <li>• Offline-first synchronization</li>
                <li>• Local cache fallback</li>
              </ul>
            </div>

            {/* Layer 4: Data Layer */}
            <div className="p-4 rounded-xl bg-[#F8F9FC] border border-[#E8EAF0] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#55A987]">
                <Database className="w-4 h-4" />
                <span>4. DATA SOURCES</span>
              </div>
              <ul className="text-xs text-[#777D90] space-y-1.5">
                <li className="text-[#20243A] font-medium">• Room SQLite Database</li>
                <li>• FocusZoneDatabase.kt</li>
                <li>• StudySessionDao.kt</li>
                <li>• Retrofit REST Client</li>
                <li>• FastAPI Endpoints</li>
                <li>• UsageStatsManager</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: System Topology */}
      {activeTab === 'system' && (
        <div className="p-6 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs space-y-6">
          <div className="border-b border-[#E8EAF0] pb-4">
            <h3 className="text-base font-bold text-[#20243A]">Full-Stack System Topology</h3>
            <p className="text-xs text-[#777D90]">Android Client + FastAPI Python Backend + Machine Learning Model Pipeline</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
            {/* Box 1 */}
            <div className="flex-1 w-full p-4 rounded-xl bg-[#F8F9FC] border border-[#E8EAF0] text-center space-y-2">
              <Smartphone className="w-8 h-8 text-[#8B72E8] mx-auto" />
              <h4 className="text-sm font-bold text-[#20243A]">Android Mobile App</h4>
              <p className="text-xs text-[#777D90]">Kotlin, Jetpack Compose, Room Database, UsageStatsManager</p>
            </div>

            <div className="flex flex-col items-center text-[#8B72E8] shrink-0">
              <span className="text-[10px] font-mono font-semibold">HTTPS / JSON</span>
              <ArrowRight className="w-5 h-5 hidden md:block" />
            </div>

            {/* Box 2 */}
            <div className="flex-1 w-full p-4 rounded-xl bg-[#F8F9FC] border border-[#E8EAF0] text-center space-y-2">
              <Server className="w-8 h-8 text-[#8B72E8] mx-auto" />
              <h4 className="text-sm font-bold text-[#20243A]">FastAPI Cloud Backend</h4>
              <p className="text-xs text-[#777D90]">Python, Pydantic, JWT Auth, REST APIs, ML Inference Service</p>
            </div>

            <div className="flex flex-col items-center text-[#55A987] shrink-0">
              <span className="text-[10px] font-mono font-semibold">Joblib Model</span>
              <ArrowRight className="w-5 h-5 hidden md:block" />
            </div>

            {/* Box 3 */}
            <div className="flex-1 w-full p-4 rounded-xl bg-[#F8F9FC] border border-[#E8EAF0] text-center space-y-2">
              <Cpu className="w-8 h-8 text-[#55A987] mx-auto" />
              <h4 className="text-sm font-bold text-[#20243A]">Data Science & ML Engine</h4>
              <p className="text-xs text-[#777D90]">Scikit-learn, Random Forest, Logistic Regression, Feature Scaler</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: ML Pipeline */}
      {activeTab === 'ml_pipeline' && (
        <div className="p-6 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs space-y-4">
          <div className="border-b border-[#E8EAF0] pb-4">
            <h3 className="text-base font-bold text-[#20243A]">Machine Learning Training & Prediction Pipeline</h3>
            <p className="text-xs text-[#777D90]">How study sessions are transformed into completion probability</p>
          </div>

          <div className="space-y-3">
            {[
              {
                step: '1. Data Collection',
                desc: 'Captures session records via Room DB: planned duration, actual duration, interruption count, start hour, break length.',
              },
              {
                step: '2. Feature Engineering & Scaling',
                desc: 'Computes historical completion rate, 7-day consistency index, circadian hour binning, and applies StandardScaler z-scores.',
              },
              {
                step: '3. Model Training & Cross-Validation',
                desc: 'Trains Logistic Regression (L2 penalty) and Random Forest (100 estimators, max depth 8) with 5-fold stratified cross-validation.',
              },
              {
                step: '4. Evaluation & Serialization',
                desc: 'Evaluates Accuracy, Precision, Recall, F1, ROC-AUC. Best model serialized with Joblib for FastAPI deployment.',
              },
              {
                step: '5. Real-Time Inference & Explainability',
                desc: 'Returns completion probability %, risk category (Low/Medium/High), and actionable recommendations based on feature weights.',
              },
            ].map((s, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#F8F9FC] border border-[#E8EAF0] flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#F3F0FD] text-[#8B72E8] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <h5 className="text-xs font-bold text-[#20243A]">{s.step}</h5>
                  <p className="text-xs text-[#777D90] mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Room Database Schema */}
      {activeTab === 'db_schema' && (
        <div className="p-6 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs space-y-4">
          <div className="border-b border-[#E8EAF0] pb-4">
            <h3 className="text-base font-bold text-[#20243A]">Room Database Entity-Relationship Schema</h3>
            <p className="text-xs text-[#777D90]">SQLite relational tables defined for Android persistence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-[#F8F9FC] border border-[#E8EAF0] space-y-2">
              <span className="text-[#8B72E8] font-bold">@Entity(tableName = "study_sessions")</span>
              <ul className="text-[#777D90] space-y-1">
                <li><span className="text-[#20243A] font-semibold">@PrimaryKey</span> session_id: String</li>
                <li>user_id: String</li>
                <li>planned_duration: Int (min)</li>
                <li>actual_duration: Int (min)</li>
                <li>interruption_count: Int</li>
                <li>start_hour: Int (0-23)</li>
                <li>break_duration: Int (min)</li>
                <li>previous_completion_rate: Float</li>
                <li>study_consistency: Float</li>
                <li>day_of_week: Int (0-6)</li>
                <li>completed: Boolean</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F9FC] border border-[#E8EAF0] space-y-2">
              <span className="text-[#8B72E8] font-bold">@Entity(tableName = "study_tasks")</span>
              <ul className="text-[#777D90] space-y-1">
                <li><span className="text-[#20243A] font-semibold">@PrimaryKey</span> task_id: String</li>
                <li>user_id: String</li>
                <li>subject: String</li>
                <li>topic: String</li>
                <li>priority: String (HIGH/MED/LOW)</li>
                <li>deadline: String (YYYY-MM-DD)</li>
                <li>status: String (TODO/IN_PROGRESS/DONE)</li>
                <li>estimated_minutes: Int</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
