interface ControlSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export function ControlSlider({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 200, 
  step = 1,
  unit = '%'
}: ControlSliderProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-gray-400">{label}</label>
        <span className="text-sm text-white tabular-nums">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-[#2a3441] rounded-lg appearance-none cursor-pointer slider"
      />
    </div>
  );
}
