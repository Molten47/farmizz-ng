import React, { useState, useEffect } from 'react';
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  Wind,
  Loader
} from 'lucide-react';

// Replace with your Tomorrow.io API key
const TOMORROW_API_KEY = "FNvVogy64k8jljex1mk32A04fSKk9W75";

// For testing purposes, you can also set it here directly:
// const TOMORROW_API_KEY = "your_actual_api_key_here";

const getWeatherIcon = (weatherCode) => {
  // Tomorrow.io weather codes mapping
  const iconMap = {
    1000: <Sun size={36} className="text-yellow-300" />, // Clear
    1001: <Cloud size={36} className="text-white" />, // Cloudy
    1100: <Cloud size={36} className="text-white opacity-80" />, // Mostly Clear
    1101: <Cloud size={36} className="text-white" />, // Partly Cloudy
    1102: <Cloud size={36} className="text-gray-300" />, // Mostly Cloudy
    2000: <Wind size={36} className="text-white" />, // Fog
    2100: <Wind size={36} className="text-white opacity-70" />, // Light Fog
    4000: <CloudDrizzle size={36} className="text-white" />, // Drizzle
    4001: <CloudRain size={36} className="text-white" />, // Rain
    4200: <CloudRain size={36} className="text-white opacity-80" />, // Light Rain
    4201: <CloudRain size={36} className="text-white" />, // Heavy Rain
    5000: <CloudSnow size={36} className="text-white" />, // Snow
    5001: <CloudSnow size={36} className="text-white opacity-80" />, // Flurries
    5100: <CloudSnow size={36} className="text-white opacity-70" />, // Light Snow
    5101: <CloudSnow size={36} className="text-white" />, // Heavy Snow
    6000: <CloudSnow size={36} className="text-white" />, // Freezing Drizzle
    6001: <CloudSnow size={36} className="text-white" />, // Freezing Rain
    6200: <CloudSnow size={36} className="text-white opacity-80" />, // Light Freezing Rain
    6201: <CloudSnow size={36} className="text-white" />, // Heavy Freezing Rain
    7000: <CloudSnow size={36} className="text-white" />, // Ice Pellets
    7101: <CloudSnow size={36} className="text-white" />, // Heavy Ice Pellets
    7102: <CloudSnow size={36} className="text-white opacity-80" />, // Light Ice Pellets
    8000: <CloudLightning size={36} className="text-white" />, // Thunderstorm
  };
  return iconMap[weatherCode] || <Cloud size={36} className="text-white" />;
};

const getSmallWeatherIcon = (weatherCode) => {
  const smallIconMap = {
    1000: <Sun size={18} className="mx-auto my-1" />, // Clear
    1001: <Cloud size={18} className="mx-auto my-1" />, // Cloudy
    1100: <Cloud size={18} className="mx-auto my-1" />, // Mostly Clear
    1101: <Cloud size={18} className="mx-auto my-1" />, // Partly Cloudy
    1102: <Cloud size={18} className="mx-auto my-1" />, // Mostly Cloudy
    2000: <Wind size={18} className="mx-auto my-1" />, // Fog
    2100: <Wind size={18} className="mx-auto my-1" />, // Light Fog
    4000: <CloudDrizzle size={18} className="mx-auto my-1" />, // Drizzle
    4001: <CloudRain size={18} className="mx-auto my-1" />, // Rain
    4200: <CloudRain size={18} className="mx-auto my-1" />, // Light Rain
    4201: <CloudRain size={18} className="mx-auto my-1" />, // Heavy Rain
    5000: <CloudSnow size={18} className="mx-auto my-1" />, // Snow
    5001: <CloudSnow size={18} className="mx-auto my-1" />, // Flurries
    5100: <CloudSnow size={18} className="mx-auto my-1" />, // Light Snow
    5101: <CloudSnow size={18} className="mx-auto my-1" />, // Heavy Snow
    6000: <CloudSnow size={18} className="mx-auto my-1" />, // Freezing Drizzle
    6001: <CloudSnow size={18} className="mx-auto my-1" />, // Freezing Rain
    6200: <CloudSnow size={18} className="mx-auto my-1" />, // Light Freezing Rain
    6201: <CloudSnow size={18} className="mx-auto my-1" />, // Heavy Freezing Rain
    7000: <CloudSnow size={18} className="mx-auto my-1" />, // Ice Pellets
    7101: <CloudSnow size={18} className="mx-auto my-1" />, // Heavy Ice Pellets
    7102: <CloudSnow size={18} className="mx-auto my-1" />, // Light Ice Pellets
    8000: <CloudLightning size={18} className="mx-auto my-1" />, // Thunderstorm
  };
  return smallIconMap[weatherCode] || <Cloud size={18} className="mx-auto my-1" />;
};

