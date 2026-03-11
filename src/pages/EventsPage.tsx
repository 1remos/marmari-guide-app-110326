import React from 'react';
import { ChevronLeft, MapPin, Clock } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import PageHeader from '../components/PageHeader';

interface EventsPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export default function EventsPage({ onBack, onNavigate }: EventsPageProps) {
  const events = [
    {
      id: 1,
      title: "Γιορτή Κρασιού Καρύστου",
      date: "15 Αυγούστου, 2026",
      location: "Πλατεία Αμαλίας",
      time: "21:00",
      img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Ναυτική Εβδομάδα",
      date: "1-7 Ιουλίου, 2026",
      location: "Λιμάνι Καρύστου",
      time: "Ολοήμερο",
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="flex h-screen w-full flex-col bg-sky-50 overflow-hidden max-w-[430px] mx-auto border-x border-sky-200 font-sans">

      <PageHeader title="Events & Festivals" onBack={onBack} onNavigate={onNavigate} />

      <main className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-6 pb-32">
        <h1 className="text-2xl font-extrabold tracking-tight text-blue-900">Upcoming Events</h1>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl overflow-hidden border border-sky-100 shadow-sm group"
            >
              <div className="relative h-48 w-full">
                <img
                  src={event.img}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt={event.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                    {event.date}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold text-blue-900">{event.title}</h3>
                <div className="flex flex-col gap-2 text-sm text-slate-500 font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-orange-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-emerald-500" />
                    <span>{event.time}</span>
                  </div>
                </div>
                <button className="w-full mt-2 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav onNavigate={onNavigate} activePage="events" />
    </div>
  );
}