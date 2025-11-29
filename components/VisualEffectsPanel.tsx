interface VisualEffectsPanelProps {
  effects: {
    bloom: number;
    motionBlur: number;
    depthOfField: number;
    vignette: number;
    filmGrain: number;
    sharpen: number;
  };
  onEffectChange: (key: string, value: number) => void;
}

export function VisualEffectsPanel({ effects, onEffectChange }: VisualEffectsPanelProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-white mb-4">Visual Effects</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 block mb-2">Bloom</label>
          <input
            type="range"
            min="0"
            max="100"
            value={effects.bloom}
            onChange={(e) => onEffectChange('bloom', Number(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">{effects.bloom}%</div>
        </div>
        
        <div>
          <label className="text-sm text-gray-400 block mb-2">Motion Blur</label>
          <input
            type="range"
            min="0"
            max="100"
            value={effects.motionBlur}
            onChange={(e) => onEffectChange('motionBlur', Number(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">{effects.motionBlur}%</div>
        </div>
        
        <div>
          <label className="text-sm text-gray-400 block mb-2">Depth of Field</label>
          <input
            type="range"
            min="0"
            max="100"
            value={effects.depthOfField}
            onChange={(e) => onEffectChange('depthOfField', Number(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">{effects.depthOfField}%</div>
        </div>
        
        <div>
          <label className="text-sm text-gray-400 block mb-2">Vignette</label>
          <input
            type="range"
            min="0"
            max="100"
            value={effects.vignette}
            onChange={(e) => onEffectChange('vignette', Number(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">{effects.vignette}%</div>
        </div>
        
        <div>
          <label className="text-sm text-gray-400 block mb-2">Film Grain</label>
          <input
            type="range"
            min="0"
            max="100"
            value={effects.filmGrain}
            onChange={(e) => onEffectChange('filmGrain', Number(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">{effects.filmGrain}%</div>
        </div>
        
        <div>
          <label className="text-sm text-gray-400 block mb-2">Sharpen</label>
          <input
            type="range"
            min="0"
            max="100"
            value={effects.sharpen}
            onChange={(e) => onEffectChange('sharpen', Number(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">{effects.sharpen}%</div>
        </div>
      </div>
    </div>
  );
}
