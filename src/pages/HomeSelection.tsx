import React, { useState } from 'react';
import {
  Menu, X, Mountain, Waves, Home, Map,
  Phone, Utensils, Calendar, Sparkles, Wind, Heart, MapPin
} from 'lucide-react';
import BottomNav from '../components/BottomNav';
import VoiceSearch from '../components/VoiceSearch';

interface HomeSelectionProps {
  onSelect: () => void;
  onNavigate: (page: string) => void;
}

const allMenuItems = [
  { label: 'Coastal Paradises',      page: 'beaches',       icon: <Waves size={28} className="text-blue-500" />,      bg: 'bg-blue-50',    desc: 'Best beaches' },
  { label: 'Dragon Houses',          page: 'dragon-houses', icon: <Sparkles size={28} className="text-amber-500" />,   bg: 'bg-amber-50',   desc: 'Ancient mystery' },
  { label: 'Mountain Escapes',       page: 'mountain',      icon: <Mountain size={28} className="text-emerald-500" />, bg: 'bg-emerald-50', desc: 'Hiking trails' },
  { label: 'Where to Stay',          page: 'accommodation', icon: <Home size={28} className="text-sky-500" />,         bg: 'bg-sky-50',     desc: 'Hotels & villas' },
  { label: 'Eat & Drink',            page: 'gastronomy',    icon: <Utensils size={28} className="text-orange-500" />,  bg: 'bg-orange-50',  desc: 'Local cuisine' },
  { label: 'Local Events',           page: 'events',        icon: <Calendar size={28} className="text-rose-500" />,    bg: 'bg-rose-50',    desc: 'What is on' },
  { label: 'Weather Guide',          page: 'weather',       icon: <Wind size={28} className="text-cyan-500" />,        bg: 'bg-cyan-50',    desc: 'Wind & sun' },
  { label: 'Wind & Beach Advisor',   page: 'wind-advisor',  icon: <Wind size={28} className="text-teal-500" />,        bg: 'bg-teal-50',    desc: 'Live conditions' },
  { label: 'Interactive Map',        page: 'map',           icon: <MapPin size={28} className="text-indigo-500" />,    bg: 'bg-indigo-50',  desc: 'Explore map' },
  { label: 'My Favorites',           page: 'favorites',     icon: <Heart size={28} className="text-pink-500" />,       bg: 'bg-pink-50',    desc: 'Saved places' },
  { label: 'Emergency Contacts',     page: 'contacts',      icon: <Phone size={28} className="text-red-500" />,        bg: 'bg-red-50',     desc: 'Useful numbers' },
];

const HomeSelection = ({ onSelect, onNavigate }: HomeSelectionProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigation = (page: string) => {
    setIsMenuOpen(false);
    onNavigate(page);
  };

  const filteredItems = searchQuery.trim()
    ? allMenuItems.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allMenuItems;

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden max-w-[430px] mx-auto bg-sky-50 shadow-2xl font-sans">

      {/* Side Menu Drawer */}
      <div className={`absolute inset-0 z-50 transition-all duration-300 ${isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute top-0 left-0 h-full w-4/5 bg-slate-900 p-6 shadow-2xl transition-transform duration-300 overflow-y-auto ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-between items-center mb-8 text-white">
            <h3 className="font-bold text-2xl text-orange-400">Karystos Guide</h3>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
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
            <MenuLink onClick={() => handleNavigation('wind-advisor')} icon={<Wind size={20} className="text-teal-400" />} label="Wind & Beach Advisor" />
            <MenuLink onClick={() => handleNavigation('favorites')} icon={<Heart size={20} className="text-rose-400" />} label="My Favorites" />
            <div className="my-4 border-t border-white/10"></div>
            <MenuLink onClick={() => handleNavigation('contacts')} icon={<Phone size={20} className="text-red-400" />} label="Emergency Calls" />
          </nav>
        </div>
      </div>

      {/* Header */}
      <header className="flex items-center bg-white p-4 sticky top-0 z-20 justify-between border-b border-sky-100">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex size-10 items-center justify-center rounded-full bg-sky-100 hover:bg-sky-200 transition-colors text-blue-900"
        >
          <Menu size={24} />
        </button>
        <div className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500 block">Experience</span>
          <h2 className="text-lg font-bold leading-none text-blue-900">Karystos</h2>
        </div>
        <div className="size-10"></div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-5 pb-32 pt-5">
        <h1 className="text-blue-900 text-2xl font-extrabold tracking-tight mb-1">Where do you want to go?</h1>
        <p className="text-slate-400 text-sm mb-4">Explore everything Karystos has to offer</p>

        <div className="mb-5">
          <VoiceSearch
            onResult={(text) => setSearchQuery(text)}
            onNavigate={handleNavigation}
            placeholder="Search or speak in Greek / English..."
          />
        </div>

        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-slate-400">
            <p className="text-sm">No results found</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-2 text-orange-500 font-bold text-sm"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredItems.map(item => (
              <button
                key={item.page}
                onClick={() => handleNavigation(item.page)}
                className="flex flex-col items-start gap-3 p-4 bg-white rounded-2xl shadow-sm border border-sky-100 active:scale-[0.97] transition-all hover:shadow-md"
              >
                <div className={`p-3 rounded-xl ${item.bg}`}>
                  {item.icon}
                </div>
                <div className="text-left">
                  <p className="font-bold text-blue-900 text-sm leading-tight">{item.label}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{item.desc}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>

      <BottomNav onNavigate={onNavigate} activePage="selection" />
    </div>
  );
};

const MenuLink = ({ onClick, icon, label }: any) => (
  <button onClick={onClick} className="flex items-center gap-4 py-3 px-3 hover:bg-white/10 rounded-xl transition-colors text-left w-full group">
    <div className="group-hover:scale-110 transition-transform">{icon}</div>
    <span className="font-semibold text-base">{label}</span>
  </button>
);

export default HomeSelection;