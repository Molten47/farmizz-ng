import React, { useState, useEffect } from 'react';
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  Wind,
  Loader,
  MapPin,
  Thermometer,
  Droplets,
  Eye,
  Sprout,
  TrendingUp,
  AlertTriangle,
  Navigation
} from 'lucide-react';

// Replace with your Tomorrow.io API key
const TOMORROW_API_KEY = "FNvVogy64k8jljex1mk32A04fSKk9W75";

// Crop recommendation data based on weather conditions
const cropRecommendations = {
  getRecommendations: (temp, humidity, weatherCode, season) => {
    const recommendations = [];
    
    // Temperature-based recommendations (assuming Celsius)
    if (temp >= 20 && temp <= 30) {
      if (humidity >= 60) {
        recommendations.push({
          crop: "Rice",
          reason: "Ideal warm, humid conditions",
          priority: "high",
          icon: "🌾"
        });
        recommendations.push({
          crop: "Tomatoes",
          reason: "Good temperature and moisture",
          priority: "medium",
          icon: "🍅"
        });
      } else {
        recommendations.push({
          crop: "Wheat",
          reason: "Moderate temperature, lower humidity",
          priority: "high",
          icon: "🌾"
        });
        recommendations.push({
          crop: "Corn",
          reason: "Warm weather, drought tolerant",
          priority: "medium",
          icon: "🌽"
        });
      }
    } else if (temp >= 15 && temp < 20) {
      recommendations.push({
        crop: "Potatoes",
        reason: "Cool weather preferred",
        priority: "high",
        icon: "🥔"
      });
      recommendations.push({
        crop: "Carrots",
        reason: "Cool season crop",
        priority: "medium",
        icon: "🥕"
      });
    } else if (temp >= 30) {
      recommendations.push({
        crop: "Sorghum",
        reason: "Heat tolerant",
        priority: "high",
        icon: "🌾"
      });
      recommendations.push({
        crop: "Cotton",
        reason: "Hot weather crop",
        priority: "medium",
        icon: "🌱"
      });
    }

    // Weather-specific recommendations
    if ([4000, 4001, 4200, 4201].includes(weatherCode)) {
      recommendations.push({
        crop: "Rice",
        reason: "Benefits from rain",
        priority: "high",
        icon: "🌾"
      });
    }

    return recommendations.slice(0, 3); // Return top 3 recommendations
  }
};

// Neighboring locations data (you can customize these)
const neighboringLocations = [
  { name: "North Valley", lat: 40.8128, lon: -74.0060, distance: "15 km" },
  { name: "East Plains", lat: 40.7128, lon: -73.9060, distance: "12 km" },
  { name: "South Hills", lat: 40.6128, lon: -74.0060, distance: "18 km" },
  { name: "West Ridge", lat: 40.7128, lon: -74.1060, distance: "10 km" }
];

const getWeatherIcon = (weatherCode, size = 36) => {
  const iconMap = {
    1000: <Sun size={size} className="text-yellow-400" />,
    1001: <Cloud size={size} className="text-gray-400" />,
    1100: <Cloud size={size} className="text-gray-300" />,
    1101: <Cloud size={size} className="text-gray-400" />,
    1102: <Cloud size={size} className="text-gray-500" />,
    2000: <Wind size={size} className="text-gray-400" />,
    2100: <Wind size={size} className="text-gray-300" />,
    4000: <CloudDrizzle size={size} className="text-blue-400" />,
    4001: <CloudRain size={size} className="text-blue-500" />,
    4200: <CloudRain size={size} className="text-blue-400" />,
    4201: <CloudRain size={size} className="text-blue-600" />,
    5000: <CloudSnow size={size} className="text-blue-200" />,
    5001: <CloudSnow size={size} className="text-blue-200" />,
    5100: <CloudSnow size={size} className="text-blue-100" />,
    5101: <CloudSnow size={size} className="text-blue-300" />,
    8000: <CloudLightning size={size} className="text-purple-400" />,
  };
  return iconMap[weatherCode] || <Cloud size={size} className="text-gray-400" />;
};

