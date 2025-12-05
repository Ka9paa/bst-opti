import { LucideIcon } from 'lucide-react';

interface PresetCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  onClick: () => void;
  isActive?: boolean;
}

export function PresetCard({ icon: Icon, title, description, gradient, onClick, isActive }: PresetCardProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#2a2733] rounded-2xl p-4 text-left hover:bg-[#342f3f] transition-all group border-2 ${
        isActive ? 'border-purple-500' : 'border-transparent'
      }`}
    >
      <div className="relative mb-3">
        <div 
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{ background: gradient }}
        >
          <Icon className="w-10 h-10 text-white" />
        </div>
        {isActive && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs text-white">
            ✓
          </div>
        )}
      </div>
      <h4 className="text-white mb-1">{title}</h4>
      <p className="text-gray-400 text-xs leading-relaxed">{description}</p>
    </button>
  );
}