const getWeatherDescription = (weatherCode) => {
  const descriptions = {
    1000: "Clear",
    1001: "Cloudy",
    1100: "Mostly Clear",
    1101: "Partly Cloudy",
    1102: "Mostly Cloudy",
    2000: "Fog",
    2100: "Light Fog",
    4000: "Drizzle",
    4001: "Rain",
    4200: "Light Rain",
    4201: "Heavy Rain",
    5000: "Snow",
    5001: "Flurries",
    5100: "Light Snow",
    5101: "Heavy Snow",
    6000: "Freezing Drizzle",
    6001: "Freezing Rain",
    6200: "Light Freezing Rain",
    6201: "Heavy Freezing Rain",
    7000: "Ice Pellets",
    7101: "Heavy Ice Pellets",
    7102: "Light Ice Pellets",
    8000: "Thunderstorm"
  };
  return descriptions[weatherCode] || "Unknown";
};

const getDayName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

const convertTemp = (celsius, unit) => {
  if (celsius === undefined || celsius === null) return 'N/A';
  return unit === 'C'
    ? Math.round(celsius)
    : Math.round(celsius * 9/5 + 32);
};

const WeatherWidget = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unit, setUnit] = useState('F'); // Default to Fahrenheit
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const farmLocation = location || userLocation || { lat: 40.7128, lon: -74.0060 };

  // Get user's current location
  useEffect(() => {
    const getCurrentLocation = () => {
      if (!navigator.geolocation) {
        setLocationError("Geolocation is not supported by this browser.");
        return;
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // Cache for 5 minutes
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          setLocationError(null);
        },
        (error) => {
          let errorMessage;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location access denied. Using default location.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information unavailable. Using default location.";
              break;
            case error.TIMEOUT:
              errorMessage = "Location request timed out. Using default location.";
              break;
            default:
              errorMessage = "An unknown error occurred. Using default location.";
              break;
          }
          setLocationError(errorMessage);
          console.log("Geolocation error:", errorMessage);
        },
        options
      );
    };

    // Only get location if no location prop is provided
    if (!location) {
      getCurrentLocation();
    }
  }, [location]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check if API key is set
        if (!TOMORROW_API_KEY || TOMORROW_API_KEY === "YOUR_TOMORROW_IO_API_KEY") {
          throw new Error("Tomorrow.io API key not configured. Please add your API key to the code.");
        }

        // Use separate but optimized API calls
        const realtimeUrl = `https://api.tomorrow.io/v4/weather/realtime?location=${farmLocation.lat},${farmLocation.lon}&apikey=${TOMORROW_API_KEY}&units=metric`;
        const forecastUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${farmLocation.lat},${farmLocation.lon}&timesteps=1d&apikey=${TOMORROW_API_KEY}&units=metric`;

        console.log("Fetching from Tomorrow.io API...");

        // Fetch current weather
        const realtimeRes = await fetch(realtimeUrl);
        if (!realtimeRes.ok) {
          const errorText = await realtimeRes.text();
          console.error("API Response:", errorText);
          
          if (realtimeRes.status === 401) {
            throw new Error("Invalid API key. Please check your Tomorrow.io API key.");
          } else if (realtimeRes.status === 404) {
            throw new Error("API endpoint not found. Please check the API URL.");
          } else if (realtimeRes.status === 403) {
            throw new Error("API access forbidden. Check your API key permissions.");
          } else if (realtimeRes.status === 429) {
            throw new Error("Rate limit exceeded. Tomorrow.io free tier allows 25 calls/hour. Please wait before trying again.");
          } else {
            throw new Error(`API error (${realtimeRes.status}): ${errorText}`);
          }
        }

        const realtimeData = await realtimeRes.json();
        
        // Try to fetch forecast, but continue if it fails (to save API calls when rate limited)
        let dailyForecasts = [];
        try {
          const forecastRes = await fetch(forecastUrl);
          if (forecastRes.ok) {
            const forecastData = await forecastRes.json();
            dailyForecasts = forecastData.timelines.daily.slice(1, 4); // Next 3 days
          } else if (forecastRes.status === 429) {
            console.warn("Forecast rate limited, using current weather only");
          } else {
            console.warn("Forecast API failed, using current weather only");
          }
        } catch (forecastError) {
          console.warn("Forecast request failed:", forecastError);
        }

        setWeatherData(realtimeData);
        setForecastData(dailyForecasts);
        
        // Skip alerts for now to reduce API calls
        setAlerts([]);
        setIsLoading(false);

        // Cache the data with timestamp to avoid frequent refetches
        const cacheData = {
          weather: realtimeData,
          forecast: dailyForecasts,
          timestamp: Date.now(),
          location: `${farmLocation.lat},${farmLocation.lon}`
        };
        localStorage.setItem('weatherCache', JSON.stringify(cacheData));

      } catch (err) {
        console.error("Weather API Error:", err);
        
        // Try to load from cache if API fails
        const cachedData = localStorage.getItem('weatherCache');
        if (cachedData) {
          try {
            const cache = JSON.parse(cachedData);
            const cacheAge = Date.now() - cache.timestamp;
            const cacheLocation = cache.location;
            const currentLocation = `${farmLocation.lat},${farmLocation.lon}`;
            
            // Use cache if less than 30 minutes old and same location
            if (cacheAge < 30 * 60 * 1000 && cacheLocation === currentLocation) {
              setWeatherData(cache.weather);
              setForecastData(cache.forecast);
              setAlerts([]);
              setError("Using cached data due to API limits. Data may be up to 30 minutes old.");
              setIsLoading(false);
              return;
            }
          } catch (cacheError) {
            console.error("Cache error:", cacheError);
          }
        }
        
        setError(err.message);
        setIsLoading(false);
      }
    };

    // Only fetch weather data if we have a location
    if (farmLocation.lat && farmLocation.lon) {
      fetchWeatherData();
    }
  }, [farmLocation.lat, farmLocation.lon]);

  const formatTodayDate = () => {
    return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const toggleTempUnit = () => setUnit((prev) => (prev === 'F' ? 'C' : 'F'));

  const requestLocation = () => {
    setIsLoading(true);
    setLocationError(null);
    
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      setIsLoading(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0 // Force fresh location
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        setLocationError(null);
      },
      (error) => {
        let errorMessage;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location access in your browser settings.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred while getting location.";
            break;
        }
        setLocationError(errorMessage);
        setIsLoading(false);
      },
      options
    );
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm p-6 text-white flex items-center justify-center h-64">
        <Loader size={36} className="animate-spin" />
        <span className="ml-2">Loading weather data...</span>
      </div>
    );
  }

  if (error || !weatherData?.data) {
    return (
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm p-6 text-white">
        <h3 className="font-semibold text-lg">Weather Unavailable</h3>
        <p className="text-blue-100">{formatTodayDate()}</p>
        <div className="mt-6 text-center">
          <p className="text-sm mb-4">{error || "No current data available."}</p>
          
          {/* Rate Limit Information */}
          {error && error.includes("Rate limit") && (
            <div className="mt-4 p-4 bg-orange-700 rounded text-left text-sm">
              <h4 className="font-semibold text-orange-200 mb-2">Rate Limit Info:</h4>
              <ul className="text-orange-100 space-y-1 text-xs">
                <li>• Free tier: 25 calls per hour</li>
                <li>• Wait 1 hour before trying again</li>
                <li>• Data is cached for 30 minutes</li>
                <li>• Consider upgrading for more calls</li>
              </ul>
            </div>
          )}
          
          {/* API Key Setup Instructions */}
          {(!TOMORROW_API_KEY || TOMORROW_API_KEY === "YOUR_TOMORROW_IO_API_KEY") && (
            <div className="mt-4 p-4 bg-blue-700 rounded text-left text-sm">
              <h4 className="font-semibold text-yellow-200 mb-2">Setup Required:</h4>
              <ol className="text-blue-100 space-y-1 text-xs">
                <li>1. Go to <a href="https://www.tomorrow.io" target="_blank" rel="noopener noreferrer" className="text-yellow-200 underline">tomorrow.io</a></li>
                <li>2. Sign up for a free account</li>
                <li>3. Get your API key from the dashboard</li>
                <li>4. Replace "YOUR_TOMORROW_IO_API_KEY" in the code</li>
              </ol>
            </div>
          )}
          
          {locationError && (
            <div className="mt-4 p-3 bg-blue-700 rounded text-sm">
              <p className="text-yellow-200">{locationError}</p>
              <button
                onClick={requestLocation}
                className="mt-2 px-3 py-1 text-xs bg-blue-800 rounded hover:bg-blue-900 transition"
              >
                Try Again
              </button>
            </div>
          )}
          
          {error && error.includes("API key") && (
            <div className="mt-4 p-3 bg-red-700 rounded text-sm">
              <p className="text-red-100">API Key Issue: {error}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const current = weatherData.data.values;
  const weatherCode = current.weatherCode;

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm p-6 text-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">
            {location ? "Weather" : userLocation ? "Local Weather" : "Weather (NYC)"}
          </h3>
          <p className="text-blue-100">{formatTodayDate()}</p>
          {locationError && !location && (
            <p className="text-xs text-yellow-200 mt-1">Using default location</p>
          )}
        </div>
        <div className="flex flex-col items-end">
          {getWeatherIcon(weatherCode)}
          {!location && (
            <button
              onClick={requestLocation}
              className="mt-2 px-2 py-1 text-xs bg-blue-700 rounded hover:bg-blue-800 transition"
              title="Get current location weather"
            >
              📍 My Location
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center">
        <span className="text-4xl font-bold">
          {convertTemp(current.temperature, unit)}°{unit}
        </span>
        <span className="ml-2 text-blue-100">{getWeatherDescription(weatherCode)}</span>
        {error && error.includes("cached data") && (
          <span className="ml-2 text-xs text-yellow-200">(Cached)</span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-blue-100 text-xs">Humidity</p>
          <p className="font-medium">{Math.round(current.humidity)}%</p>
        </div>
        <div>
          <p className="text-blue-100 text-xs">Wind</p>
          <p className="font-medium">{Math.round(current.windSpeed * 2.237)} mph</p>
        </div>
        <div>
          <p className="text-blue-100 text-xs">UV Index</p>
          <p className="font-medium">{Math.round(current.uvIndex)}</p>
        </div>
      </div>

      <button
        onClick={toggleTempUnit}
        className="mt-4 px-3 py-1 text-sm bg-blue-800 rounded hover:bg-blue-700 transition"
      >
        Switch to °{unit === 'F' ? 'C' : 'F'}
      </button>

      <div className="mt-6 border-t border-blue-400 pt-4">
        <h4 className="text-sm font-medium mb-2">3-Day Forecast</h4>
        <div className="grid grid-cols-3 gap-2 text-center">
          {forecastData.map((forecast, i) => (
            <div key={i}>
              <p className="text-xs">{getDayName(forecast.time)}</p>
              {getSmallWeatherIcon(forecast.values.weatherCodeMax)}
              <p className="text-sm">{convertTemp(forecast.values.temperatureMax, unit)}°{unit}</p>
            </div>
          ))}
        </div>
      </div>

      {alerts.length > 0 && (
        <div className="mt-6 border-t border-yellow-300 pt-4">
          <h4 className="text-sm font-semibold text-yellow-300">Weather Alerts</h4>
          {alerts.map((alert, index) => (
            <div key={index} className="mt-2 text-sm bg-yellow-100 text-yellow-900 p-2 rounded">
              <strong>{alert.severity}</strong>: {alert.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;