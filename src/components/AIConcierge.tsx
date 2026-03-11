import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIConciergeProps {
  onNavigate?: (page: string) => void;
}

export default function AIConcierge({ onNavigate }: AIConciergeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I am your Karystos AI Concierge! Ask me anything about beaches, restaurants, hiking trails, weather or transport! / Γεια! Ειμαι ο AI Concierge σας για την Καρυστο!'
    }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      { role: 'user', content: input },
      { role: 'assistant', content: 'Thank you for your question! This feature will be fully activated soon. / Ευχαριστω για την ερωτηση σας! Αυτη η λειτουργια θα ενεργοποιηθει συντομα.' }
    ]);
    setInput('');
  };

  const quickQuestions = [
    'Best beaches today?',
    'Καλα εστιατορια;',
    'Dragon Houses trail?',
    'Καιρος σημερα;'
  ];

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-32 right-4 z-40 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-xl shadow-orange-500/30 transition-all active:scale-95"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 max-w-[430px] mx-auto">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>

          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl flex flex-col"
            style={{ height: '80vh' }}
          >
            <div className="flex items-center justify-between p-4 border-b border-sky-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-black text-blue-900">AI Concierge</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <p className="text-xs text-slate-400">Online 24/7</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-sky-50 rounded-full transition-colors text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-orange-500' : 'bg-blue-900'
                  }`}>
                    {msg.role === 'user'
                      ? <User size={14} className="text-white" />
                      : <Bot size={14} className="text-white" />
                    }
                  </div>
                  <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-orange-500 text-white rounded-tr-sm'
                      : 'bg-sky-50 text-blue-900 rounded-tl-sm border border-sky-100'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              <div />
            </div>

            {messages.length === 1 && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
                {quickQuestions.map(q => (
                  <button
                    key={q}
                    onClick={() => setInput(q)}
                    className="shrink-0 text-xs bg-sky-100 text-blue-900 font-medium px-3 py-2 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div className="p-4 border-t border-sky-100 shrink-0">
              <div className="flex gap-2 items-center bg-sky-50 rounded-2xl px-4 py-2 border border-sky-100">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask me anything... / Ρωτηστε με..."
                  className="flex-1 bg-transparent text-blue-900 placeholder-slate-400 text-sm outline-none"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="bg-orange-500 disabled:bg-slate-200 text-white p-2 rounded-xl transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}