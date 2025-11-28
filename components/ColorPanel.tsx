interface ColorPanelProps {
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
  onColorChange: (key: string, value: number | string) => void;
}

export function ColorPanel({ colors, onColorChange }: ColorPanelProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-white mb-4">Color Grading</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 block mb-2">Saturation</label>
          <input
            type="range"
            min="0"
            max="200"
            value={colors.saturation}
            onChange={(e) => onColorChange('saturation', Number(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">{colors.saturation}%</div>
        </div>
        
        <div>
          <label className="text-sm text-gray-400 block mb-2">Brightness</label>
          <input
            type="range"
            min="0"
            max="200"
            value={colors.brightness}
            onChange={(e) => onColorChange('brightness', Number(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">{colors.brightness}%</div>
        </div>
        
        <div>
          <label className="text-sm text-gray-400 block mb-2">Contrast</label>
          <input
            type="range"
            min="0"
            max="200"
            value={colors.contrast}
            onChange={(e) => onColorChange('contrast', Number(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">{colors.contrast}%</div>
        </div>
        
        <div>
          <label className="text-sm text-gray-400 block mb-2">Exposure</label>
          <input
            type="range"
            min="0"
            max="200"
            value={colors.exposure}
            onChange={(e) => onColorChange('exposure', Number(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">{colors.exposure}%</div>
        </div>
        
        <div>
          <label className="text-sm text-gray-400 block mb-2">Vibrance</label>
          <input
            type="range"
            min="0"
            max="200"
            value={colors.vibrance}
            onChange={(e) => onColorChange('vibrance', Number(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">{colors.vibrance}%</div>
        </div>
        
        <div>
          <label className="text-sm text-gray-400 block mb-2">Gamma</label>
          <input
            type="range"
            min="0"
            max="200"
            value={colors.gamma}
            onChange={(e) => onColorChange('gamma', Number(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">{colors.gamma}%</div>
        </div>
        
        <div>
          <label className="text-sm text-gray-400 block mb-2">Temperature</label>
          <input
            type="range"
            min="-100"
            max="100"
            value={colors.temperature}
            onChange={(e) => onColorChange('temperature', Number(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">{colors.temperature}</div>
        </div>
        
        <div>
          <label className="text-sm text-gray-400 block mb-2">Color Tint</label>
          <input
            type="color"
            value={colors.tint}
            onChange={(e) => onColorChange('tint', e.target.value)}
            className="w-full h-10 rounded cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
