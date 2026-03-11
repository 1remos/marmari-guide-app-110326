import React from 'react';
import { Sun, Droplets, Wind, Thermometer } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import PageHeader from '../components/PageHeader';

const WeatherGuide = ({ onBack, onNavigate }: { 
  onBack: () => void;
  onNavigate: (page: string) => void;
}) => {
  return (
    <div className="relative flex h-screen w-full flex-col bg-sky-50 overflow-hidden max-w-[430px] mx-auto border-x border-sky-200 font-sans">

      <PageHeader title="Weather Guide" onBack={onBack} onNavigate={onNavigate} />

      <div className="flex-1 overflow-y-auto pb-32 px-5">
        <div className="py-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white shadow-lg mb-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 font-medium">Current Weather</p>
                <h3 className="text-4xl font-black mt-1">22°C</h3>
                <p className="text-blue-100 mt-1">Karystos, Euboea</p>
              </div>
              <Sun size={48} className="text-yellow-300 fill-yellow-300" />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/20">
              <div className="text-center">
                <Wind size={20} className="mx-auto mb-1 opacity-80" />
                <p className="text-[10px] uppercase font-bold opacity-60">Wind</p>
                <p className="font-bold">12km/h</p>
              </div>
              <div className="text-center">
                <Droplets size={20} className="mx-auto mb-1 opacity-80" />
                <p className="text-[10px] uppercase font-bold opacity-60">Humid</p>
                <p className="font-bold">45%</p>
              </div>
              <div className="text-center">
                <Thermometer size={20} className="mx-auto mb-1 opacity-80" />
                <p className="text-[10px] uppercase font-bold opacity-60">Feels</p>
                <p className="font-bold">24°C</p>
              </div>
            </div>
          </div>
          <h4 className="font-bold text-blue-900 mb-4">Best time to visit</h4>
          <p className="text-slate-600 text-sm leading-relaxed">
            Karystos is famous for its Meltemi winds. Summer is perfect for windsurfing
            at Cavo Doro beach, while Spring and Autumn are ideal for hiking Mt. Ochi.
          </p>
        </div>
      </div>

      <BottomNav onNavigate={onNavigate} activePage="weather" />
    </div>
  );
};

export default WeatherGuide;