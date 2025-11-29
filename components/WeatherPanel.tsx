import { Cloud, CloudRain, CloudSnow, CloudFog, Sun, CloudDrizzle } from 'lucide-react';
import { useState } from 'react';

const weatherTypes = [
  { id: 'EXTRASUNNY', name: 'Extra Sunny', icon: Sun },
  { id: 'CLEAR', name: 'Clear', icon: Sun },
  { id: 'CLOUDS', name: 'Cloudy', icon: Cloud },
  { id: 'OVERCAST', name: 'Overcast', icon: Cloud },
  { id: 'RAIN', name: 'Rain', icon: CloudRain },
  { id: 'THUNDER', name: 'Thunder', icon: CloudRain },
  { id: 'CLEARING', name: 'Clearing', icon: CloudDrizzle },
  { id: 'FOGGY', name: 'Foggy', icon: CloudFog },
  { id: 'SMOG', name: 'Smog', icon: CloudFog },
  { id: 'XMAS', name: 'Snow', icon: CloudSnow }
];

interface WeatherPanelProps {
  selectedWeather: string;
  onWeatherChange: (weather: string) => void;
  weatherIntensity: number;
  onIntensityChange: (intensity: number) => void;
}

export function WeatherPanel({ 
  selectedWeather, 
  onWeatherChange,
  weatherIntensity,
  onIntensityChange 
}: WeatherPanelProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-white mb-4">Weather Settings</h3>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        {weatherTypes.map((weather) => {
          const Icon = weather.icon;
          return (
            <button
              key={weather.id}
              onClick={() => onWeatherChange(weather.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedWeather === weather.id
                  ? 'border-blue-500 bg-blue-500/20 text-white'
                  : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600'
              }`}
            >
              <Icon className="w-5 h-5 mx-auto mb-1" />
              <div className="text-sm">{weather.name}</div>
            </button>
          );
        })}
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-400 block mb-2">Weather Intensity</label>
          <input
            type="range"
            min="0"
            max="100"
            value={weatherIntensity}
            onChange={(e) => onIntensityChange(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>{weatherIntensity}%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
