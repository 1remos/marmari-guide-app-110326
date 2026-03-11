import React from 'react';
import { ChevronLeft, Menu, MapPin } from 'lucide-react';

interface InteractiveMapProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export default function InteractiveMap({ onBack, onNavigate }: InteractiveMapProps) {
  return (
    <div className="h-screen w-full relative bg-slate-200">
      {/* Floating Header Buttons */}
      <div className="absolute top-6 left-4 right-4 flex justify-between items-center z-50">
        <button 
          onClick={onBack}
          className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl text-slate-700 active:scale-95 transition-all"
        >
          <ChevronLeft size={24} />
        </button>

        <h2 className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-black text-slate-900 uppercase text-sm shadow-xl">
          Live Explorer
        </h2>

        <button 
          onClick={() => onNavigate('selection')}
          className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl text-slate-700 active:scale-95 transition-all"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mock Map Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-slate-400 flex flex-col items-center gap-2">
          <MapPin size={48} className="animate-bounce text-sky-500" />
          <p className="font-bold uppercase tracking-widest text-xs">Loading Interactive Map...</p>
        </div>
      </div>
      
      {/* Map Overlay Info */}
      <div className="absolute bottom-8 left-4 right-4">
        <div className="bg-white p-4 rounded-3xl shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center">
              <MapPin className="text-sky-600" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">Current View</p>
              <p className="font-black text-slate-900">Karystos Port Area</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}