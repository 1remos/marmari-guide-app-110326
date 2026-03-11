import React, { useState } from 'react';
import { Star, MapPin, Heart } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import PageHeader from '../components/PageHeader';

interface AccommodationPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const accommodations = [
  {
    id: 1,
    name: "Karystos Mare Hotel",
    location: "Karystos Beach",
    price: 85,
    rating: 4.8,
    reviews: 312,
    category: "Hotels",
    topRated: true,
    img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/571703909.jpg?k=2041f04fccf4f52b5e7a0020ec1442afeb2a7ba16e1546174fee2b6b5e223d93&o="
  },
  {
    id: 2,
    name: "Aegean Villas",
    location: "Aetos Hillside",
    price: 150,
    rating: 4.9,
    reviews: 198,
    category: "Villas",
    topRated: false,
    img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/31028210.jpg?k=cf2d02e138a3268e890cd855407aca4cc1310817c345545787f76921966bf67e&o="
  },
  {
    id: 3,
    name: "Castello Suites",
    location: "Port Center",
    price: 70,
    rating: 4.6,
    reviews: 245,
    category: "Suites",
    topRated: false,
    img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80"
  }
];

const filters = ["All", "Hotels", "Villas", "Suites"];

export default function AccommodationPage({ onBack, onNavigate }: AccommodationPageProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [saved, setSaved] = useState<number[]>([]);

  const filtered = activeFilter === "All"
    ? accommodations
    : accommodations.filter(a => a.category === activeFilter);

  const toggleSave = (id: number) => {
    setSaved(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  return (
    <div className="relative flex h-screen w-full flex-col bg-sky-50 overflow-hidden max-w-[430px] mx-auto border-x border-sky-200 font-sans">
      
      {/* Εδώ χρησιμοποιούμε το PageHeader που διορθώσαμε */}
      <PageHeader title="Where to Stay" onBack={onBack} onNavigate={onNavigate} />

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

      <div className="flex-1 overflow-y-auto pb-32 px-4">
        <div className="py-4 space-y-4">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-sky-100">
              <div className="relative h-48">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.topRated && (
                  <div className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                    Top Rated
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
                  <h3 className="font-bold text-blue-900">{item.name}</h3>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold">{item.rating}</span>
                    <span className="text-xs text-slate-400">({item.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-slate-500 text-xs mb-3">
                  <MapPin size={12} />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-orange-500 font-black text-lg">€{item.price}</span>
                    <span className="text-slate-400 text-xs"> / night</span>
                  </div>
                  <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav onNavigate={onNavigate} activePage="accommodation" />
    </div>
  );
}