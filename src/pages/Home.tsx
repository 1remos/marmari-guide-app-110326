import React from 'react';
import { MapPin, Star } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import BottomNav from '../components/BottomNav';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="flex h-screen w-full flex-col bg-sky-50 overflow-hidden max-w-[430px] mx-auto border-x border-sky-200 font-sans">

      <PageHeader
        title="Karystos"
        onBack={() => onNavigate('selection')}
        onNavigate={onNavigate}
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 pb-32 space-y-8">

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('beaches')}
            className="bg-sky-500 p-4 rounded-3xl text-white shadow-lg shadow-sky-200 flex flex-col items-center gap-2 active:scale-95 transition-all"
          >
            <div className="bg-white/20 p-2 rounded-xl"><MapPin size={24} /></div>
            <span className="font-bold">Beaches</span>
          </button>
          <button
            onClick={() => onNavigate('accommodation')}
            className="bg-orange-500 p-4 rounded-3xl text-white shadow-lg shadow-orange-200 flex flex-col items-center gap-2 active:scale-95 transition-all"
          >
            <div className="bg-white/20 p-2 rounded-xl"><Star size={24} /></div>
            <span className="font-bold">Stay</span>
          </button>
        </div>

        {/* Featured Section */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-sky-100">
          <h3 className="font-black text-blue-900 uppercase italic mb-4">Must See Today</h3>
          <div className="relative h-48 rounded-2xl overflow-hidden mb-3">
            <img
              src="https://images.unsplash.com/photo-1505993597083-3bd19f75e57d?auto=format&fit=crop&w=800&q=80"
              className="w-full h-full object-cover"
              alt="Castello Rosso"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <span className="text-white font-bold text-lg">Castello Rosso</span>
            </div>
          </div>
        </div>

      </main>

      <BottomNav onNavigate={onNavigate} activePage="home" />
    </div>
  );
}