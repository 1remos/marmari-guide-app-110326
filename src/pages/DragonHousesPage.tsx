import React, { useState } from 'react';
import { MapPin, Clock, Mountain, Compass, Menu, ArrowLeft } from 'lucide-react';
import BottomNav from '../components/BottomNav';

interface DragonHousesPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const tabs = ["History", "Architecture", "Legends"];

const tabContent: Record<string, string> = {
  History: "The Drakospita (Dragon Houses) are ancient megalithic structures built on the peaks of Mt. Ochi and Styra in Southern Euboea. Dating back over 3,000 years, their true purpose and builders remain one of the greatest archaeological mysteries in Greece.",
  Architecture: "Built from massive schist slabs without mortar, the structures feature a corbelled roof system where each stone overlaps the previous one. The largest Dragon House on Mt. Ochi measures 12.6m x 6.8m and its walls reach up to 1.6m thick.",
  Legends: "Local tradition claims these structures were built by dragons overnight. Ancient texts suggest they may have been temples dedicated to Hera, while other theories point to them being shelters for ancient quarry workers who extracted the stone from the mountain."
};

export default function DragonHousesPage({ onBack, onNavigate }: DragonHousesPageProps) {
  const [activeTab, setActiveTab] = useState("History");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col bg-slate-950 text-white overflow-hidden max-w-[430px] mx-auto border-x border-slate-800 font-sans">

      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-950/90 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-orange-400"
          >
            <Menu size={24} />
          </button>
          <h2 className="text-orange-400 text-base font-bold">Dragon Houses</h2>
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-orange-400"
          >
            <ArrowLeft size={24} />
          </button>
        </div>
      </div>

      {/* Side Menu Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 max-w-[430px] mx-auto">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          <div className="absolute top-0 left-0 h-full w-4/5 bg-slate-900 p-6 shadow-2xl overflow-y-auto">
            <div className="flex justify-between items-center mb-8 text-white">
              <h3 className="font-bold text-2xl text-orange-400">Karystos Guide</h3>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <ArrowLeft size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 text-white pb-10">
              {[
                { label: 'Home', page: 'home' },
                { label: 'Interactive Map', page: 'map' },
                { label: 'Ancient Dragon Houses', page: 'dragon-houses' },
                { label: 'Coastal Paradises', page: 'beaches' },
                { label: 'Mountain Escapes', page: 'mountain' },
                { label: 'Where to Stay', page: 'accommodation' },
                { label: 'Eat & Drink', page: 'gastronomy' },
                { label: 'Local Events', page: 'events' },
                { label: 'Weather Guide', page: 'weather' },
                { label: 'My Favorites', page: 'favorites' },
                { label: 'Emergency Contacts', page: 'contacts' },
              ].map(item => (
                <button
                  key={item.page}
                  onClick={() => { setIsMenuOpen(false); onNavigate(item.page); }}
                  className="flex items-center gap-4 py-3 px-3 hover:bg-white/10 rounded-xl transition-colors text-left w-full"
                >
                  <span className="font-semibold text-base">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">

        {/* Hero Image */}
        <div className="relative h-64 w-full">
          <img
            src="https://lh3.googleusercontent.com/gps-cs-s/AHVAweosRk4IIFAbaWkhWQpLXQpRQcv7JZrxvcDbH7dOnGDqIiYGtYfsKDsQIjTdUIMJS10xJ4tcKTiSNqehrxYPzUuPWY-uTBJHHR8HO17Ln091tO4p0sRvLtgf1U2_7xqtdTKFZmwf=s1360-w1360-h1020-rw"
            alt="Dragon Houses"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          <div className="absolute bottom-4 left-5">
            <div className="flex items-center gap-2 text-orange-400 mb-1">
              <MapPin size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Mt. Ochi, Karystos</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight">Ancient Dragon Houses</h1>
          </div>
        </div>

        <div className="p-5 space-y-6">

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <Clock size={20} className="text-orange-400 mb-2" />
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Duration</p>
              <p className="font-bold mt-1">3.5 hours</p>
              <p className="text-xs text-slate-500">round trip</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <Mountain size={20} className="text-orange-400 mb-2" />
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Altitude</p>
              <p className="font-bold mt-1">1,398 m</p>
              <p className="text-xs text-slate-500">summit</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <Compass size={20} className="text-orange-400 mb-2" />
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Difficulty</p>
              <p className="font-bold mt-1">Demanding</p>
              <p className="text-xs text-slate-500">experienced hikers</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <MapPin size={20} className="text-orange-400 mb-2" />
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Distance</p>
              <p className="font-bold mt-1">8.4 km</p>
              <p className="text-xs text-slate-500">total trail</p>
            </div>
          </div>

          {/* Tabs */}
          <div>
            <div className="flex gap-1 bg-white/5 p-1 rounded-xl mb-4">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                    activeTab === tab
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {tabContent[activeTab]}
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => onNavigate('map')}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl transition-colors text-base tracking-wide shadow-lg shadow-orange-500/20"
          >
            Start the Trail
          </button>

        </div>
      </div>

      <BottomNav onNavigate={onNavigate} activePage="dragon-houses" />
    </div>
  );
}