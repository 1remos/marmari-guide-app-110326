import React, { useState } from 'react';
import WelcomePage from './pages/WelcomePage';
import HomeSelection from './pages/HomeSelection';
import UsefulContacts from './pages/UsefulContacts';
import WeatherGuide from './pages/WeatherGuide';
import BeachesList from './pages/BeachesList';
import MountainEscapes from './pages/MountainEscapes';
import AccommodationPage from './pages/AccommodationPage';
import GastronomyPage from './pages/GastronomyPage';
import EventsPage from './pages/EventsPage';
import Home from './pages/Home';
import DragonHousesPage from './pages/DragonHousesPage';
import InteractiveMap from './pages/InteractiveMap';
import FavoritesPage from './pages/FavoritesPage';
import RestaurantsList from './pages/RestaurantsList';
import AIConcierge from './components/AIConcierge';
import WindBeachAdvisor from './components/WindBeachAdvisor';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('welcome');

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {currentPage === 'welcome'       && <WelcomePage onGetStarted={() => navigateTo('selection')} />}
      {currentPage === 'selection'     && <HomeSelection onSelect={() => navigateTo('home')} onNavigate={navigateTo} />}
      {currentPage === 'home'          && <Home onNavigate={navigateTo} />}
      {currentPage === 'dragon-houses' && <DragonHousesPage onBack={() => navigateTo('selection')} onNavigate={navigateTo} />}
      {currentPage === 'map'           && <InteractiveMap onBack={() => navigateTo('selection')} onNavigate={navigateTo} />}
      {currentPage === 'contacts'      && <UsefulContacts onBack={() => navigateTo('selection')} onNavigate={navigateTo} />}
      {currentPage === 'weather'       && <WeatherGuide onBack={() => navigateTo('selection')} onNavigate={navigateTo} />}
      {currentPage === 'beaches'       && <BeachesList onBack={() => navigateTo('selection')} onNavigate={navigateTo} />}
      {currentPage === 'mountain'      && <MountainEscapes onBack={() => navigateTo('selection')} onNavigate={navigateTo} />}
      {currentPage === 'accommodation' && <AccommodationPage onBack={() => navigateTo('selection')} onNavigate={navigateTo} />}
      {currentPage === 'gastronomy'    && <GastronomyPage onBack={() => navigateTo('selection')} onNavigate={navigateTo} />}
      {currentPage === 'events'        && <EventsPage onBack={() => navigateTo('selection')} onNavigate={navigateTo} />}
      {currentPage === 'favorites'     && <FavoritesPage onBack={() => navigateTo('selection')} onNavigate={navigateTo} />}
      {currentPage === 'restaurants'   && <RestaurantsList onBack={() => navigateTo('selection')} onNavigate={navigateTo} />}
      {currentPage === 'wind-advisor'  && <WindBeachAdvisor onNavigate={navigateTo} />}

      {currentPage !== 'welcome' && <AIConcierge onNavigate={navigateTo} />}
    </div>
  );
}

export default App;