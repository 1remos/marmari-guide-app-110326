import React, { useState, useEffect } from 'react';
import { Search, Star, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';
import BottomNav from '../components/BottomNav';
import PageHeader from '../components/PageHeader';

interface Beach {
  id: number;
  name: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  image_url: string;
  features: string[];
  blue_flag: boolean;
}

interface BeachesListProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const BeachesList = ({ onBack, onNavigate }: BeachesListProps) => {
  const [beaches, setBeaches] = useState<Beach[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBeaches = async () => {
      const { data, error } = await supabase
        .from('beaches')
        .select('*')
        .order('rating', { ascending: false });
      if (!error && data) setBeaches(data);
      setLoading(false);
    };
    fetchBeaches();
  }, []);

  const filtered = beaches.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.description.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative flex h-screen w-full flex-col bg-sky-50 overflow-hidden max-w-[430px] mx-auto border-x border-sky-200 font-sans">

      <PageHeader title="Coastal Paradises" onBack={onBack} onNavigate={onNavigate} />

      {/* Search Bar */}
      <div className="bg-white border-b border-sky-100 px-4 py-3">
        <div className="flex items-center gap-3 bg-sky-100 rounded-xl px-4 py-2">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search beaches..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-blue-900 placeholder-slate-400 text-sm outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32 px-4">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-slate-400">
            <MapPin size={32} className="mb-2 opacity-40" />
            <p className="text-sm">No beaches found</p>
          </div>
        ) : (
          <div className="py-4 space-y-4">
            {filtered.map((beach) => (
              <div key={beach.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-sky-100">
                <div className="relative h-44">
                  <img
                    src={beach.image_url}
                    alt={beach.name}
                    className="w-full h-full object-cover"
                  />
                  {beach.blue_flag && (
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                      Blue Flag
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-blue-900 text-base">{beach.name}</h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-bold">{beach.rating}</span>
                      <span className="text-xs text-slate-400">({beach.reviews})</span>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2">
                    {beach.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {beach.features?.slice(0, 3).map((f) => (
                      <span key={f} className="text-[10px] bg-sky-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                        {f}
                      </span>
                    ))}
                  </div>
                  <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav onNavigate={onNavigate} activePage="beaches" />
    </div>
  );
};

export default BeachesList;