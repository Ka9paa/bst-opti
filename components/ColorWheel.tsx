import { useState, useRef, useEffect } from 'react';

interface ColorWheelProps {
  value: string;
  onChange: (color: string) => void;
  label: string;
}

export function ColorWheel({ value, onChange, label }: ColorWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 200;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 10;

    // Draw color wheel
    for (let angle = 0; angle < 360; angle += 1) {
      const startAngle = (angle - 1) * Math.PI / 180;
      const endAngle = angle * Math.PI / 180;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, 'white');
      gradient.addColorStop(1, `hsl(${angle}, 100%, 50%)`);

      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }, []);

  const handleColorSelect = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const radius = canvas.width / 2 - 10;

    if (distance <= radius) {
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      const hue = (angle + 360) % 360;
      const saturation = Math.min(100, (distance / radius) * 100);
      
      onChange(`hsl(${hue}, ${saturation}%, 50%)`);
    }
  };

  return (
    <div>
      <label className="text-sm text-gray-400 block mb-3">{label}</label>
      <div className="flex items-start gap-4">
        <canvas
          ref={canvasRef}
          width={200}
          height={200}
          onMouseDown={(e) => {
            setIsDragging(true);
            handleColorSelect(e);
          }}
          onMouseMove={(e) => {
            if (isDragging) {
              handleColorSelect(e);
            }
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          className="cursor-crosshair rounded-lg"
        />
        
        <div className="flex-1 space-y-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Selected Color</label>
            <div className="flex items-center gap-2">
              <div 
                className="w-12 h-12 rounded-lg border-2 border-gray-700"
                style={{ backgroundColor: value }}
              ></div>
              <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 h-12 rounded-lg cursor-pointer bg-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="text-xs text-gray-500 block mb-1">Hex Value</label>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full bg-[#1a2332] text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-orange-500 outline-none text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
