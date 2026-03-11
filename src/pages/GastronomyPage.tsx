import React, { useState } from 'react';
import { Star, MapPin, Heart, ChevronRight } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import PageHeader from '../components/PageHeader';

interface GastronomyPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const restaurants = [
  {
    id: 1,
    name: "Karystos Grill House",
    cuisine: "Traditional Greek BBQ",
    location: "Karystos Port",
    distance: "300m",
    rating: 4.8,
    reviews: 412,
    price: "€€",
    promoted: true,
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Aretousa Cafe",
    cuisine: "Coffee & Breakfast",
    location: "Karystos Center",
    distance: "200m",
    rating: 4.9,
    reviews: 287,
    price: "€",
    promoted: false,
    img: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Souvlaki Point",
    cuisine: "Fast Food",
    location: "Main Street",
    distance: "450m",
    rating: 4.4,
    reviews: 156,
    price: "€",
    promoted: false,
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  }
];

const filters = ["All Cuisines", "Taverna", "Seafood", "Grill House", "Cafe"];

export default function GastronomyPage({ onBack, onNavigate }: GastronomyPageProps) {
  const [activeFilter, setActiveFilter] = useState("All Cuisines");
  const [saved, setSaved] = useState<number[]>([]);

  const filtered = activeFilter === "All Cuisines"
    ? restaurants
    : restaurants.filter(r => r.cuisine.toLowerCase().includes(activeFilter.toLowerCase()));

  const toggleSave = (id: number) => {
    setSaved(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  return (
    <div className="relative flex h-screen w-full flex-col bg-sky-50 overflow-hidden max-w-[430px] mx-auto border-x border-sky-200 font-sans">

      <PageHeader title="Eat & Drink" onBack={onBack} onNavigate={onNavigate} />

      {/* Filters */}
      <div className="bg-white border-b border-sky-100 px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
              activeFilter === f
                ? 'bg-orange-500 text-white'
                : 'bg-sky-100 text-blue-900'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pb-32 px-4 no-scrollbar">
        <div className="py-4 space-y-4">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-sky-100">
              <div className="relative h-44">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.promoted && (
                  <div className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                    Promoted
                  </div>
                )}
                <button
                  onClick={() => toggleSave(item.id)}
                  className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-md transition-transform active:scale-90"
                >
                  <Heart
                    size={18}
                    className={saved.includes(item.id) ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}
                  />
                </button>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-blue-900">{item.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{item.cuisine} · {item.price}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold">{item.rating}</span>
                    <span className="text-xs text-slate-400">({item.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-slate-500 text-xs mb-3">
                  <MapPin size={12} />
                  <span>{item.location}</span>
                  <span className="text-slate-300 mx-1">·</span>
                  <span>{item.distance}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-colors">
                    View Menu
                  </button>
                  <button
                    onClick={() => onNavigate('map')}
                    className="flex items-center gap-1 px-3 py-2 bg-sky-100 text-blue-900 text-sm font-bold rounded-xl transition-colors"
                  >
                    <MapPin size={14} />
                    Map
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pb-4">
          <button
            onClick={() => onNavigate('restaurants')}
            className="w-full flex items-center justify-center gap-2 py-3 border border-sky-200 rounded-xl text-orange-500 font-bold text-sm hover:bg-orange-50 transition-colors"
          >
            See All Restaurants
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <BottomNav onNavigate={onNavigate} activePage="gastronomy" />
    </div>
  );
}