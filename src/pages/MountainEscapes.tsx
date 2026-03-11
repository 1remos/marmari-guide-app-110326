import React from 'react';
import { Mountain, MapPin, Compass, Trophy, Menu, ArrowLeft } from 'lucide-react';
import BottomNav from '../components/BottomNav';

interface MountainProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const MountainEscapes = ({ onBack, onNavigate }: MountainProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="flex h-screen w-full flex-col bg-slate-950 text-white overflow-hidden max-w-[430px] mx-auto border-x border-slate-800 font-sans">

      {/* Dark Header */}
      <div className="sticky top-0 z-10 bg-slate-950/90 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors text-orange-400">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-orange-400 text-base font-bold">Mountain Escapes</h2>
          <button onClick={() => setIsMenuOpen(true)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-orange-400">
            <Menu size={24} />
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

      <div className="flex-1 overflow-y-auto pb-32">

        {/* Hero Image */}
        <div className="relative h-64 w-full">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
            className="h-full w-full object-cover"
            alt="Mt. Ochi"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-6">
            <div className="flex items-center gap-2 text-orange-400 mb-1">
              <MapPin size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Mt. Ochi, Karystos</span>
            </div>
            <h1 className="text-3xl font-black text-white">Mountain Escapes</h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-slate-400 text-sm leading-relaxed">
            Discover the mysterious megalithic structures of Southern Euboea.
            The Drakospita (Dragon Houses) are ancient stone buildings that defy logic.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
              <Compass size={24} className="text-orange-400 mb-2" />
              <h4 className="font-bold text-sm">Difficulty</h4>
              <p className="text-xs text-slate-500 mt-1">Moderate Hike</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
              <Trophy size={24} className="text-orange-400 mb-2" />
              <h4 className="font-bold text-sm">Altitude</h4>
              <p className="text-xs text-slate-500 mt-1">1,398 meters</p>
            </div>
          </div>

          <section>
            <h3 className="text-xl font-bold mb-4">Hiking Trails</h3>
            <div className="space-y-3">
              {['Dimosari Gorge', 'Kastanolongos Forest', 'Aetos Peak'].map((trail) => (
                <div key={trail} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <Mountain size={18} className="text-orange-400" />
                    <span className="font-medium">{trail}</span>
                  </div>
                  <div className="text-[10px] font-bold bg-orange-500/20 text-orange-400 px-2 py-1 rounded-md uppercase">
                    Top Choice
                  </div>
                </div>
              ))}
            </div>
          </section>

          <button
            onClick={() => onNavigate('map')}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl transition-colors text-base shadow-lg shadow-orange-500/20"
          >
            View on Map
          </button>
        </div>
      </div>

      <BottomNav onNavigate={onNavigate} activePage="mountain" />
    </div>
  );
};

export default MountainEscapes;