import { Clock, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TimePreviewProps {
  timeOfDay: number;
  onTimeChange: (time: number) => void;
  colors: any;
  effects: any;
}

export function TimePreview({ timeOfDay, onTimeChange, colors, effects }: TimePreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      onTimeChange((timeOfDay + 0.1) % 24);
    }, 100);
    
    return () => clearInterval(interval);
  }, [isPlaying, timeOfDay, onTimeChange]);

  const getTimeString = () => {
    const hours = Math.floor(timeOfDay);
    const minutes = Math.floor((timeOfDay % 1) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const getSkyGradient = () => {
    const hour = timeOfDay;
    
    // Dawn (5-7)
    if (hour >= 5 && hour < 7) {
      return 'linear-gradient(to bottom, #1a0b2e 0%, #ff6b9d 30%, #ffa07a 50%, #ff8c42 70%, #c2185b 100%)';
    }
    // Morning (7-10)
    else if (hour >= 7 && hour < 10) {
      return 'linear-gradient(to bottom, #4facfe 0%, #87ceeb 50%, #ffd700 100%)';
    }
    // Noon (10-15)
    else if (hour >= 10 && hour < 15) {
      return 'linear-gradient(to bottom, #2196f3 0%, #64b5f6 50%, #e3f2fd 100%)';
    }
    // Afternoon (15-18)
    else if (hour >= 15 && hour < 18) {
      return 'linear-gradient(to bottom, #ff9800 0%, #ffa726 50%, #ffe0b2 100%)';
    }
    // Dusk (18-20)
    else if (hour >= 18 && hour < 20) {
      return 'linear-gradient(to bottom, #1a0b2e 0%, #ff6b9d 30%, #c2185b 60%, #7b1fa2 100%)';
    }
    // Night (20-5)
    else {
      return 'linear-gradient(to bottom, #0f0c29 0%, #302b63 50%, #24243e 100%)';
    }
  };

  const getSunPosition = () => {
    const hour = timeOfDay;
    let top = '50%';
    let opacity = 1;
    
    if (hour >= 6 && hour < 18) {
      // Daytime - sun visible
      const progress = (hour - 6) / 12; // 0 to 1
      top = `${20 + (progress * 40)}%`;
      opacity = 1;
    } else {
      // Nighttime - sun hidden
      opacity = 0;
    }
    
    return { top, opacity };
  };

  const getFilterStyle = () => {
    const filters = [
      `saturate(${colors.saturation}%)`,
      `brightness(${colors.brightness}%)`,
      `contrast(${colors.contrast}%)`,
    ];
    return filters.join(' ');
  };

  const sunPos = getSunPosition();

  return (
    <div className="bg-[#1a2332] rounded-xl overflow-hidden">
      {/* Preview Area */}
      <div className="relative h-[450px] overflow-hidden">
        <div 
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: getSkyGradient(),
            filter: getFilterStyle(),
          }}
        >
          {/* Sun */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-1000"
            style={{
              top: sunPos.top,
              opacity: sunPos.opacity,
            }}
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-200 to-orange-400 blur-sm"></div>
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-100 to-orange-300 absolute top-0 left-0"></div>
          </div>

          {/* Color Tint Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundColor: colors.tint,
              opacity: 0.15,
              mixBlendMode: 'overlay'
            }}
          />

          {/* Vignette Effect */}
          <div 
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at center, transparent 0%, rgba(0,0,0,${effects.vignette / 100}) 100%)`
            }}
          />

          {/* Film Grain */}
          {effects.filmGrain > 0 && (
            <div 
              className="absolute inset-0"
              style={{
                opacity: effects.filmGrain / 100,
                backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuNSIvPjwvc3ZnPg==)',
                backgroundSize: '200px 200px',
                mixBlendMode: 'overlay'
              }}
            />
          )}
        </div>

        {/* UI Overlays */}
        <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-sm text-white px-4 py-3 rounded-xl flex items-center gap-3 border border-white/10">
          <Clock className="w-5 h-5" />
          <span className="text-2xl tabular-nums">{getTimeString()}</span>
        </div>

        <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-xl flex items-center gap-2 border border-white/10">
          <Activity className="w-4 h-4" />
          <span className="text-sm">RGB ACCURATE</span>
        </div>
      </div>

      {/* Time Control */}
      <div className="bg-[#1e2836] p-6 border-t border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-white">TIME CONTROL</h4>
          <div className="flex gap-2">
            <button
              onClick={() => onTimeChange(6)}
              className="px-4 py-2 bg-[#2a3441] hover:bg-[#343f4f] text-white rounded-lg text-sm transition-colors"
            >
              Dawn
            </button>
            <button
              onClick={() => onTimeChange(12)}
              className="px-4 py-2 bg-[#2a3441] hover:bg-[#343f4f] text-white rounded-lg text-sm transition-colors"
            >
              Noon
            </button>
            <button
              onClick={() => onTimeChange(18)}
              className="px-4 py-2 bg-[#2a3441] hover:bg-[#343f4f] text-white rounded-lg text-sm transition-colors"
            >
              Dusk
            </button>
            <button
              onClick={() => onTimeChange(0)}
              className="px-4 py-2 bg-[#2a3441] hover:bg-[#343f4f] text-white rounded-lg text-sm transition-colors"
            >
              Night
            </button>
          </div>
        </div>
        
        <input
          type="range"
          min="0"
          max="24"
          step="0.1"
          value={timeOfDay}
          onChange={(e) => onTimeChange(Number(e.target.value))}
          className="w-full h-2 bg-[#2a3441] rounded-lg appearance-none cursor-pointer slider"
        />
      </div>
    </div>
  );
}
