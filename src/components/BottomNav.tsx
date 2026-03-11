import React from 'react';
import { Compass, Bed, Utensils, Map, Heart } from 'lucide-react';

interface BottomNavProps {
  onNavigate: (page: string) => void;
  activePage?: string;
}

export default function BottomNav({ onNavigate, activePage }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-4 pb-8 pt-2 z-30">
      <div className="flex justify-between items-center">
        <NavIcon icon={<Compass size={22} />}  label="Explore"    active={activePage === 'selection'}     onClick={() => onNavigate('selection')} />
        <NavIcon icon={<Bed size={22} />}      label="Stay"       active={activePage === 'accommodation'} onClick={() => onNavigate('accommodation')} />
        <NavIcon icon={<Utensils size={22} />} label="Eat"        active={activePage === 'gastronomy'}    onClick={() => onNavigate('gastronomy')} />
        <NavIcon icon={<Map size={22} />}      label="Map"        active={activePage === 'map'}           onClick={() => onNavigate('map')} />
        <NavIcon icon={<Heart size={22} />}    label="Saved"      active={activePage === 'favorites'}     onClick={() => onNavigate('favorites')} />
      </div>
    </div>
  );
}

const NavIcon = ({ icon, label, active = false, onClick }: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex flex-1 flex-col items-center justify-center gap-1 transition-colors ${
      active ? 'text-orange-500' : 'text-slate-400 dark:text-slate-500'
    }`}
  >
    {icon}
    <p className={`text-[10px] leading-normal ${active ? 'font-bold' : 'font-medium'}`}>{label}</p>
  </button>
);