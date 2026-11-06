import React, { useState } from 'react';
import { Brain, Sliders, CheckCircle, AlertTriangle, TrendingUp, BarChart2 } from 'lucide-react';
import { MlFeatures } from '../../types';
import { runMlPrediction, MODEL_EVALUATION_METRICS } from '../../ml/mlEngine';

export const MlBenchmarkViewer: React.FC = () => {
  // Playground State
  const [features, setFeatures] = useState<MlFeatures>({
    plannedDuration: 45,
    previousActualDuration: 40,
    interruptionCount: 1,
    startHour: 10,
    previousCompletionRate: 0.85,
    studyConsistency: 0.80,
    dayOfWeek: 3,
  });

  const [preferredModel, setPreferredModel] = useState<'random_forest' | 'logistic_regression'>('random_forest');

  const prediction = runMlPrediction(features, preferredModel);

  return (
    <div className="space-y-6">
      {/* Model Benchmark Comparison Table */}
      <div className="p-6 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8EAF0] pb-4">
          <div>
            <h3 className="text-base font-bold text-[#20243A] flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#8B72E8]" />
              Major Project ML Model Benchmarking (N=300 Test Set)
            </h3>
            <p className="text-xs text-[#777D90]">
              Comparison between Logistic Regression (L2) and Random Forest Classifier (100 Trees)
            </p>
          </div>
          <span className="px-3 py-1 text-xs font-mono font-bold bg-[#EBF7F2] text-[#55A987] rounded-lg border border-[#55A987]/30 w-fit">
            Random Forest Wins: +8.3% F1
          </span>
        </div>

        {/* Metrics Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#E8EAF0] text-[#777D90] font-mono">
                <th className="py-2.5 px-3">Model</th>
                <th className="py-2.5 px-3">Accuracy</th>
                <th className="py-2.5 px-3">Precision</th>
                <th className="py-2.5 px-3">Recall</th>
                <th className="py-2.5 px-3">F1-Score</th>
                <th className="py-2.5 px-3">ROC-AUC</th>
                <th className="py-2.5 px-3">Confusion Matrix (TP / FP / TN / FN)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EAF0]">
              <tr className="text-[#20243A] hover:bg-[#F8F9FC]">
                <td className="py-3 px-3 font-semibold text-[#8B72E8]">
                  Random Forest Classifier
                </td>
                <td className="py-3 px-3 font-mono font-bold text-[#55A987]">
                  {(MODEL_EVALUATION_METRICS.randomForest.accuracy * 100).toFixed(1)}%
                </td>
                <td className="py-3 px-3 font-mono">
                  {(MODEL_EVALUATION_METRICS.randomForest.precision * 100).toFixed(1)}%
                </td>
                <td className="py-3 px-3 font-mono">
                  {(MODEL_EVALUATION_METRICS.randomForest.recall * 100).toFixed(1)}%
                </td>
                <td className="py-3 px-3 font-mono font-bold text-[#55A987]">
                  {(MODEL_EVALUATION_METRICS.randomForest.f1Score * 100).toFixed(1)}%
                </td>
                <td className="py-3 px-3 font-mono font-bold text-[#55A987]">
                  {MODEL_EVALUATION_METRICS.randomForest.rocAuc.toFixed(3)}
                </td>
                <td className="py-3 px-3 font-mono text-[#777D90]">
                  139 / 12 / 133 / 16
                </td>
              </tr>
              <tr className="text-[#20243A] hover:bg-[#F8F9FC]">
                <td className="py-3 px-3 font-semibold text-[#20243A]">
                  Logistic Regression
                </td>
                <td className="py-3 px-3 font-mono">
                  {(MODEL_EVALUATION_METRICS.logisticRegression.accuracy * 100).toFixed(1)}%
                </td>
                <td className="py-3 px-3 font-mono">
                  {(MODEL_EVALUATION_METRICS.logisticRegression.precision * 100).toFixed(1)}%
                </td>
                <td className="py-3 px-3 font-mono">
                  {(MODEL_EVALUATION_METRICS.logisticRegression.recall * 100).toFixed(1)}%
                </td>
                <td className="py-3 px-3 font-mono">
                  {(MODEL_EVALUATION_METRICS.logisticRegression.f1Score * 100).toFixed(1)}%
                </td>
                <td className="py-3 px-3 font-mono">
                  {MODEL_EVALUATION_METRICS.logisticRegression.rocAuc.toFixed(3)}
                </td>
                <td className="py-3 px-3 font-mono text-[#777D90]">
                  125 / 24 / 122 / 29
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Interactive Prediction Sandbox */}
      <div className="p-6 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8EAF0] pb-4">
          <div>
            <h3 className="text-base font-bold text-[#20243A] flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#8B72E8]" />
              Interactive Model Inference Sandbox
            </h3>
            <p className="text-xs text-[#777D90]">
              Adjust study session input parameters to observe real-time completion probability and feature influence
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-[#F8F9FC] rounded-xl border border-[#E8EAF0]">
            <button
              onClick={() => setPreferredModel('random_forest')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                preferredModel === 'random_forest' ? 'bg-[#8B72E8] text-white shadow-xs' : 'text-[#777D90] hover:text-[#20243A]'
              }`}
            >
              Random Forest
            </button>
            <button
              onClick={() => setPreferredModel('logistic_regression')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                preferredModel === 'logistic_regression' ? 'bg-[#8B72E8] text-white shadow-xs' : 'text-[#777D90] hover:text-[#20243A]'
              }`}
            >
              Logistic Reg.
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sliders Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Planned Duration */}
            <div>
              <div className="flex justify-between text-xs text-[#777D90] mb-1">
                <span>Planned Session Duration</span>
                <span className="font-mono text-[#20243A] font-bold">{features.plannedDuration} min</span>
              </div>
              <input
                type="range"
                min="15"
                max="120"
                step="5"
                value={features.plannedDuration}
                onChange={(e) => setFeatures({ ...features, plannedDuration: Number(e.target.value) })}
                className="w-full accent-[#8B72E8] cursor-pointer"
              />
            </div>

            {/* Interruptions */}
            <div>
              <div className="flex justify-between text-xs text-[#777D90] mb-1">
                <span>Interruptions (App switches / phone checks)</span>
                <span className="font-mono text-amber-600 font-bold">{features.interruptionCount}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={features.interruptionCount}
                onChange={(e) => setFeatures({ ...features, interruptionCount: Number(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Starting Hour */}
            <div>
              <div className="flex justify-between text-xs text-[#777D90] mb-1">
                <span>Circadian Starting Hour</span>
                <span className="font-mono text-[#20243A] font-bold">{features.startHour}:00</span>
              </div>
              <input
                type="range"
                min="0"
                max="23"
                step="1"
                value={features.startHour}
                onChange={(e) => setFeatures({ ...features, startHour: Number(e.target.value) })}
                className="w-full accent-[#8B72E8] cursor-pointer"
              />
            </div>

            {/* Previous Completion Rate */}
            <div>
              <div className="flex justify-between text-xs text-[#777D90] mb-1">
                <span>Historical Completion Rate</span>
                <span className="font-mono text-[#20243A] font-bold">{Math.round(features.previousCompletionRate * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1.0"
                step="0.05"
                value={features.previousCompletionRate}
                onChange={(e) => setFeatures({ ...features, previousCompletionRate: Number(e.target.value) })}
                className="w-full accent-[#8B72E8] cursor-pointer"
              />
            </div>

            {/* Study Consistency */}
            <div>
              <div className="flex justify-between text-xs text-[#777D90] mb-1">
                <span>Study Habit Consistency (7-Day)</span>
                <span className="font-mono text-[#20243A] font-bold">{Math.round(features.studyConsistency * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1.0"
                step="0.05"
                value={features.studyConsistency}
                onChange={(e) => setFeatures({ ...features, studyConsistency: Number(e.target.value) })}
                className="w-full accent-[#55A987] cursor-pointer"
              />
            </div>
          </div>

          {/* Real-time Inference Result Card */}
          <div className="p-5 rounded-xl bg-[#F8F9FC] border border-[#E8EAF0] flex flex-col justify-between space-y-4 shadow-inner">
            <div>
              <span className="text-xs text-[#777D90] uppercase tracking-wider font-semibold">
                Prediction Output
              </span>
              <div className="my-2">
                <span className="text-4xl font-extrabold font-mono text-[#8B72E8] tabular-nums">
                  {Math.round(prediction.probability * 100)}%
                </span>
                <p className="text-xs text-[#777D90] mt-0.5">Completion Probability</p>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#777D90]">Predicted Category:</span>
                  <span className="font-semibold text-[#20243A]">{prediction.category}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#777D90]">Risk Level:</span>
                  <span
                    className={`font-bold font-mono px-2 py-0.5 rounded text-[10px] ${
                      prediction.riskLevel === 'LOW'
                        ? 'bg-[#EBF7F2] text-[#55A987] border border-[#55A987]/30'
                        : prediction.riskLevel === 'MEDIUM'
                        ? 'bg-amber-50 text-amber-600 border border-amber-200'
                        : 'bg-rose-50 text-rose-600 border border-rose-200'
                    }`}
                  >
                    {prediction.riskLevel} RISK
                  </span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="p-3 rounded-xl bg-white border border-[#E8EAF0] space-y-1 shadow-xs">
              <span className="text-[10px] font-bold text-[#8B72E8] uppercase">
                Model Recommendation
              </span>
              <p className="text-xs text-[#777D90] leading-relaxed">
                {prediction.recommendations[0]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
