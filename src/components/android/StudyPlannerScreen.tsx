import React, { useState } from 'react';
import { Plus, CheckCircle2, Clock, Trash2, Calendar, BookOpen } from 'lucide-react';
import { StudyTask, Priority } from '../../types';

interface StudyPlannerProps {
  tasks: StudyTask[];
  onAddTask: (task: Omit<StudyTask, 'taskId'>) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export const StudyPlannerScreen: React.FC<StudyPlannerProps> = ({
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'high'>('all');
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // Form State
  const [subject, setSubject] = useState<string>('Machine Learning');
  const [topic, setTopic] = useState<string>('');
  const [priority, setPriority] = useState<Priority>('HIGH');
  const [estimatedMinutes, setEstimatedMinutes] = useState<number>(45);
  const [deadline, setDeadline] = useState<string>('2026-11-10');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    onAddTask({
      userId: 'usr_btech_ds_01',
      subject,
      topic,
      priority,
      deadline,
      status: 'TODO',
      estimatedMinutes,
    });

    setTopic('');
    setIsAdding(false);
  };

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending') return t.status !== 'COMPLETED';
    if (filter === 'completed') return t.status === 'COMPLETED';
    if (filter === 'high') return t.priority === 'HIGH';
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#F8F9FC]">
      {/* Header and Add Task CTA */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#20243A] tracking-tight">Study Planner</h2>
          <p className="text-xs text-[#777D90]">Manage subjects, tasks & deadlines</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="h-9 px-3.5 rounded-xl bg-[#8B72E8] hover:bg-[#7b61df] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Add Task Modal / Accordion */}
      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded-2xl bg-white border border-[#E8EAF0] space-y-3 shadow-md animate-fade-in"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#20243A] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#8B72E8]" />
              New Study Task
            </span>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-xs text-[#777D90] hover:text-[#20243A] cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div>
            <label className="text-[11px] text-[#777D90] block mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Machine Learning"
              required
              className="w-full bg-[#F8F9FC] border border-[#E8EAF0] rounded-xl px-3 py-2 text-xs text-[#20243A] placeholder-[#777D90] focus:outline-none focus:border-[#8B72E8] focus:bg-white"
            />
          </div>

          <div>
            <label className="text-[11px] text-[#777D90] block mb-1">Topic / Chapter</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Random Forest Feature Importance"
              required
              className="w-full bg-[#F8F9FC] border border-[#E8EAF0] rounded-xl px-3 py-2 text-xs text-[#20243A] placeholder-[#777D90] focus:outline-none focus:border-[#8B72E8] focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] text-[#777D90] block mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full bg-[#F8F9FC] border border-[#E8EAF0] rounded-xl px-2 py-2 text-xs text-[#20243A] focus:outline-none focus:border-[#8B72E8] cursor-pointer"
              >
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-[#777D90] block mb-1">Est. Minutes</label>
              <input
                type="number"
                min="5"
                max="300"
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                className="w-full bg-[#F8F9FC] border border-[#E8EAF0] rounded-xl px-3 py-2 text-xs text-[#20243A] focus:outline-none focus:border-[#8B72E8]"
              />
            </div>

            <div>
              <label className="text-[11px] text-[#777D90] block mb-1">Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-[#F8F9FC] border border-[#E8EAF0] rounded-xl px-2 py-2 text-xs text-[#20243A] focus:outline-none focus:border-[#8B72E8]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-10 rounded-xl bg-[#8B72E8] hover:bg-[#7b61df] text-white text-xs font-bold transition-transform active:scale-[0.98] cursor-pointer shadow-xs"
          >
            Create Task
          </button>
        </form>
      )}

      {/* Filter Tabs with Lavender Highlights */}
      <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-[#E8EAF0] shadow-xs">
        {(['all', 'pending', 'high', 'completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors cursor-pointer ${
              filter === tab ? 'bg-[#8B72E8] text-white shadow-xs' : 'text-[#777D90] hover:text-[#20243A]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Task List: White Cards with Green Completed Indicators */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="py-12 text-center text-[#777D90] text-xs space-y-1 bg-white rounded-2xl border border-[#E8EAF0]">
            <p>No study tasks found for this filter.</p>
            <p className="text-[11px]">Click "Add Task" to plan your next session.</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isDone = task.status === 'COMPLETED';

            return (
              <div
                key={task.taskId}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isDone
                    ? 'bg-[#F8F9FC] border-[#E8EAF0] opacity-65'
                    : 'bg-white border-[#E8EAF0] hover:border-[#8B72E8]/40 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <button
                      onClick={() => onToggleTask(task.taskId)}
                      className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                        isDone
                          ? 'bg-[#55A987] border-[#55A987] text-white'
                          : 'border-[#D4D7E5] hover:border-[#8B72E8]'
                      }`}
                    >
                      {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </button>

                    <div className="min-w-0">
                      <h4
                        className={`text-xs font-semibold leading-snug ${
                          isDone ? 'line-through text-[#777D90]' : 'text-[#20243A]'
                        }`}
                      >
                        {task.topic}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#777D90]">
                        <span className="font-semibold text-[#8B72E8]">{task.subject}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3 text-[#777D90]" />
                          {task.estimatedMinutes}m
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3 text-[#777D90]" />
                          {task.deadline}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase font-mono ${
                        task.priority === 'HIGH'
                          ? 'bg-rose-50 text-rose-600 border border-rose-200'
                          : task.priority === 'MEDIUM'
                          ? 'bg-amber-50 text-amber-600 border border-amber-200'
                          : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                      }`}
                    >
                      {task.priority}
                    </span>
                    <button
                      onClick={() => onDeleteTask(task.taskId)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[#777D90] hover:text-rose-500 hover:bg-[#F8F9FC] transition-colors cursor-pointer"
                      title="Delete task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
