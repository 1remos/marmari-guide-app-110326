import React, { useState, useEffect } from 'react';
import { Wind, Waves, RefreshCw, MapPin, ThumbsUp, ThumbsDown } from 'lucide-react';

interface BeachRecommendation {
  name: string;
  description: string;
  recommended: boolean;
  reason: string;
}

interface WeatherData {
  windSpeed: number;
  windDeg: number;
  temp: number;
  description: string;
}

const getWindDirection = (deg: number): string => {
  if (deg >= 337.5 || deg < 22.5) return 'N';
  if (deg >= 22.5 && deg < 67.5) return 'NE';
  if (deg >= 67.5 && deg < 112.5) return 'E';
  if (deg >= 112.5 && deg < 157.5) return 'SE';
  if (deg >= 157.5 && deg < 202.5) return 'S';
  if (deg >= 202.5 && deg < 247.5) return 'SW';
  if (deg >= 247.5 && deg < 292.5) return 'W';
  return 'NW';
};

const getWindLabel = (speed: number): { label: string; color: string } => {
  if (speed < 3) return { label: 'Calm', color: 'text-emerald-500' };
  if (speed < 6) return { label: 'Light Breeze', color: 'text-emerald-500' };
  if (speed < 10) return { label: 'Moderate', color: 'text-amber-500' };
  if (speed < 14) return { label: 'Strong - Meltemi!', color: 'text-orange-500' };
  return { label: 'Very Strong', color: 'text-red-500' };
};

const getBeachRecommendations = (windSpeed: number, windDeg: number): BeachRecommendation[] => {
  const dir = getWindDirection(windDeg);
  const isNorth = ['N', 'NE', 'NW'].includes(dir);
  const isSouth = ['S', 'SE', 'SW'].includes(dir);
  const isStrong = windSpeed >= 8;

  return [
    {
      name: 'Psili Ammos',
      description: 'Sandy beach, shallow waters',
      recommended: isSouth ? false : true,
      reason: isSouth && isStrong
        ? 'Exposed to south winds today'
        : 'Protected from north winds — calm waters today!'
    },
    {
      name: 'Bouros Beach',
      description: 'Blue Flag, organized',
      recommended: isNorth && isStrong ? false : true,
      reason: isNorth && isStrong
        ? 'Strong north winds — rough sea expected'
        : 'Good conditions today!'
    },
    {
      name: 'Cavo Doro',
      description: 'Famous windsurfing spot',
      recommended: isStrong,
      reason: isStrong
        ? 'Perfect for windsurfing with strong winds today!'
        : 'Light winds — better for swimming than windsurfing'
    },
    {
      name: 'Agia Triada',
      description: 'Quiet, scenic beach',
      recommended: true,
      reason: 'Naturally sheltered — good conditions almost always!'
    },
    {
      name: 'Katakalou',
      description: 'Pebbly, crystal clear',
      recommended: !isStrong,
      reason: isStrong
        ? 'Waves expected due to strong winds'
        : 'Calm and clear waters today!'
    }
  ];
};

interface WindBeachAdvisorProps {
  onNavigate?: (page: string) => void;
}

