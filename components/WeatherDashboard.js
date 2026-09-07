'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Wind,
  Droplets,
  Thermometer,
  ShieldAlert,
  Calendar,
  RefreshCw,
  Flame,
  Info,
  CheckCircle,
  AlertTriangle,
  Search,
  Navigation,
  MapPin,
  X,
  Loader2
} from 'lucide-react';

export const CITIES = [
  { id: 'paris', name: 'Paris', lat: 48.8566, lon: 2.3522, region: 'Île-de-France', country: 'France' },
  { id: 'marseille', name: 'Marseille', lat: 43.2965, lon: 5.3698, region: 'Provence-Alpes-Côte d\'Azur', country: 'France' },
  { id: 'lyon', name: 'Lyon', lat: 45.7640, lon: 4.8357, region: 'Auvergne-Rhône-Alpes', country: 'France' },
  { id: 'toulouse', name: 'Toulouse', lat: 43.6047, lon: 1.4442, region: 'Occitanie', country: 'France' },
  { id: 'nice', name: 'Nice', lat: 43.7102, lon: 7.2620, region: 'Provence-Alpes-Côte d\'Azur', country: 'France' },
  { id: 'nantes', name: 'Nantes', lat: 47.2184, lon: -1.5536, region: 'Pays de la Loire', country: 'France' },
  { id: 'bordeaux', name: 'Bordeaux', lat: 44.8378, lon: -0.5792, region: 'Nouvelle-Aquitaine', country: 'France' }
];

// Open-Meteo Weather Code Mapping in French
function getWeatherCondition(code) {
  if (code === 0) return { label: 'Ensoleillé / Ciel dégagé', icon: Sun, color: 'text-amber-400' };
  if (code === 1 || code === 2) return { label: 'Partiellement nuageux', icon: Cloud, color: 'text-slate-300' };
  if (code === 3) return { label: 'Couvert', icon: Cloud, color: 'text-slate-400' };
  if (code >= 45 && code <= 48) return { label: 'Brouillard', icon: CloudFog, color: 'text-slate-400' };
  if (code >= 51 && code <= 67) return { label: 'Pluie / Bruine', icon: CloudRain, color: 'text-blue-400' };
  if (code >= 71 && code <= 77) return { label: 'Neige', icon: CloudSnow, color: 'text-indigo-200' };
  if (code >= 80 && code <= 82) return { label: 'Averses de pluie', icon: CloudRain, color: 'text-blue-400' };
  if (code >= 85 && code <= 86) return { label: 'Averses de neige', icon: CloudSnow, color: 'text-indigo-200' };
  if (code >= 95) return { label: 'Orageux', icon: CloudLightning, color: 'text-amber-500' };
  return { label: 'Météo variable', icon: CloudSunIcon, color: 'text-amber-300' };
}

function CloudSunIcon(props) {
  return <Sun {...props} />;
}

