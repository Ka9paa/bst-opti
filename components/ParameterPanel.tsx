import { ControlSlider } from './ControlSlider';
import { ColorWheel } from './ColorWheel';

interface ParameterPanelProps {
  section: string;
  colors: any;
  effects: any;
  onColorChange: (key: string, value: any) => void;
  onEffectChange: (key: string, value: number) => void;
}

export function ParameterPanel({ section, colors, effects, onColorChange, onEffectChange }: ParameterPanelProps) {
  const renderContent = () => {
    switch (section) {
      case 'sky':
        return (
          <div className="space-y-6">
            <ColorWheel
              label="Sky Top Color"
              value={colors.skyTop || '#4a90e2'}
              onChange={(v) => onColorChange('skyTop', v)}
            />
            <ColorWheel
              label="Sky Bottom Color"
              value={colors.skyBottom || '#87ceeb'}
              onChange={(v) => onColorChange('skyBottom', v)}
            />
            <ControlSlider
              label="Sky Brightness"
              value={colors.brightness}
              onChange={(v) => onColorChange('brightness', v)}
            />
            <ControlSlider
              label="Sky Saturation"
              value={colors.saturation}
              onChange={(v) => onColorChange('saturation', v)}
            />
          </div>
        );

      case 'clouds':
        return (
          <div className="space-y-6">
            <ColorWheel
              label="Cloud Color"
              value={colors.cloudColor || '#ffffff'}
              onChange={(v) => onColorChange('cloudColor', v)}
            />
            <ControlSlider
              label="Cloud Density"
              value={effects.cloudDensity || 50}
              onChange={(v) => onEffectChange('cloudDensity', v)}
              max={100}
            />
            <ControlSlider
              label="Cloud Coverage"
              value={effects.cloudCoverage || 50}
              onChange={(v) => onEffectChange('cloudCoverage', v)}
              max={100}
            />
            <ControlSlider
              label="Cloud Speed"
              value={effects.cloudSpeed || 50}
              onChange={(v) => onEffectChange('cloudSpeed', v)}
              max={100}
            />
          </div>
        );

      case 'stars':
        return (
          <div className="space-y-6">
            <ColorWheel
              label="Star Color"
              value={colors.starColor || '#ffffff'}
              onChange={(v) => onColorChange('starColor', v)}
            />
            <ColorWheel
              label="Moon Color"
              value={colors.moonColor || '#f0f0f0'}
              onChange={(v) => onColorChange('moonColor', v)}
            />
            <ControlSlider
              label="Star Intensity"
              value={effects.starIntensity || 75}
              onChange={(v) => onEffectChange('starIntensity', v)}
              max={100}
            />
            <ControlSlider
              label="Moon Brightness"
              value={effects.moonBrightness || 80}
              onChange={(v) => onEffectChange('moonBrightness', v)}
              max={100}
            />
          </div>
        );

      case 'sun':
        return (
          <div className="space-y-6">
            <ColorWheel
              label="Sun Color"
              value={colors.sunColor || '#ffeb3b'}
              onChange={(v) => onColorChange('sunColor', v)}
            />
            <ControlSlider
              label="Sun Size"
              value={effects.sunSize || 100}
              onChange={(v) => onEffectChange('sunSize', v)}
              max={200}
            />
            <ControlSlider
              label="Sun Intensity"
              value={effects.sunIntensity || 100}
              onChange={(v) => onEffectChange('sunIntensity', v)}
              max={200}
            />
            <ControlSlider
              label="Sun Glow"
              value={effects.bloom}
              onChange={(v) => onEffectChange('bloom', v)}
              max={100}
            />
          </div>
        );

      case 'fog':
        return (
          <div className="space-y-6">
            <ColorWheel
              label="Fog Color"
              value={colors.fogColor || '#a0a0a0'}
              onChange={(v) => onColorChange('fogColor', v)}
            />
            <ControlSlider
              label="Fog Density"
              value={effects.fogDensity || 30}
              onChange={(v) => onEffectChange('fogDensity', v)}
              max={100}
            />
            <ControlSlider
              label="Fog Distance"
              value={effects.fogDistance || 50}
              onChange={(v) => onEffectChange('fogDistance', v)}
              max={100}
            />
          </div>
        );

      case 'light':
        return (
          <div className="space-y-6">
            <ColorWheel
              label="Ambient Light"
              value={colors.ambientLight || '#ffffff'}
              onChange={(v) => onColorChange('ambientLight', v)}
            />
            <ControlSlider
              label="Light Intensity"
              value={colors.exposure}
              onChange={(v) => onColorChange('exposure', v)}
            />
            <ControlSlider
              label="Shadow Strength"
              value={effects.shadowStrength || 75}
              onChange={(v) => onEffectChange('shadowStrength', v)}
              max={100}
            />
          </div>
        );

      case 'postfx':
        return (
          <div className="space-y-6">
            <ColorWheel
              label="Color Tint"
              value={colors.tint}
              onChange={(v) => onColorChange('tint', v)}
            />
            <ControlSlider
              label="Saturation"
              value={colors.saturation}
              onChange={(v) => onColorChange('saturation', v)}
            />
            <ControlSlider
              label="Contrast"
              value={colors.contrast}
              onChange={(v) => onColorChange('contrast', v)}
            />
            <ControlSlider
              label="Vibrance"
              value={colors.vibrance}
              onChange={(v) => onColorChange('vibrance', v)}
            />
          </div>
        );

      case 'vignette':
        return (
          <div className="space-y-6">
            <ColorWheel
              label="Vignette Color"
              value={colors.vignetteColor || '#000000'}
              onChange={(v) => onColorChange('vignetteColor', v)}
            />
            <ControlSlider
              label="Vignette Intensity"
              value={effects.vignette}
              onChange={(v) => onEffectChange('vignette', v)}
              max={100}
            />
            <ControlSlider
              label="Vignette Size"
              value={effects.vignetteSize || 50}
              onChange={(v) => onEffectChange('vignetteSize', v)}
              max={100}
            />
          </div>
        );

      case 'dof':
        return (
          <div className="space-y-6">
            <ControlSlider
              label="Depth of Field"
              value={effects.depthOfField}
              onChange={(v) => onEffectChange('depthOfField', v)}
              max={100}
            />
            <ControlSlider
              label="Focus Distance"
              value={effects.focusDistance || 50}
              onChange={(v) => onEffectChange('focusDistance', v)}
              max={100}
            />
            <ControlSlider
              label="Blur Amount"
              value={effects.motionBlur}
              onChange={(v) => onEffectChange('motionBlur', v)}
              max={100}
            />
          </div>
        );

      case 'nightvision':
        return (
          <div className="space-y-6">
            <ColorWheel
              label="Night Vision Tint"
              value={colors.nightVisionColor || '#00ff00'}
              onChange={(v) => onColorChange('nightVisionColor', v)}
            />
            <ControlSlider
              label="Night Vision Intensity"
              value={effects.nightVision || 0}
              onChange={(v) => onEffectChange('nightVision', v)}
              max={100}
            />
            <ControlSlider
              label="Noise Amount"
              value={effects.filmGrain}
              onChange={(v) => onEffectChange('filmGrain', v)}
              max={100}
            />
          </div>
        );

      case 'heathaze':
        return (
          <div className="space-y-6">
            <ControlSlider
              label="Heat Haze Intensity"
              value={effects.heatHaze || 0}
              onChange={(v) => onEffectChange('heatHaze', v)}
              max={100}
            />
            <ControlSlider
              label="Distortion Amount"
              value={effects.distortion || 0}
              onChange={(v) => onEffectChange('distortion', v)}
              max={100}
            />
          </div>
        );

      default:
        return (
          <div className="text-center py-12 text-gray-500">
            <p>Select a parameter category to begin editing</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-[#1a2332] rounded-xl p-6 h-full overflow-y-auto">
      <h3 className="text-white mb-6 text-lg">{
        section === 'sky' ? 'Sky Colouring' :
        section === 'clouds' ? 'Main Clouds' :
        section === 'stars' ? 'Stars / Moon Variables' :
        section === 'sun' ? 'Sun Variables' :
        section === 'fog' ? 'Fog Variables' :
        section === 'light' ? 'Light Variables' :
        section === 'postfx' ? 'Post FX Variables' :
        section === 'vignette' ? 'Vignetting Intensity' :
        section === 'dof' ? 'Depth of Field Variables' :
        section === 'nightvision' ? 'Night Vision Variables' :
        section === 'heathaze' ? 'Heat Haze Variables' :
        'Parameters'
      }</h3>
      {renderContent()}
    </div>
  );
}