export default function WindBeachAdvisor({ onNavigate }: WindBeachAdvisorProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  const API_KEY = 'ΒΑΛΕ_ΤΟ_OPENWEATHER_KEY_ΕΔΩ';

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Karystos,GR&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error('Weather fetch failed');
      const data = await response.json();
      setWeather({
        windSpeed: data.wind.speed,
        windDeg: data.wind.deg,
        temp: Math.round(data.main.temp),
        description: data.weather[0].description
      });
      const now = new Date();
      setLastUpdated(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`);
    } catch {
      setError('Could not fetch weather. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const recommendations = weather ? getBeachRecommendations(weather.windSpeed, weather.windDeg) : [];
  const windInfo = weather ? getWindLabel(weather.windSpeed) : null;
  const windDir = weather ? getWindDirection(weather.windDeg) : null;

  return (
    <div className="flex h-screen w-full flex-col bg-sky-50 overflow-hidden max-w-[430px] mx-auto border-x border-sky-200 font-sans">

      {/* Header */}
      <div className="bg-white border-b border-sky-100 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-blue-900">Wind & Beach Advisor</h1>
            <p className="text-xs text-slate-400">Real-time conditions for Karystos</p>
          </div>
          <button
            onClick={fetchWeather}
            className="p-2 bg-sky-100 rounded-full hover:bg-sky-200 transition-colors text-blue-900"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32 px-4 py-4 space-y-4">

        {loading && (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-2xl text-center">
            {error}
          </div>
        )}

        {weather && windInfo && (
          <>
            {/* Weather Card */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <MapPin size={12} className="text-blue-200" />
                    <span className="text-xs text-blue-200 font-bold uppercase tracking-wider">Karystos, Euboea</span>
                  </div>
                  <p className="text-4xl font-black">{weather.temp}C</p>
                  <p className="text-blue-200 text-sm capitalize mt-1">{weather.description}</p>
                </div>
                <Wind size={48} className="text-blue-300 opacity-80" />
              </div>
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/20">
                <div className="text-center">
                  <p className="text-[10px] uppercase font-bold text-blue-200 mb-1">Speed</p>
                  <p className="font-black text-lg">{weather.windSpeed}</p>
                  <p className="text-[10px] text-blue-200">m/s</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] uppercase font-bold text-blue-200 mb-1">Direction</p>
                  <p className="font-black text-lg">{windDir}</p>
                  <p className="text-[10px] text-blue-200">{weather.windDeg}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] uppercase font-bold text-blue-200 mb-1">Status</p>
                  <p className="font-black text-sm text-white">
                    {windInfo.label}
                  </p>
                </div>
              </div>
              {lastUpdated && (
                <p className="text-[10px] text-blue-300 mt-3 text-right">Updated: {lastUpdated}</p>
              )}
            </div>

            {/* Meltemi Warning */}
            {weather.windSpeed >= 8 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <Wind size={20} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-700 text-sm">Meltemi Winds Active!</p>
                  <p className="text-amber-600 text-xs mt-1">
                    Strong north winds today. Avoid exposed northern beaches.
                    Head south for calmer waters!
                  </p>
                </div>
              </div>
            )}

            {/* Beach Recommendations */}
            <div>
              <h2 className="text-lg font-black text-blue-900 mb-3">
                Beach Recommendations Today
              </h2>
              <div className="space-y-3">
                {recommendations.map((beach) => (
                  <div
                    key={beach.name}
                    className={`bg-white rounded-2xl p-4 border shadow-sm ${
                      beach.recommended ? 'border-emerald-100' : 'border-red-100 opacity-75'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-xl shrink-0 ${
                          beach.recommended ? 'bg-emerald-50' : 'bg-red-50'
                        }`}>
                          {beach.recommended
                            ? <ThumbsUp size={16} className="text-emerald-500" />
                            : <ThumbsDown size={16} className="text-red-400" />
                          }
                        </div>
                        <div>
                          <p className="font-bold text-blue-900 text-sm">{beach.name}</p>
                          <p className="text-xs text-slate-400">{beach.description}</p>
                          <p className={`text-xs mt-1 font-medium ${
                            beach.recommended ? 'text-emerald-600' : 'text-red-400'
                          }`}>
                            {beach.reason}
                          </p>
                        </div>
                      </div>
                      <span className={`shrink-0 text-[10px] font-bold px-2 py-1 rounded-full ${
                        beach.recommended
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-500'
                      }`}>
                        {beach.recommended ? 'GO' : 'AVOID'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => onNavigate && onNavigate('beaches')}
              className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl transition-colors flex items-center justify-center gap-2"
            >
              <Waves size={20} />
              View All Beaches
            </button>
          </>
        )}
      </div>
    </div>
  );
}