import React, { useState } from 'react';
import { Heart, MapPin, Star, Trash2 } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import PageHeader from '../components/PageHeader';

interface FavoritesPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const initialFavorites = [
  {
    id: 1,
    name: "Archampolis Beach",
    category: "Beach",
    rating: 4.8,
    location: "Southern Karystos",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Mount Ochi Trail",
    category: "Hiking",
    rating: 4.9,
    location: "Mt. Ochi Summit",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Cavo Doro Taverna",
    category: "Restaurant",
    rating: 4.7,
    location: "Karystos Port",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Castello Rosso",
    category: "Heritage",
    rating: 4.6,
    location: "Karystos Castle",
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=600&q=80"
  }
];

const tabs = ["Places", "Events"];

const categoryColor: Record<string, string> = {
  Beach: "bg-blue-100 text-blue-700",
  Hiking: "bg-emerald-100 text-emerald-700",
  Restaurant: "bg-orange-100 text-orange-700",
  Heritage: "bg-amber-100 text-amber-700",
};

export default function FavoritesPage({ onBack, onNavigate }: FavoritesPageProps) {
  const [activeTab, setActiveTab] = useState("Places");
  const [favorites, setFavorites] = useState(initialFavorites);

  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="flex h-screen w-full flex-col bg-sky-50 overflow-hidden max-w-[430px] mx-auto border-x border-sky-200 font-sans">

      <PageHeader title="My Favorites" onBack={onBack} onNavigate={onNavigate} />

      {/* Tabs + Counter */}
      <div className="bg-white border-b border-sky-100 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 bg-rose-100 px-3 py-1 rounded-full">
            <Heart size={14} className="text-rose-500 fill-rose-500" />
            <span className="text-xs font-bold text-rose-600">{favorites.length}</span>
          </div>
        </div>
        <div className="flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-sky-100 text-blue-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32 px-4">
        {activeTab === "Places" ? (
          favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 gap-3">
              <Heart size={48} className="text-sky-200" />
              <p className="text-blue-900 font-bold">No favorites yet</p>
              <p className="text-slate-400 text-sm text-center">
                Tap the heart icon on any place to save it here
              </p>
              <button
                onClick={() => onNavigate('selection')}
                className="mt-2 px-6 py-2.5 bg-orange-500 text-white font-bold rounded-xl text-sm"
              >
                Explore Karystos
              </button>
            </div>
          ) : (
            <div className="py-4 space-y-3">
              {favorites.map(item => (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-sky-100 flex">
                  <div className="w-24 h-24 shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-blue-900 text-sm leading-tight">{item.name}</h3>
                        <button onClick={() => removeFavorite(item.id)} className="shrink-0 p-1 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={14} className="text-slate-300 hover:text-red-400" />
                        </button>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${categoryColor[item.category]}`}>
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-1 text-slate-400 text-xs">
                        <MapPin size={11} />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star size={11} fill="currentColor" />
                        <span className="text-xs font-bold">{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <Heart size={48} className="text-sky-200" />
            <p className="text-blue-900 font-bold">No saved events</p>
            <p className="text-slate-400 text-sm text-center">Save events you want to attend</p>
            <button
              onClick={() => onNavigate('events')}
              className="mt-2 px-6 py-2.5 bg-orange-500 text-white font-bold rounded-xl text-sm"
            >
              Browse Events
            </button>
          </div>
        )}
      </div>

      <BottomNav onNavigate={onNavigate} activePage="favorites" />
    </div>
  );
}