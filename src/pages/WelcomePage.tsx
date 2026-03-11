import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

interface WelcomePageProps {
  onGetStarted: () => void;
}

export default function WelcomePage({ onGetStarted }: WelcomePageProps) {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden max-w-[430px] mx-auto font-sans">

      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-1000 scale-105"
        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD8UXW2wvv9RBbS6hGfshACJb058QZaFF7PK6CSsSmZZndBei42b45vUu712u8-hqyuoyxqtyNIy7UFXQoAGo3Ac4C0VdXzI0YjRdXiuCrylLdlbPisxMr1lfLEZbxjMin6x5qt09nlICneehOqxQOJi12elaG7KUNipSdNfYtb49IVnDkXpwMsRqrWIpzFv559upMIVS5pxBgF9cP010mEj_wQx5H73k9qfyEAKq61qy4mt-74YAUamlg5YciqJa3HgFGtSHFNI_Q")' }}
        role="img"
        aria-label="Cinematic shot of Karystos harbor at dusk"
      ></div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>

      <div className="relative z-10 flex justify-between items-center p-6 pt-12">
        <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
          <MapPin size={14} className="text-orange-400" />
          <span className="text-white text-xs font-bold">Explore Greece</span>
        </div>
        <button onClick={onGetStarted} className="text-white/70 text-sm font-medium hover:text-white transition-colors">
          Skip
        </button>
      </div>

      <div className="relative z-10 flex justify-center gap-2 mt-auto mb-4">
        <div className="w-6 h-1.5 bg-orange-500 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
      </div>

      <div className="relative z-10 px-6 pb-12">
        <div className="mb-8">
          <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-2">
            Southern Evia, Greece
          </p>
          <h1 className="text-white text-4xl font-black leading-tight mb-3">
            Welcome to Karystos
          </h1>
          <p className="text-white/70 text-sm leading-relaxed">
            Discover ancient Dragon Houses, pristine beaches, mountain trails
            and authentic Greek cuisine in Southern Evia.
          </p>
        </div>

        <button
          onClick={onGetStarted}
          className="w-full flex items-center justify-center gap-3 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-base rounded-2xl shadow-lg shadow-orange-500/30 active:scale-[0.98] transition-all"
        >
          Start Exploring
          <ArrowRight size={20} />
        </button>
      </div>

    </div>
  );
}