const getWeatherDescription = (weatherCode) => {
  const descriptions = {
    1000: "Clear", 1001: "Cloudy", 1100: "Mostly Clear", 1101: "Partly Cloudy",
    1102: "Mostly Cloudy", 2000: "Fog", 2100: "Light Fog", 4000: "Drizzle",
    4001: "Rain", 4200: "Light Rain", 4201: "Heavy Rain", 5000: "Snow",
    5001: "Flurries", 5100: "Light Snow", 5101: "Heavy Snow", 8000: "Thunderstorm"
  };
  return descriptions[weatherCode] || "Unknown";
};

const convertTemp = (celsius, unit) => {
  if (celsius === undefined || celsius === null) return 'N/A';
  return unit === 'C' ? Math.round(celsius) : Math.round(celsius * 9/5 + 32);
};

const WeatherDashboard = ({ onLocationSelect }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [neighborWeather, setNeighborWeather] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('C');
  const [activeTab, setActiveTab] = useState('current');

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            name: "Current Location"
          });
        },
        () => {
          setUserLocation({ lat: 40.7128, lon: -74.0060, name: "Default Location" });
        }
      );
    }
  }, []);

  // Fetch weather data
  const fetchWeatherForLocation = async (location) => {
    if (!TOMORROW_API_KEY || TOMORROW_API_KEY === "YOUR_TOMORROW_IO_API_KEY") {
      throw new Error("API key not configured");
    }

    const url = `https://api.tomorrow.io/v4/weather/realtime?location=${location.lat},${location.lon}&apikey=${TOMORROW_API_KEY}&units=metric`;
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Rate limit exceeded");
      }
      throw new Error(`API error: ${response.status}`);
    }
    
    return response.json();
  };

  useEffect(() => {
    const loadWeatherData = async () => {
      if (!userLocation) return;

      try {
        setIsLoading(true);
        setError(null);

        // Fetch current location weather
        const currentData = await fetchWeatherForLocation(userLocation);
        setCurrentWeather({ ...currentData, location: userLocation });

        // Fetch neighboring locations weather
        const neighborPromises = neighboringLocations.map(async (location) => {
          try {
            const data = await fetchWeatherForLocation(location);
            return { ...data, location };
          } catch (err) {
            return { error: err.message, location };
          }
        });

        const neighborResults = await Promise.all(neighborPromises);
        setNeighborWeather(neighborResults);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadWeatherData();
  }, [userLocation]);

  const handleLocationClick = (locationData) => {
    setSelectedLocation(locationData);
    if (onLocationSelect) {
      onLocationSelect(locationData);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center h-64">
          <Loader className="animate-spin mr-3" size={24} />
          <span className="text-gray-600">Loading weather data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Weather & Crop Insights</h2>
        <p className="text-green-100">Real-time weather data and agricultural recommendations</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('current')}
          className={`px-6 py-3 font-medium ${
            activeTab === 'current'
              ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
              : 'text-gray-600 hover:text-green-600'
          }`}
        >
          <MapPin className="inline-block mr-2" size={16} />
          Current Location
        </button>
        <button
          onClick={() => setActiveTab('neighbors')}
          className={`px-6 py-3 font-medium ${
            activeTab === 'neighbors'
              ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
              : 'text-gray-600 hover:text-green-600'
          }`}
        >
          <Navigation className="inline-block mr-2" size={16} />
          Nearby Areas
        </button>
        <button
          onClick={() => setActiveTab('crops')}
          className={`px-6 py-3 font-medium ${
            activeTab === 'crops'
              ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
              : 'text-gray-600 hover:text-green-600'
          }`}
        >
          <Sprout className="inline-block mr-2" size={16} />
          Crop Recommendations
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertTriangle className="text-red-500 mr-2" size={20} />
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {/* Current Location Tab */}
        {activeTab === 'current' && currentWeather && (
          <div className="space-y-6">
            {/* Main Weather Card */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Current Weather</h3>
                  <p className="text-blue-100">{currentWeather.location.name}</p>
                </div>
                {getWeatherIcon(currentWeather.data.values.weatherCode, 48)}
              </div>

              <div className="flex items-center mb-4">
                <span className="text-4xl font-bold">
                  {convertTemp(currentWeather.data.values.temperature, unit)}°{unit}
                </span>
                <span className="ml-3 text-blue-100">
                  {getWeatherDescription(currentWeather.data.values.weatherCode)}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Droplets className="mx-auto mb-1" size={16} />
                  <p className="text-xs text-blue-200">Humidity</p>
                  <p className="font-semibold">{Math.round(currentWeather.data.values.humidity)}%</p>
                </div>
                <div>
                  <Wind className="mx-auto mb-1" size={16} />
                  <p className="text-xs text-blue-200">Wind Speed</p>
                  <p className="font-semibold">{Math.round(currentWeather.data.values.windSpeed * 3.6)} km/h</p>
                </div>
                <div>
                  <Eye className="mx-auto mb-1" size={16} />
                  <p className="text-xs text-blue-200">Visibility</p>
                  <p className="font-semibold">{Math.round(currentWeather.data.values.visibility || 10)} km</p>
                </div>
              </div>

              <button
                onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
                className="mt-4 px-3 py-1 text-sm bg-blue-700 rounded hover:bg-blue-800 transition"
              >
                Switch to °{unit === 'C' ? 'F' : 'C'}
              </button>
            </div>
          </div>
        )}

        {/* Neighboring Locations Tab */}
        {activeTab === 'neighbors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {neighborWeather.map((weather, index) => (
              <div
                key={index}
                onClick={() => !weather.error && handleLocationClick(weather)}
                className={`border rounded-lg p-4 transition cursor-pointer ${
                  weather.error 
                    ? 'border-red-200 bg-red-50' 
                    : 'hover:border-green-300 hover:shadow-md border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-800">{weather.location.name}</h4>
                    <p className="text-sm text-gray-500">{weather.location.distance} away</p>
                  </div>
                  {!weather.error && getWeatherIcon(weather.data.values.weatherCode, 32)}
                </div>

                {weather.error ? (
                  <p className="text-red-600 text-sm">Weather data unavailable</p>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-800">
                        {convertTemp(weather.data.values.temperature, unit)}°{unit}
                      </span>
                      <span className="text-sm text-gray-600">
                        {getWeatherDescription(weather.data.values.weatherCode)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Humidity: {Math.round(weather.data.values.humidity)}%</span>
                      <span>Wind: {Math.round(weather.data.values.windSpeed * 3.6)} km/h</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Crop Recommendations Tab */}
        {activeTab === 'crops' && currentWeather && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                <TrendingUp className="mr-2" size={20} />
                Recommended Crops for Current Conditions
              </h3>
              <p className="text-green-700 text-sm">
                Based on temperature: {convertTemp(currentWeather.data.values.temperature, unit)}°{unit}, 
                humidity: {Math.round(currentWeather.data.values.humidity)}%
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cropRecommendations.getRecommendations(
                currentWeather.data.values.temperature,
                currentWeather.data.values.humidity,
                currentWeather.data.values.weatherCode,
                'current'
              ).map((rec, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 ${
                    rec.priority === 'high' 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-yellow-300 bg-yellow-50'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{rec.icon}</span>
                    <h4 className="font-semibold text-gray-800">{rec.crop}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{rec.reason}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    rec.priority === 'high' 
                      ? 'bg-green-200 text-green-800' 
                      : 'bg-yellow-200 text-yellow-800'
                  }`}>
                    {rec.priority} priority
                  </span>
                </div>
              ))}
            </div>

            {/* Additional farming tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Current Weather Farming Tips</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                {currentWeather.data.values.humidity > 70 && (
                  <li>• High humidity - Monitor for fungal diseases</li>
                )}
                {currentWeather.data.values.windSpeed > 5 && (
                  <li>• Windy conditions - Secure plant supports and covers</li>
                )}
                {[4000, 4001, 4200, 4201].includes(currentWeather.data.values.weatherCode) && (
                  <li>• Rain expected - Good time for transplanting</li>
                )}
                {currentWeather.data.values.temperature > 30 && (
                  <li>• High temperature - Ensure adequate irrigation</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;