import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Search, X } from 'lucide-react';

interface VoiceSearchProps {
  onResult: (text: string) => void;
  onNavigate?: (page: string) => void;
  placeholder?: string;
}

// Voice commands → navigation mapping
const VOICE_COMMANDS: Record<string, string> = {
  'beaches': 'beaches',
  'παραλίες': 'beaches',
  'παραλία': 'beaches',
  'mountain': 'mountain',
  'βουνό': 'mountain',
  'μονοπάτια': 'mountain',
  'hotels': 'accommodation',
  'ξενοδοχεία': 'accommodation',
  'διαμονή': 'accommodation',
  'restaurants': 'gastronomy',
  'εστιατόρια': 'gastronomy',
  'φαγητό': 'gastronomy',
  'events': 'events',
  'εκδηλώσεις': 'events',
  'map': 'map',
  'χάρτης': 'map',
  'χάρτη': 'map',
  'dragon': 'dragon-houses',
  'δρακόσπιτα': 'dragon-houses',
  'weather': 'weather',
  'καιρός': 'weather',
  'contacts': 'contacts',
  'επείγον': 'contacts',
  'favorites': 'favorites',
  'αγαπημένα': 'favorites',
};

export default function VoiceSearch({ onResult, onNavigate, placeholder = 'Search or speak...' }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [supported, setSupported] = useState(true);
  const [status, setStatus] = useState<'idle' | 'listening' | 'processing' | 'navigating'>('idle');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'el-GR'; // Ελληνικά πρώτα

    recognition.onstart = () => {
      setIsListening(true);
      setStatus('listening');
    };

    recognition.onresult = (event: any) => {
      const current = event.results[event.results.length - 1];
      const text = current[0].transcript.toLowerCase().trim();
      setTranscript(text);

      if (current.isFinal) {
        setStatus('processing');
        // Έλεγχος για voice commands → navigation
        const command = Object.keys(VOICE_COMMANDS).find(cmd => text.includes(cmd));
        if (command && onNavigate) {
          setStatus('navigating');
          setTimeout(() => {
            onNavigate(VOICE_COMMANDS[command]);
            setTranscript('');
            setStatus('idle');
          }, 800);
        } else {
          // Απλή αναζήτηση
          onResult(text);
          setStatus('idle');
        }
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      setStatus('idle');
    };

    recognition.onend = () => {
      setIsListening(false);
      if (status !== 'navigating') setStatus('idle');
    };

    recognitionRef.current = recognition;
  }, []);

  const toggleListening = () => {
    if (!supported) return;
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      recognitionRef.current?.start();
    }
  };

  const clearSearch = () => {
    setTranscript('');
    onResult('');
    setStatus('idle');
  };

  const statusMessages: Record<string, string> = {
    idle: '',
    listening: 'Μιλήστε τώρα...',
    processing: 'Επεξεργασία...',
    navigating: 'Μεταφορά...',
  };

  return (
    <div className="w-full space-y-2">
      {/* Search Bar */}
      <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 border-2 transition-all duration-300 ${
        isListening
          ? 'bg-orange-50 border-orange-400 shadow-lg shadow-orange-100'
          : 'bg-sky-100 border-transparent'
      }`}>
        <Search size={18} className="text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder={placeholder}
          value={transcript}
          onChange={(e) => {
            setTranscript(e.target.value);
            onResult(e.target.value);
          }}
          className="flex-1 bg-transparent text-blue-900 placeholder-slate-400 text-sm outline-none"
        />
        {transcript && (
          <button onClick={clearSearch} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={16} />
          </button>
        )}
        {supported && (
          <button
            onClick={toggleListening}
            className={`shrink-0 p-2 rounded-full transition-all duration-200 ${
              isListening
                ? 'bg-orange-500 text-white animate-pulse shadow-md'
                : 'bg-white text-slate-500 hover:text-orange-500 shadow-sm'
            }`}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
        )}
      </div>

      {/* Status Message */}
      {status !== 'idle' && (
        <div className="flex items-center gap-2 px-2">
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <p className="text-xs text-orange-500 font-bold">{statusMessages[status]}</p>
          {transcript && (
            <p className="text-xs text-slate-400 italic">"{transcript}"</p>
          )}
        </div>
      )}

      {/* Voice Commands Hint */}
      {isListening && (
        <div className="bg-white rounded-2xl p-3 border border-orange-100 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Δοκιμάστε να πείτε:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {['παραλίες', 'χάρτη', 'εστιατόρια', 'καιρός', 'δρακόσπιτα', 'αγαπημένα'].map(hint => (
              <span key={hint} className="text-[10px] bg-orange-50 text-orange-600 px-2 py-1 rounded-full font-medium">
                "{hint}"
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}