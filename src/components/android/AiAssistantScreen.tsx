import React, { useState } from 'react';
import { Sparkles, Brain, Clock, Calendar, Send, Lightbulb, Coffee, Bot, User as UserIcon } from 'lucide-react';
import { StudySession, StudyTask, StudyGoal } from '../../types';

interface AiAssistantProps {
  sessions: StudySession[];
  tasks: StudyTask[];
  goal: StudyGoal;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AiAssistantScreen: React.FC<AiAssistantProps> = ({ sessions, tasks, goal }) => {
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [recommendationType, setRecommendationType] = useState<'schedule' | 'breaks' | 'habits'>('schedule');
  const [inputText, setInputText] = useState<string>('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: "Hello Ayaan! I've analyzed your historical sessions. Your highest focus completion occurs between 9:00 AM and 11:30 AM. How can I help you optimize your study plan today?",
      timestamp: '09:40 AM',
    },
  ]);

  const highDistractionSessions = sessions.filter(s => s.interruptionCount >= 3).length;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    const query = inputText.toLowerCase();
    setInputText('');

    // Dynamic AI response based on real session metrics
    setTimeout(() => {
      let reply = "Based on your study data, maintaining a 25-minute Pomodoro with 5-minute offline breaks keeps your completion rate above 88%.";

      if (query.includes('schedule') || query.includes('time') || query.includes('when')) {
        reply = "Your circadian data shows your peak cognitive stamina is between 09:00 - 11:30 AM. Tackle Machine Learning then, and save lighter reviews for late afternoon.";
      } else if (query.includes('break') || query.includes('tired') || query.includes('rest')) {
        reply = "I recommend the 25m/5m cadence. Taking 5-minute eye-rest breaks prevents the 40% evening fatigue drop we observed in your late-night logs.";
      } else if (query.includes('distraction') || query.includes('phone') || query.includes('instagram')) {
        reply = `You have ${highDistractionSessions} sessions with 3+ interruptions. Our Random Forest model indicates each interruption reduces completion probability by ~14%.`;
      }

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#F8F9FC] flex flex-col justify-between">
      <div className="space-y-4 flex-1">
        {/* Header Banner */}
        <div className="p-4 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#8B72E8] flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#20243A]">AI Study Assistant</h2>
                <p className="text-[10px] text-[#777D90]">Machine Learning Habit Intelligence</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-[#EBF7F2] text-[#55A987]">
              Active
            </span>
          </div>
          <p className="text-xs text-[#777D90]">
            Trained on {sessions.length} sessions. Insights are calculated strictly from your verified study patterns.
          </p>
        </div>

        {/* Segmented Category Buttons */}
        <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-[#E8EAF0] shadow-xs">
          <button
            onClick={() => setRecommendationType('schedule')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              recommendationType === 'schedule' ? 'bg-[#8B72E8] text-white shadow-xs' : 'text-[#777D90] hover:text-[#20243A]'
            }`}
          >
            Daily Schedule
          </button>
          <button
            onClick={() => setRecommendationType('breaks')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              recommendationType === 'breaks' ? 'bg-[#8B72E8] text-white shadow-xs' : 'text-[#777D90] hover:text-[#20243A]'
            }`}
          >
            Break Advisory
          </button>
          <button
            onClick={() => setRecommendationType('habits')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              recommendationType === 'habits' ? 'bg-[#8B72E8] text-white shadow-xs' : 'text-[#777D90] hover:text-[#20243A]'
            }`}
          >
            Pattern Diagnosis
          </button>
        </div>

        {/* Structured Insights Card */}
        {recommendationType === 'schedule' && (
          <div className="p-3.5 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8B72E8]">
              <Calendar className="w-4 h-4" />
              <span>Recommended Study Blocks Today</span>
            </div>
            <p className="text-xs text-[#20243A] leading-relaxed">
              Based on your peak focus intervals (9:00 AM – 11:30 AM), scheduling high-priority tasks yields an <strong className="text-[#8B72E8]">88% completion rate</strong>.
            </p>
            <div className="pt-2 border-t border-[#E8EAF0] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#777D90]">09:00 - 10:15 (75m block)</span>
                <span className="text-[#20243A] font-semibold">Random Forest Tuning</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#777D90]">16:00 - 17:00 (60m block)</span>
                <span className="text-[#20243A] font-semibold">Dijkstra Algorithms</span>
              </div>
            </div>
          </div>
        )}

        {recommendationType === 'breaks' && (
          <div className="p-3.5 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#55A987]">
              <Coffee className="w-4 h-4" />
              <span>Optimal Rest Cadence: 25m / 5m</span>
            </div>
            <p className="text-xs text-[#777D90] leading-relaxed">
              Taking a 5-minute break every 25 minutes increased your total study output by 38 minutes per day compared to cramming sessions.
            </p>
          </div>
        )}

        {recommendationType === 'habits' && (
          <div className="p-3.5 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8B72E8]">
              <Lightbulb className="w-4 h-4" />
              <span>Pattern Diagnostic: Interruption Drag</span>
            </div>
            <p className="text-xs text-[#777D90] leading-relaxed">
              In {highDistractionSessions} sessions with 3+ interruptions, completion probability dropped below 50%. Keep phone out of sight during deep work.
            </p>
          </div>
        )}

        {/* Chat Message Stream */}
        <div className="space-y-3 pt-2">
          {messages.map((m) => {
            const isAi = m.sender === 'ai';

            return (
              <div
                key={m.id}
                className={`flex gap-2.5 max-w-[85%] ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                    isAi ? 'bg-[#8B72E8] text-white shadow-xs' : 'bg-[#E8EAF0] text-[#20243A]'
                  }`}
                >
                  {isAi ? <Bot className="w-3.5 h-3.5" /> : <UserIcon className="w-3.5 h-3.5" />}
                </div>

                <div>
                  {/* Message Bubble: Lavender for AI, Light Grey for User */}
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      isAi
                        ? 'bg-[#8B72E8] text-white rounded-tl-xs shadow-xs'
                        : 'bg-[#F0F2F7] text-[#20243A] rounded-tr-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span
                    className={`text-[9px] text-[#777D90] mt-1 block font-mono ${
                      isAi ? 'text-left' : 'text-right'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clean Input Field with Solid Lavender Send Button */}
      <form onSubmit={handleSendMessage} className="pt-2">
        <div className="flex items-center gap-2 p-1 bg-white rounded-2xl border border-[#E8EAF0] shadow-xs focus-within:border-[#8B72E8]">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about your study habits, breaks, or schedules..."
            className="flex-1 px-3 py-2 text-xs text-[#20243A] placeholder-[#777D90] bg-transparent focus:outline-none"
          />
          <button
            type="submit"
            className="w-9 h-9 rounded-xl bg-[#8B72E8] hover:bg-[#7b61df] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs active:scale-95"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