export default function WeatherDashboard() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Interactive Search & Geolocation State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [geoError, setGeoError] = useState(null);

  const searchContainerRef = useRef(null);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const tz = encodeURIComponent('auto');
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&timezone=${tz}`
      );
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des données météo');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message || 'Impossible de récupérer la météo');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  // Handle clicking outside of search dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = async (e) => {
    e?.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError(null);
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery.trim())}&count=5&language=fr&format=json`
      );
      if (!res.ok) {
        throw new Error('Erreur lors de la recherche de ville');
      }
      const data = await res.json();
      if (!data.results || data.results.length === 0) {
        setSearchError('Aucune ville trouvée. Vérifiez l\'orthographe.');
        setSearchResults([]);
      } else {
        setSearchResults(data.results);
      }
    } catch (err) {
      setSearchError('Impossible de contacter le service de recherche.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSearchResult = (result) => {
    const regionName = result.admin1 || result.admin2 || result.country || '';
    const countryName = result.country || '';
    const newCity = {
      id: `custom-${result.id}`,
      name: result.name,
      lat: result.latitude,
      lon: result.longitude,
      region: countryName ? `${regionName}${regionName && countryName !== regionName ? `, ${countryName}` : ''}` : regionName,
      country: countryName
    };
    setSelectedCity(newCity);
    setSearchResults([]);
    setSearchQuery('');
    setSearchError(null);
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setGeoError('La géolocalisation n\'est pas supportée par votre navigateur.');
      return;
    }

    setIsLocating(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // Try reverse lookup or estimate place name via Open-Meteo Geocoding
        let detectedName = 'Ma Position';
        let detectedRegion = 'Position GPS';
        let detectedCountry = '';

        try {
          const res = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${latitude.toFixed(2)},${longitude.toFixed(2)}&count=1&language=fr&format=json`
          );
          if (res.ok) {
            const data = await res.json();
            if (data.results && data.results.length > 0) {
              const place = data.results[0];
              detectedName = place.name;
              detectedCountry = place.country || '';
              detectedRegion = place.admin1 || place.admin2 || place.country || 'Position détectée';
            }
          }
        } catch {
          // Fallback if reverse geocoding request fails
        }

        const geoCity = {
          id: `geo-${Date.now()}`,
          name: detectedName,
          lat: latitude,
          lon: longitude,
          region: detectedRegion,
          country: detectedCountry
        };

        setSelectedCity(geoCity);
        setIsLocating(false);
      },
      (err) => {
        setIsLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setGeoError('Accès à la géolocalisation refusé. Veuillez autoriser l\'accès dans votre navigateur.');
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setGeoError('Les informations de localisation sont indisponibles.');
        } else if (err.code === err.TIMEOUT) {
          setGeoError('La demande de géolocalisation a expiré.');
        } else {
          setGeoError('Impossible de détecter votre position.');
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const currentTemp = weatherData?.current?.temperature_2m;
  const isHeatwave = currentTemp !== undefined && currentTemp >= 30;

  return (
    <div className="space-y-8">
      {/* Search Bar & GPS Auto-Location Header Controls */}
      <div className="bg-slate-900/90 p-4 md:p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input Box */}
          <div className="relative flex-1 w-full" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (searchError) setSearchError(null);
                }}
                placeholder="Rechercher une ville ou un pays (ex: Lyon, Tokyo, Montréal)..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500/80 rounded-2xl py-3 pl-11 pr-10 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                    setSearchError(null);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-full cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Search Suggestions Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden divide-y divide-slate-800/60 max-h-64 overflow-y-auto">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelectSearchResult(result)}
                    className="w-full text-left px-4 py-3 hover:bg-slate-900 transition-colors cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-orange-400 shrink-0 group-hover:scale-110 transition-transform" />
                      <div>
                        <span className="font-semibold text-slate-100 text-sm">{result.name}</span>
                        <span className="text-xs text-slate-400 ml-2">
                          {[result.admin1, result.country].filter(Boolean).join(', ')}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
                      {result.latitude.toFixed(2)}°, {result.longitude.toFixed(2)}°
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearchSubmit}
            disabled={isSearching || !searchQuery.trim()}
            className="w-full sm:w-auto px-5 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold text-sm rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 shrink-0"
          >
            {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>Rechercher</span>
          </button>

          {/* GPS Auto-Location Button */}
          <button
            onClick={handleGeolocation}
            disabled={isLocating}
            title="Détecter ma position GPS"
            className="w-full sm:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-100 font-semibold text-sm rounded-2xl border border-slate-700 transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 shadow-md"
          >
            {isLocating ? (
              <Loader2 className="w-4 h-4 text-orange-400 animate-spin" />
            ) : (
              <Navigation className="w-4 h-4 text-orange-400" />
            )}
            <span>Ma Position GPS</span>
          </button>
        </div>

        {/* Error Feedback Messages for Search & GPS */}
        {(searchError || geoError) && (
          <div className="flex items-center gap-2 text-xs text-red-400 bg-red-950/40 border border-red-800/50 p-3 rounded-xl">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{searchError || geoError}</span>
            <button
              onClick={() => {
                setSearchError(null);
                setGeoError(null);
              }}
              className="ml-auto text-red-400 hover:text-red-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Quick Select Preset City Tabs */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
            Villes rapides :
          </span>
          {CITIES.map((city) => {
            const isActive = city.id === selectedCity.id;
            return (
              <button
                key={city.id}
                onClick={() => {
                  setSelectedCity(city);
                  setSearchError(null);
                  setGeoError(null);
                }}
                className={`px-3.5 py-1.5 rounded-xl font-medium text-xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 bg-slate-950/50 border border-slate-800'
                }`}
              >
                <span>{city.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center space-y-4">
          <RefreshCw className="w-10 h-10 text-orange-500 animate-spin" />
          <p className="text-slate-400 font-medium">Chargement des prévisions en direct pour {selectedCity.name}...</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="bg-red-950/40 border border-red-800/60 rounded-2xl p-6 text-center space-y-3">
          <AlertTriangle className="w-8 h-8 text-red-400 mx-auto" />
          <p className="text-red-300 font-medium">{error}</p>
          <button
            onClick={() => fetchWeather(selectedCity)}
            className="px-4 py-2 bg-red-800/80 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" /> Réessayer
          </button>
        </div>
      )}

      {/* Weather Content */}
      {!loading && !error && weatherData && (
        <div className="space-y-6">
          {/* Heatwave Canicule Alert Banner */}
          {isHeatwave && (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 p-6 text-white shadow-2xl animate-pulse-glow border border-red-400/40">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shrink-0">
                    <Flame className="w-9 h-9 text-yellow-300 animate-bounce" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-white/20 backdrop-blur text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-white/30">
                        Vigilance Météo Extreme
                      </span>
                      <span className="animate-ping inline-flex h-2.5 w-2.5 rounded-full bg-yellow-300 opacity-75"></span>
                    </div>
                    <h2 className="text-2xl font-extrabold tracking-tight mt-1">
                      Alerte Canicule — Température ≥ 30°C
                    </h2>
                    <p className="text-rose-100 text-sm mt-1">
                      Température extrême détectée à {selectedCity.name} ({currentTemp}°C). Prenez des précautions immédiatement.
                    </p>
                  </div>
                </div>
                <div className="self-stretch md:self-auto bg-black/20 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs space-y-1 min-w-[200px]">
                  <p className="font-semibold text-yellow-300 flex items-center gap-1">
                    <ShieldAlert className="w-4 h-4" /> Numéro Canicule Info
                  </p>
                  <p className="text-lg font-bold">0 800 06 66 66</p>
                  <p className="text-slate-200">Appel gratuit depuis un poste fixe en France</p>
                </div>
              </div>
            </div>
          )}

          {/* Main Weather Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                  {selectedCity.region && (
                    <>
                      <span className="font-semibold text-orange-400">{selectedCity.region}</span>
                      <span>•</span>
                    </>
                  )}
                  <span>Mise à jour en direct</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                  Météo à {selectedCity.name}
                  {isHeatwave && (
                    <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-red-400" /> ALERTE CANICULE
                    </span>
                  )}
                </h1>
                {(() => {
                  const cond = getWeatherCondition(weatherData.current.weather_code);
                  const Icon = cond.icon;
                  return (
                    <div className="flex items-center gap-2 mt-3">
                      <Icon className={`w-6 h-6 ${cond.color}`} />
                      <span className="text-lg font-medium text-slate-200">{cond.label}</span>
                    </div>
                  );
                })()}
              </div>

              {/* Temp Display */}
              <div className="flex items-center gap-4 bg-slate-950/60 p-4 sm:p-6 rounded-2xl border border-slate-800/80">
                <div className="text-right">
                  <div className="text-5xl md:text-6xl font-black text-white tracking-tight">
                    {Math.round(currentTemp)}°C
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Ressenti : <span className="text-slate-200 font-semibold">{Math.round(weatherData.current.apparent_temperature)}°C</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60 flex items-center gap-3">
                <div className="p-2.5 bg-blue-500/10 rounded-lg text-blue-400">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Humidité</p>
                  <p className="text-base font-bold text-white">{weatherData.current.relative_humidity_2m}%</p>
                </div>
              </div>

              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60 flex items-center gap-3">
                <div className="p-2.5 bg-teal-500/10 rounded-lg text-teal-400">
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Vent</p>
                  <p className="text-base font-bold text-white">{Math.round(weatherData.current.wind_speed_10m)} km/h</p>
                </div>
              </div>

              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60 flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/10 rounded-lg text-amber-400">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Indice UV Max</p>
                  <p className="text-base font-bold text-white">
                    {weatherData.daily?.uv_index_max?.[0] !== undefined && weatherData.daily?.uv_index_max?.[0] !== null ? Math.round(weatherData.daily.uv_index_max[0]) : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60 flex items-center gap-3">
                <div className="p-2.5 bg-orange-500/10 rounded-lg text-orange-400">
                  <Thermometer className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Min / Max du jour</p>
                  <p className="text-base font-bold text-white">
                    {Math.round(weatherData.daily.temperature_2m_min[0])}° / {Math.round(weatherData.daily.temperature_2m_max[0])}°C
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast Section */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              Prévisions sur 7 jours à {selectedCity.name}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {weatherData.daily.time.map((dateStr, index) => {
                const dateObj = new Date(dateStr);
                const dayName = dateObj.toLocaleDateString('fr-FR', { weekday: 'short' });
                const formattedDate = dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
                const code = weatherData.daily.weather_code[index];
                const cond = getWeatherCondition(code);
                const Icon = cond.icon;
                const maxTemp = Math.round(weatherData.daily.temperature_2m_max[index]);
                const minTemp = Math.round(weatherData.daily.temperature_2m_min[index]);
                const isDayHeatwave = maxTemp >= 30;

                return (
                  <div
                    key={dateStr}
                    className={`p-3.5 rounded-2xl border flex flex-col items-center justify-between text-center transition-all ${
                      index === 0
                        ? 'bg-orange-500/10 border-orange-500/40'
                        : 'bg-slate-950/50 border-slate-800/70'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold capitalize text-slate-300">
                        {index === 0 ? 'Aujourd\'hui' : dayName}
                      </p>
                      <p className="text-[10px] text-slate-400">{formattedDate}</p>
                    </div>

                    <div className="my-3">
                      <Icon className={`w-8 h-8 ${cond.color} mx-auto`} />
                    </div>

                    <div className="w-full">
                      <div className="flex justify-between items-center text-xs px-1">
                        <span className="text-slate-400 font-medium">{minTemp}°</span>
                        <span className={`font-bold ${isDayHeatwave ? 'text-red-400' : 'text-white'}`}>
                          {maxTemp}°
                        </span>
                      </div>
                      {isDayHeatwave && (
                        <div className="mt-1 text-[9px] bg-red-500/20 text-red-400 font-bold py-0.5 rounded border border-red-500/30">
                          ≥ 30°C Canicule
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Extreme Weather / Heatwave Health Recommendations Section */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-orange-500" />
              Conseils en cas de forte chaleur et canicule
            </h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-orange-400 font-semibold">
                  <CheckCircle className="w-4 h-4" /> Hydratation régulière
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Buvez de l’eau régulièrement sans attendre d’avoir soif. Évitez les boissons alcoolisées, très sucrées ou fortement caféinées.
                </p>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-orange-400 font-semibold">
                  <CheckCircle className="w-4 h-4" /> Garder son logement frais
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Fermez les volets et fenêtres pendant la journée exposée au soleil. Aérez la nuit lorsque la température extérieure baisse.
                </p>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-orange-400 font-semibold">
                  <CheckCircle className="w-4 h-4" /> Limiter les efforts physiques
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Évitez les activités sportives ou les efforts intenses aux heures les plus chaudes de la journée (entre 11h et 18h).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
