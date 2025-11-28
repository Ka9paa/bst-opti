interface PreviewPanelProps {
  colors: {
    saturation: number;
    brightness: number;
    contrast: number;
    temperature: number;
    tint: string;
    gamma: number;
    exposure: number;
    vibrance: number;
  };
  effects: {
    bloom: number;
    motionBlur: number;
    depthOfField: number;
    vignette: number;
    filmGrain: number;
    sharpen: number;
  };
  weather: string;
}

export function PreviewPanel({ colors, effects, weather }: PreviewPanelProps) {
  const getFilterStyle = () => {
    const filters = [
      `saturate(${colors.saturation}%)`,
      `brightness(${colors.brightness}%)`,
      `contrast(${colors.contrast}%)`,
      `hue-rotate(${colors.temperature}deg)`,
    ];
    return filters.join(' ');
  };

  const getOverlayStyle = () => {
    const vignetteOpacity = effects.vignette / 100;
    return {
      background: `radial-gradient(circle at center, transparent 0%, rgba(0,0,0,${vignetteOpacity}) 100%)`
    };
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 h-full">
      <h3 className="text-white mb-4">Live Preview</h3>
      
      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
        {/* Preview Image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: getFilterStyle(),
          }}
        />
        
        {/* Color Tint Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: colors.tint,
            opacity: 0.1,
            mixBlendMode: 'overlay'
          }}
        />
        
        {/* Vignette Effect */}
        <div 
          className="absolute inset-0"
          style={getOverlayStyle()}
        />
        
        {/* Film Grain Effect */}
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
        
        {/* Weather Overlay */}
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
          Weather: {weather}
        </div>
        
        {/* Stats Overlay */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-2 rounded text-xs space-y-1">
          <div>Saturation: {colors.saturation}%</div>
          <div>Brightness: {colors.brightness}%</div>
          <div>Bloom: {effects.bloom}%</div>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-gray-900 rounded-lg">
        <div className="text-sm text-gray-400 mb-2">Pack Info</div>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
          <div>Format: Timecycle XML</div>
          <div>Version: 1.0</div>
          <div>Weather Types: 10</div>
          <div>Effects: 6</div>
        </div>
      </div>
    </div>
  );
}
