import React, { useState, useEffect } from 'react';
import { Search, Star, MapPin, Phone } from 'lucide-react';
import { supabase } from '../lib/supabase';
import BottomNav from '../components/BottomNav';
import PageHeader from '../components/PageHeader';

interface Restaurant {
  id: number;
  name: string;
  description: string;
  cuisine_type: string;
  price_range: string;
  rating: number;
  phone: string;
  location: string;
  image_url: string;
}

interface RestaurantsListProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export default function RestaurantsList({ onBack, onNavigate }: RestaurantsListProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .order('rating', { ascending: false });
      if (!error && data) setRestaurants(data);
      setLoading(false);
    };
    fetchRestaurants();
  }, []);

  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.description.toLowerCase().includes(search.toLowerCase()) ||
    r.cuisine_type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen w-full flex-col bg-sky-50 overflow-hidden max-w-[430px] mx-auto border-x border-sky-200 font-sans">

      <PageHeader title="All Restaurants" onBack={onBack} onNavigate={onNavigate} />

      {/* Search Bar */}
      <div className="bg-white border-b border-sky-100 px-4 py-3">
        <div className="flex items-center gap-3 bg-sky-100 rounded-xl px-4 py-2">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search restaurants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-blue-900 placeholder-slate-400 text-sm outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32 px-4">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-slate-400">
            <MapPin size={32} className="mb-2 opacity-40" />
            <p className="text-sm">No restaurants found</p>
          </div>
        ) : (
          <div className="py-4 space-y-4">
            {filtered.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-sky-100">
                <div className="relative h-44">
                  <img src={r.image_url} alt={r.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-full">
                    <span className="text-xs font-bold text-blue-900">{r.cuisine_type}</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full">
                    <span className="text-xs font-bold text-orange-500">{r.price_range}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-blue-900">{r.name}</h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-bold">{r.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 text-xs mb-2">
                    <MapPin size={12} />
                    <span>{r.location}</span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2">
                    {r.description}
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-colors">
                      View Menu
                    </button>
                    {r.phone && (
                      <a href={`tel:${r.phone}`} className="flex items-center gap-1.5 px-4 py-2.5 bg-sky-100 text-blue-900 text-sm font-bold rounded-xl transition-colors">
                        <Phone size={15} />
                        Call
                      </a>
                    )}
                    <button onClick={() => onNavigate('map')} className="flex items-center gap-1.5 px-4 py-2.5 bg-sky-100 text-blue-900 text-sm font-bold rounded-xl transition-colors">
                      <MapPin size={15} />
                      Map
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav onNavigate={onNavigate} activePage="restaurants" />
    </div>
  );
}