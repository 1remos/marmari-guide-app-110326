import React, { useState } from 'react';
import { ChevronLeft, Menu, X, Home, Map, Waves, Mountain, Utensils, Calendar, Wind, Heart, Phone, Sparkles } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export default function PageHeader({ title, onBack, onNavigate }: PageHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (page: string) => {
    setIsMenuOpen(false);
    onNavigate(page);
  };

  return (
    <>
      <div className={`fixed inset-0 z-50 transition-all duration-300 max-w-[430px] mx-auto ${isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute top-0 left-0 h-full w-4/5 bg-slate-900 p-6 shadow-2xl transition-transform duration-300 overflow-y-auto ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-2xl text-orange-400">Karystos Guide</h3>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white">
              <X size={20} />
            </button>
          </div>
          <nav className="flex flex-col gap-1 text-white pb-10">
            <MenuLink onClick={() => handleNavigation('home')} icon={<Home size={20} />} label="Home" />
            <MenuLink onClick={() => handleNavigation('map')} icon={<Map size={20} className="text-emerald-400" />} label="Interactive Map" />
            <MenuLink onClick={() => handleNavigation('dragon-houses')} icon={<Sparkles size={20} className="text-amber-400" />} label="Ancient Dragon Houses" />
            <div className="my-4 border-t border-white/10"></div>
            <MenuLink onClick={() => handleNavigation('beaches')} icon={<Waves size={20} className="text-blue-400" />} label="Coastal Paradises" />
            <MenuLink onClick={() => handleNavigation('mountain')} icon={<Mountain size={20} className="text-emerald-400" />} label="Mountain Escapes" />
            <MenuLink onClick={() => handleNavigation('accommodation')} icon={<Home size={20} className="text-sky-400" />} label="Where to Stay" />
            <MenuLink onClick={() => handleNavigation('gastronomy')} icon={<Utensils size={20} className="text-orange-400" />} label="Eat & Drink" />
            <MenuLink onClick={() => handleNavigation('events')} icon={<Calendar size={20} className="text-rose-400" />} label="Local Events" />
            <MenuLink onClick={() => handleNavigation('weather')} icon={<Wind size={20} className="text-blue-400" />} label="Weather Guide" />
            <MenuLink onClick={() => handleNavigation('favorites')} icon={<Heart size={20} className="text-rose-400" />} label="My Favorites" />
            <div className="my-4 border-t border-white/10"></div>
            <MenuLink onClick={() => handleNavigation('contacts')} icon={<Phone size={20} className="text-red-400" />} label="Emergency Contacts" />
          </nav>
        </div>
      </div>

      <header className="bg-white border-b border-sky-100 px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="p-2 hover:bg-sky-50 rounded-full text-blue-900 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-black text-blue-900 uppercase tracking-tighter">
          {title}
        </h1>
        <button onClick={() => setIsMenuOpen(true)} className="p-2 hover:bg-sky-50 rounded-full text-blue-900 transition-colors">
          <Menu size={24} />
        </button>
      </header>
    </>
  );
}

const MenuLink = ({ onClick, icon, label }: { onClick: () => void; icon: React.ReactNode; label: string }) => (
  <button onClick={onClick} className="flex items-center gap-4 py-3 px-3 hover:bg-white/10 rounded-xl transition-colors text-left w-full group">
    <div className="group-hover:scale-110 transition-transform">{icon}</div>
    <span className="font-semibold text-base">{label}</span>
  </button>
);