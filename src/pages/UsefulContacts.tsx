import React from 'react';
import { Phone, Shield, Ship, Car, Activity, Map } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import PageHeader from '../components/PageHeader';

const UsefulContacts = ({ onBack, onNavigate }: {
  onBack: () => void;
  onNavigate: (page: string) => void;
}) => {
  return (
    <div className="flex h-screen w-full flex-col bg-sky-50 overflow-hidden max-w-[430px] mx-auto border-x border-sky-200 font-sans">

      <PageHeader title="Useful Contacts" onBack={onBack} onNavigate={onNavigate} />

      <div className="flex-1 overflow-y-auto pb-32 px-4">
        <div className="py-6">
          <div className="bg-blue-600 rounded-xl p-6 text-white shadow-lg mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Map size={24} />
              <span className="font-bold uppercase text-xs tracking-wider">Municipality of Karystos</span>
            </div>
            <h3 className="text-2xl font-bold">Emergency Directory</h3>
          </div>
          <SectionTitle title="Emergency & Authorities" />
          <ContactItem icon={<Shield size={20} />} title="General Emergency" phone="112" isEmergency />
          <ContactItem icon={<Shield size={20} />} title="Police Station" phone="+30 22240 22262" />
          <SectionTitle title="Transport & Port" />
          <ContactItem icon={<Ship size={20} />} title="Port Authority" phone="+30 22240 22227" />
          <ContactItem icon={<Car size={20} />} title="Taxi Station" phone="+30 22240 22590" />
          <SectionTitle title="Health Services" />
          <ContactItem icon={<Activity size={20} />} title="General Hospital" phone="+30 22243 50100" />
        </div>
      </div>

      <BottomNav onNavigate={onNavigate} activePage="contacts" />
    </div>
  );
};

const SectionTitle = ({ title }: { title: string }) => (
  <h3 className="text-sm font-bold uppercase tracking-wider px-2 pb-2 pt-6 text-slate-400">{title}</h3>
);

const ContactItem = ({ icon, title, phone, isEmergency = false }: {
  icon: React.ReactNode;
  title: string;
  phone: string;
  isEmergency?: boolean;
}) => (
  <div className="flex items-center gap-4 py-3 border-b border-sky-100">
    <div className={`flex items-center justify-center rounded-lg size-12 ${isEmergency ? 'bg-red-500 text-white' : 'bg-blue-600/10 text-blue-600'}`}>
      {icon}
    </div>
    <div className="flex-1">
      <p className={`font-bold ${isEmergency ? 'text-red-600' : 'text-blue-900'}`}>{title}</p>
      <p className="text-slate-500 text-sm">{phone}</p>
    </div>
    <a href={`tel:${phone}`} className="bg-orange-500 text-white p-3 rounded-full shadow-md active:scale-90 transition-transform">
      <Phone size={18} fill="currentColor" />
    </a>
  </div>
);

export default UsefulContacts;